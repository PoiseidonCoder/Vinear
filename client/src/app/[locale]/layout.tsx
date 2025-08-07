import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';
import { AppShell } from '../../components/layouts/app-shell';
import { ModalProvider } from '../../components/providers/modal-provider';

export default async function LocaleLayout(props: { children: React.ReactNode; params: { locale: string } }) {
    const { children } = props;
    const params = await props.params;
    const messages = await getMessages({ locale: params.locale });

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            <AppShell>{children}</AppShell>
            <Toaster richColors closeButton position='top-right' />
            <ModalProvider />
        </NextIntlClientProvider>
    );
}
