// import { getToast } from '@/lib/utils/get-toast';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import type { User } from '@/types/auth';
// import { fetchUpdateUser } from '@/app/api/auth';

// export function useUpdateUser(userId: string) {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (data: Partial<User>) => fetchUpdateUser(userId, data),
//         onSuccess: (updatedUser) => {
//             queryClient.setQueryData(['user', userId], updatedUser);
//         },
//         onError: (error: Error) => {
//             getToast('error', 'Failure to update user');
//             console.error('Failed to update user:', error);
//         }
//     });
// }
