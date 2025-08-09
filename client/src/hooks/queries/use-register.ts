import { useMutation } from '@tanstack/react-query';
import { ApiError } from '@/types/axios';
import { AuthRequestDto, AuthResponseDto } from '@/types/auth';
import { getToast } from '@/lib/utils/get-toast';
import useAuthStore from '@/hooks/stores/use-auth-store';
import { fetchRegister } from '@/api/auth';
import { useRouter } from 'next/navigation';

export default function useRegister(t: (key: string) => string) {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);
    const setSessionToken = useAuthStore((s) => s.setSessionToken);
    const setRefreshToken = useAuthStore((s) => s.setRefreshToken);
    const setExpirationTime = useAuthStore((s) => s.setExpirationTime);

    return useMutation<AuthResponseDto, ApiError, AuthRequestDto>({
        mutationFn: fetchRegister,
        onSuccess: ({ user, sessionToken, refreshToken, expirationTime }) => {
            setUser(user);
            setSessionToken(sessionToken);
            setRefreshToken(refreshToken);
            setExpirationTime(expirationTime);
            router.push('/');
            getToast('success', t('register_success'));
        },
        onError: (error) => {
            getToast('error', error.message || t('register_failed'));
        }
    });
}
