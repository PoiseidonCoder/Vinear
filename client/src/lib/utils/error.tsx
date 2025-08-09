export class ApiError extends Error {
    status: number;
    data: {
        message: string;
        errorCode: string;
        error: unknown;
    };

    constructor(status: number, message: string, data: { message: string; errorCode: string; error: unknown }) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
