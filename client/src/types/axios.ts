import { InternalAxiosRequestConfig } from 'axios';

export type ApiError = {
    status: number;
    message: string;
    data: ErrorResponseData;
};

export type ErrorResponseData = {
    message: string;
    errorCode: string;
    error: unknown;
};
export type RetryConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};
