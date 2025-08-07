export type ApiError = {
    status: number;
    message: string;
    data?: unknown;
};

export type ErrorResponseData = {
    message?: string;
    [key: string]: unknown;
};
