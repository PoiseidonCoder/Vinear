import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDto } from '@/types/auth';
import api from '@/lib/utils/axios';
import { getToast } from '@/lib/utils/get-toast';
import useAuthStore from '@/hooks/stores/use-auth-store';

export type UpdateProfileDto = {
    username?: string;
    email?: string;
};

const updateProfile = async (data: UpdateProfileDto): Promise<UserDto> => {
    const response = await api.put('/user/profile', data);
    return response.data;
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { setUser } = useAuthStore();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            setUser(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            getToast('success', 'Profile updated successfully');
        },
        onError: () => {
            getToast('error', 'Failed to update profile');
        }
    });
};
