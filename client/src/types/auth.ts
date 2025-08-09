export type UserDto = {
    id: string;
    username: string;
    role: string;
    avatarUrl?: string;
    email?: string;
};

export type AuthState = {
    user: UserDto | null;
    sessionToken: string | null;
    refreshToken: string | null;
    expirationTime: number | null;
};

export type AuthRequestDto = {
    username: string;
    password: string;
};

export type AuthResponseDto = {
    user: UserDto;
    sessionToken: string;
    refreshToken: string;
    expirationTime: number;
};
