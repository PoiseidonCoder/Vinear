import { AuthState, UserDto } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { removeAuthCookie } from '@/lib/utils/auth-cookies';

type AuthStore = AuthState & {
    setUser: (user: UserDto | null) => void;
    setSessionToken: (sessionToken: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    setExpirationTime: (expirationTime: number | null) => void;
    logout: () => void;
};

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            sessionToken: null,
            refreshToken: null,
            expirationTime: null,
            setUser: (user) => {
                set({ user });
            },
            setSessionToken: (sessionToken) => {
                set({ sessionToken });
            },
            setRefreshToken: (refreshToken) => {
                set({ refreshToken });
            },
            setExpirationTime: (expirationTime) => {
                set({ expirationTime });
            },
            logout: () => {
                set({ user: null, sessionToken: null, refreshToken: null, expirationTime: null });
                removeAuthCookie();
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => {
                return {
                    user: state.user,
                    sessionToken: state.sessionToken,
                    refreshToken: state.refreshToken,
                    expirationTime: state.expirationTime
                };
            }
        }
    )
);

export default useAuthStore;
