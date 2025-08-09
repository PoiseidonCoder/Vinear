'use client';

import { useTranslations } from 'next-intl';
import { Button } from './button';
import { Avatar } from './avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { Settings, LogOut, User } from 'lucide-react';
import useAuthStore from '@/hooks/stores/use-auth-store';
import { authRoutes } from '@/config/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const UserMenu = () => {
    const t = useTranslations('user_menu');
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        window.location.href = authRoutes.login;
    };

    if (!user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
                    <Avatar className='h-10 w-10'>
                        {user.avatarUrl ? (
                            <Image
                                src={user.avatarUrl}
                                alt={user.username}
                                width={40}
                                height={40}
                                className='h-full w-full object-cover rounded-full'
                            />
                        ) : (
                            <div className='flex h-full w-full items-center justify-center bg-primary text-primary-foreground'>
                                {user.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        )}
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>{user.username}</p>
                        <p className='text-xs leading-none text-muted-foreground'>{user.email || t('no_email')}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/settings/profile'>
                        <User className='mr-2 h-4 w-4' />
                        <span>{t('profile')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href='/settings'>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>{t('settings')}</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-destructive focus:text-destructive' onClick={handleLogout}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>{t('logout')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
