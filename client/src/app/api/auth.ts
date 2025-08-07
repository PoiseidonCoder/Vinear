import api from '@/lib/utils/axios';

import { User } from '@/types/auth';

export const findUserByIdApi = async (userId: string): Promise<User> => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
};

export const updateUserApi = async (userId: string, data: Partial<User>): Promise<User> => {
    const res = await api.patch(`/users/${userId}`, data);
    return res.data;
};
