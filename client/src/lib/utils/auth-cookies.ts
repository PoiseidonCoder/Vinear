export const AUTH_COOKIE_NAME = 'session-token';

export const setAuthCookie = (token: string) => {
    if (typeof window !== 'undefined') {
        document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=lax`;
    }
};

export const removeAuthCookie = () => {
    if (typeof window !== 'undefined') {
        document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

export const getAuthCookie = () => {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find((cookie) => cookie.trim().startsWith(`${AUTH_COOKIE_NAME}=`));
        return authCookie ? authCookie.split('=')[1] : null;
    }
    return null;
};
