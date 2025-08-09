import axios from 'axios';
import useAuthStore from '@/hooks/stores/use-auth-store';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import type { ApiError, ErrorResponseData, RetryConfig } from '@/types/axios';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: string) => void; reject: (error: ApiError) => void }> = [];

const processQueue = (error: ApiError | null, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token!);
        }
    });
    failedQueue = [];
};

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().sessionToken;

    const headers = config.headers as AxiosHeaders;
    if (typeof token === 'string' && config.headers && typeof config.headers === 'object') {
        headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const formatError = (err: AxiosError<ErrorResponseData>): ApiError => {
    const status = err.response?.status || 500;
    const data = err.response?.data || {
        message: 'Unexpected error',
        errorCode: 'UNKNOWN',
        error: null
    };

    const message = data.message || err.message || 'Unexpected error';

    return {
        status,
        message,
        data: {
            message,
            errorCode: data.errorCode || 'UNKNOWN',
            error: data.error
        }
    };
};

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ErrorResponseData>): Promise<AxiosResponse | never> => {
        const originalRequest = error.config as RetryConfig;
        const store = useAuthStore.getState();

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry && store.refreshToken) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    if (originalRequest.headers) {
                        const headers = originalRequest.headers as AxiosHeaders;
                        headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await api.post<{ sessionToken: string }>('/auth/refresh-token', {
                    refreshToken: store.refreshToken
                });

                const newToken = res.data.sessionToken;
                store.setSessionToken(newToken);
                processQueue(null, newToken);

                if (originalRequest.headers) {
                    const headers = originalRequest.headers as AxiosHeaders;
                    headers.Authorization = `Bearer ${newToken}`;
                }

                return api(originalRequest);
            } catch (refreshErr) {
                const formatted = formatError(refreshErr as AxiosError<ErrorResponseData>);
                processQueue(formatted, null);
                store.logout();
                return Promise.reject(formatted);
            } finally {
                isRefreshing = false;
            }
        }

        const formattedError = formatError(error);
        return Promise.reject(formattedError);
    }
);

export default api;
