import { useQuery } from '@tanstack/react-query';

import { fetchFindUserById } from '@/app/api/auth';

export function useFindUserById(userId: string) {
    return useQuery({
        queryKey: ['userId', userId],
        queryFn: () => fetchFindUserById(userId),
        staleTime: 5 * 60 * 1000,
        enabled: Boolean(userId)
    });
}
