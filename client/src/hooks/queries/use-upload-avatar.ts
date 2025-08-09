import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUploadImage } from '@/api/auth';
import { getToast } from '@/lib/utils/get-toast';
import useAuthStore from '@/hooks/stores/use-auth-store';

export const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    const { user, setUser } = useAuthStore();

    return useMutation({
        mutationFn: fetchUploadImage,
        onSuccess: (avatarUrl) => {
            if (user) {
                setUser({ ...user, avatarUrl });
            }
            queryClient.invalidateQueries({ queryKey: ['user'] });
            getToast('success', 'Avatar uploaded successfully');
        },
        onError: () => {
            console.log(user?.role);

            getToast('error', 'Failed to upload avatar');
        }
    });
};
