'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [, startTransition] = useTransition();

    const switchLocale = (lang: string) => {
        const segments = pathname.split('/');
        segments[1] = lang;
        startTransition(() => router.push(segments.join('/')));
    };

    return (
        <header className='h-16 border-b w-full px-4 flex items-center justify-between'>
            <Link href='/' className='font-bold text-lg'>
                MyApp
            </Link>
            <div className='flex items-center gap-4'>
                <Select defaultValue={locale} onValueChange={switchLocale}>
                    <SelectTrigger className='min-w-28'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='en'>English</SelectItem>
                        <SelectItem value='vi'>Tiếng Việt</SelectItem>
                    </SelectContent>
                </Select>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className='h-8 w-8'>
                            <AvatarImage src='/avatar.png' />
                            <AvatarFallback>ME</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500'>
                            <LogOut className='w-4 h-4 mr-2' />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
