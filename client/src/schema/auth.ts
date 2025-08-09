import { z } from 'zod';

export const authSchema = (t: (key: string) => string) =>
    z.object({
        username: z.string().min(1, { message: t('username_required') }),
        password: z.string().min(1, { message: t('password_required') })
    });
