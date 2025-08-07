import axios from 'axios';
import useAuthStore from '@/hooks/stores/use-auth-store';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { ApiError, ErrorResponseData } from '@/types/axios';

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (typeof token === 'string' && config.headers && typeof config.headers === 'object') {
        const headers = config.headers as AxiosHeaders;
        headers.Authorization = token;
    }

    return config;
});

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: ApiError) => void;
}[] = [];

const processQueue = (error: ApiError | null, token: string | null) => {
    for (const { resolve, reject } of failedQueue) {
        if (error) reject(error);
        else if (token) resolve(token);
    }
    failedQueue = [];
};

const formatError = (err: AxiosError<ErrorResponseData>): ApiError => {
    const status = err.response?.status || 500;
    const data = err.response?.data;
    const message = data?.message || err.message || 'Unexpected error';
    return { status, message, data };
};

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ErrorResponseData>): Promise<AxiosResponse | never> => {
        const store = useAuthStore.getState();
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry && store.refreshToken) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    if (originalRequest.headers) {
                        const headers = originalRequest.headers as AxiosHeaders;
                        headers.Authorization = token;
                    }
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await api.post<{ token: string }>('/auth/refresh-token', {
                    refreshToken: store.refreshToken
                });

                const newToken = res.data.token;
                store.setToken(newToken);
                api.defaults.headers.common.Authorization = newToken;
                processQueue(null, newToken);

                if (originalRequest.headers) {
                    const headers = originalRequest.headers as AxiosHeaders;
                    headers.Authorization = newToken;
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

        return Promise.reject(formatError(error));
    }
);

export default api;
