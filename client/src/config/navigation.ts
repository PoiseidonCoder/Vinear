import { NavigationItem } from '@/types/navigation';

export const authNavigation: NavigationItem[] = [
    {
        label: 'login_title',
        route: '/login',
        icon: '/login-icon.svg'
    },
    {
        label: 'register_title',
        route: '/register',
        icon: '/register-icon.svg'
    }
];

export const mainNavigation = [
    { key: 'home', href: '/' },
    { key: 'products', href: '/products' },
    { key: 'learn', href: '/learn' },
    { key: 'safety', href: '/safety' },
    { key: 'support', href: '/support' },
    { key: 'download', href: '/download' }
];

export const sidebarNavigation = [
    { key: 'home', href: '/', icon: 'Home' },
    { key: 'discover', href: '/discover', icon: 'Search' },
    { key: 'messages', href: '/messages', icon: 'MessageCircle' },
    { key: 'settings', href: '/settings', icon: 'Settings' }
];

export const authRoutes = {
    login: '/login',
    register: '/register',
    home: '/'
};

export const externalLinks = {
    notFound: '/'
};
