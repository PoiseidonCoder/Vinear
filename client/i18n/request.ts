import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';

const locales = ['en', 'vi'];

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => {
    if (!locale || !locales.includes(locale)) {
        return {
            locale: 'vi',
            messages: (await import(`../messages/vi.json`)).default
        };
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
