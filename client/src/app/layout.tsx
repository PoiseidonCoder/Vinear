import { Geist } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vinear - Connect with People',
    description: 'Connect with people around the world through high-quality video calls',
    icons: {
        icon: '/vinear-icon.svg',
        shortcut: '/vinear-icon.svg',
        apple: '/vinear-icon.svg'
    }
};
import ThemeProvider from '../components/providers/theme-provider.tsx';
import { getLocale } from 'next-intl/server';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning data-scroll-behavior='smooth'>
            <body className={`${geistSans.variable} antialiased`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
