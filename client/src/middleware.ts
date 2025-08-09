import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const privatePaths = ['/my-fitness-journey', '/settings/preferences', '/email-and-password', '/subscription'];
const authPaths = ['/login', '/register'];

const intlMiddleware = createMiddleware({
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get('session-token')?.value;

    if (authPaths.some((path) => pathname.includes(path)) && sessionToken) {
        const locale = pathname.split('/')[1] || 'vi';
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    if (privatePaths.some((path) => pathname.includes(path)) && !sessionToken) {
        const locale = pathname.split('/')[1] || 'vi';
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
