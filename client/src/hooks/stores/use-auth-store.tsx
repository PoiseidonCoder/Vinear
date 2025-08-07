import { create } from 'zustand';

type AuthState = {
    token: string | null;
    refreshToken: string | null;
    setToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
    token: null,
    refreshToken: null,
    setToken: (token) => set({ token }),
    setRefreshToken: (token) => set({ refreshToken: token }),
    logout: () => set({ token: null, refreshToken: null })
}));

export default useAuthStore;
