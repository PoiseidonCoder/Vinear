import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';
import { AppShell } from '../../components/layouts/app-shell';
import { ModalProvider } from '../../components/providers/modal-provider';
import { ReactQueryProvider } from '../../components/providers/react-query-provider';
import { ThemeToggle } from '../../components/ui/theme-toggle';

export default async function LocaleLayout(props: { children: React.ReactNode; params: { locale: string } }) {
    const { children } = props;
    const params = await props.params;
    const messages = await getMessages({ locale: params.locale });

    return (
        <ReactQueryProvider>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
                <AppShell>{children}</AppShell>
                <ThemeToggle />
                <Toaster richColors closeButton position='bottom-right' />
                <ModalProvider />
            </NextIntlClientProvider>
        </ReactQueryProvider>
    );
}
