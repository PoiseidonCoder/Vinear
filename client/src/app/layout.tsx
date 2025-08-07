import { Geist } from 'next/font/google';
import './globals.css';
import ThemeProvider from '../components/providers/theme-provider.tsx';
import { getLocale } from 'next-intl/server';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

export const metadata = {
    title: 'Vinear - Gọi video làm quen',
    description: 'Kết nối người dùng theo khu vực qua gọi video ngẫu nhiên'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistSans.variable} antialiased`}>
                <ReactQueryProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
