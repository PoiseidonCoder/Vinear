'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const toggleTheme = () => {
        setIsToggling(true);

        // Smooth transition timing
        setTimeout(() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
            setTimeout(() => setIsToggling(false), 250);
        }, 100);
    };

    return (
        <div className='fixed bottom-6 right-6 z-50 group'>
            <div className='backdrop-blur-xl bg-background/20 border border-border/50 rounded-full p-1.5 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1'>
                <button
                    onClick={toggleTheme}
                    disabled={isToggling}
                    className={`relative w-20 h-10 rounded-full p-1 flex items-center overflow-hidden transform transition-all duration-500 ease-in-out ${
                        theme === 'dark'
                            ? 'bg-gradient-to-r from-slate-800 to-slate-900 shadow-inner'
                            : 'bg-gradient-to-r from-white to-gray-50 shadow-inner'
                    } hover:scale-105 active:scale-95 ${isToggling ? 'scale-110' : 'scale-100'}`}
                >
                    <div
                        className={`absolute inset-0 rounded-full transition-opacity duration-500 ease-in-out ${
                            theme === 'dark'
                                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100'
                                : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 hover:opacity-100'
                        }`}
                    />

                    <div
                        className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center transform transition-all duration-500 ease-in-out ${
                            theme === 'dark'
                                ? 'translate-x-10 text-blue-100 bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg ring-2 ring-blue-400/30'
                                : 'translate-x-0 text-orange-600 bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg ring-2 ring-orange-400/30'
                        } ${isToggling ? 'scale-110 rotate-180' : 'scale-100 rotate-0'}`}
                    >
                        <div
                            className={`transform transition-all duration-300 ease-in-out ${isToggling ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}`}
                        >
                            {theme === 'dark' ? <Moon className='w-4 h-4 drop-shadow-sm' /> : <Sun className='w-4 h-4 drop-shadow-sm' />}
                        </div>
                    </div>

                    {isToggling && <div className='absolute inset-0 rounded-full bg-primary/30 animate-pulse transition-opacity duration-300' />}
                </button>
            </div>
        </div>
    );
}
