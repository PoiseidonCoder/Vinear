import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '@/types/auth';
import { updateUserApi } from '@/app/api/auth';
import { getToast } from '@/lib/utils/get-toast';

export function useUpdateUser(userId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<User>) => updateUserApi(userId, data),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user', userId], updatedUser);
        },
        onError: (error: Error) => {
            getToast('error', 'Failure to update user');
            console.error('Failed to update user:', error);
        }
    });
}
