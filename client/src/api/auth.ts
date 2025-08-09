import api from '@/lib/utils/axios';
import { AuthRequestDto, AuthResponseDto } from '@/types/auth';

const prefixAuthApi = '/auth';

export const fetchRegister = async (authRequestDto: AuthRequestDto): Promise<AuthResponseDto> => {
    const response = await api.post(`${prefixAuthApi}/register`, authRequestDto);
    return response.data;
};

export const fetchLogin = async (authRequestDto: AuthRequestDto): Promise<AuthResponseDto> => {
    const response = await api.post(`${prefixAuthApi}/login`, authRequestDto);
    return response.data;
};

export const fetchUploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};
