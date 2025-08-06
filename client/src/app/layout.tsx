import { Geist } from 'next/font/google';
import './globals.css';
import ThemeProvider from './components/providers/ThemeProvider';
import { getLocale } from 'next-intl/server';

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
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
