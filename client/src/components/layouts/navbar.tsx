'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../ui/language-switcher';
import { UserMenu } from '../ui/user-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { mainNavigation, authRoutes } from '@/config/navigation';
import useAuthStore from '@/hooks/stores/use-auth-store';

const Navbar = () => {
    const t = useTranslations('navbar');
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { sessionToken } = useAuthStore();

    const isLoginPage = pathname?.includes('/login');
    const isAuthenticated = !!sessionToken;

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-sm'>
            <div className='container mx-auto px-4 lg:px-6'>
                <div className='flex items-center justify-between h-16'>
                    <Link href='/' className='flex items-center justify-center space-x-3 group'>
                        <div className='relative'>
                            <div className='bg-gradient-to-br from-primary to-primary/80 rounded-full p-2.5 shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105'>
                                <Image src='/ghost.svg' alt='Ghost' width={24} height={24} className='w-6 h-6' />
                            </div>
                        </div>
                        <span className='text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>Vinear</span>
                    </Link>

                    <div className='hidden lg:flex items-center space-x-1'>
                        {mainNavigation.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className='relative px-5 py-3 text-base font-semibold text-muted-foreground hover:text-foreground btn-transition rounded-lg hover:bg-accent/50 group'
                            >
                                {t(item.key)}
                                <span className='absolute inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full' />
                            </Link>
                        ))}
                    </div>

                    <div className='flex items-center space-x-3'>
                        <LanguageSwitcher />
                        {isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <Button
                                asChild
                                variant='ghost'
                                size='default'
                                className='hidden md:inline-flex text-base font-semibold hover:bg-accent/70 btn-transition px-6'
                            >
                                {isLoginPage ? (
                                    <Link href={authRoutes.register}>{t('register')}</Link>
                                ) : (
                                    <Link href={authRoutes.login}>{t('login')}</Link>
                                )}
                            </Button>
                        )}

                        <Button variant='ghost' size='sm' className='lg:hidden' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu className='w-5 h-5' />
                        </Button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className='lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl'>
                        <div className='px-4 py-4 space-y-2'>
                            {mainNavigation.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className='block px-5 py-4 text-base font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors'
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t(item.key)}
                                </Link>
                            ))}
                            {!isAuthenticated && (
                                <div className='pt-2 border-t border-border/60'>
                                    {isLoginPage ? (
                                        <Link
                                            href={authRoutes.register}
                                            className='block px-5 py-4 text-base font-bold text-primary hover:bg-accent/50 rounded-lg transition-colors'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t('register')}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={authRoutes.login}
                                            className='block px-5 py-4 text-base font-bold text-primary hover:bg-accent/50 rounded-lg transition-colors'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t('login')}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
