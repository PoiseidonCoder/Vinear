import { findUserByIdApi } from '@/app/api/auth';
import { useQuery } from '@tanstack/react-query';

export function useFindUserById(userId: string) {
    return useQuery({
        queryKey: ['userId', userId],
        queryFn: () => findUserByIdApi(userId),
        staleTime: 5 * 60 * 1000,
        enabled: Boolean(userId)
    });
}
