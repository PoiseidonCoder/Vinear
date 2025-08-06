import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

export default async function LocaleLayout(props: { children: React.ReactNode; params: { locale: string } }) {
    const { children } = props;
    const params = await props.params;
    const messages = await getMessages({ locale: params.locale });

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
