'use client';

import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/settings', label: 'Settings' }
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className='w-64 border-r p-4 hidden md:block'>
            <nav className='flex flex-col gap-2'>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn('px-4 py-2 rounded hover:bg-muted transition', pathname === link.href && 'bg-muted font-medium')}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
