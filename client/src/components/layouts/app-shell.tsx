'use client';

import Navbar from './navbar';
import Sidebar from './sidebar';
import useAuthStore from '@/hooks/stores/use-auth-store';

export function AppShell({ children }: { children: React.ReactNode }) {
    const { sessionToken } = useAuthStore();
    const isAuthenticated = !!sessionToken;

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1' style={{ paddingTop: '64px' }}>
                {isAuthenticated && <Sidebar />}
                <main className={`flex-1 ${isAuthenticated ? 'lg:ml-64' : ''}`}>{children}</main>
            </div>
        </div>
    );
}
