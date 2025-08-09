'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Home, Search, MessageCircle, Settings } from 'lucide-react';
import useAuthStore from '@/hooks/stores/use-auth-store';
import { sidebarNavigation } from '@/config/navigation';

const Sidebar = () => {
    const { sessionToken } = useAuthStore((s) => s);
    const t = useTranslations('sidebar');

    const iconMap = {
        Home: <Home className='w-5 h-5' />,
        Search: <Search className='w-5 h-5' />,
        MessageCircle: <MessageCircle className='w-5 h-5' />,
        Settings: <Settings className='w-5 h-5' />
    };

    const navigationItems = sidebarNavigation.map((item) => ({
        icon: iconMap[item.icon as keyof typeof iconMap],
        label: t(item.key),
        href: item.href
    }));

    if (!sessionToken) {
        return null;
    }

    return (
        <>
            <aside
                className={`fixed left-0 z-40 w-64 transform bg-background border-r shadow-lg transition-transform duration-300 ease-in-out -translate-x-full lg:translate-x-0`}
                style={{
                    top: '64px',
                    bottom: '0'
                }}
            >
                <nav className='space-y-2 p-4 overflow-y-auto h-full'>
                    {navigationItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                        >
                            {item.icon}
                            <span className='text-sm font-medium'>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
