import { toast } from 'sonner';

const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
};

export const getToast = (type: keyof typeof icons, message: string, options?: { description?: string }) => {
    toast(message, {
        description: options?.description,
        icon: icons[type]
    });
};
