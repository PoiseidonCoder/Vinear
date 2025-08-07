import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1'>
                <Sidebar />
                <main className='flex-1 p-4'>{children}</main>
            </div>
        </div>
    );
}
