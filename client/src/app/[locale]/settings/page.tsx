'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { User, Shield, Palette } from 'lucide-react';

const SettingsPage = () => {
    const t = useTranslations('settings');

    const settingsOptions = [
        {
            key: 'profile',
            title: t('profile.title'),
            description: t('profile.description'),
            icon: User,
            href: '/settings/profile'
        },
        {
            key: 'privacy',
            title: t('privacy.title'),
            description: t('privacy.description'),
            icon: Shield,
            href: '/settings/privacy'
        },
        {
            key: 'appearance',
            title: t('appearance.title'),
            description: t('appearance.description'),
            icon: Palette,
            href: '/settings/appearance'
        }
    ];

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold'>{t('title')}</h1>
                    <p className='text-muted-foreground mt-2'>{t('description')}</p>
                </div>

                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {settingsOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <Link key={option.key} href={option.href}>
                                <Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
                                    <CardHeader>
                                        <div className='flex items-center space-x-3'>
                                            <div className='p-2 rounded-lg bg-primary/10'>
                                                <Icon className='w-6 h-6 text-primary' />
                                            </div>
                                            <CardTitle className='text-lg'>{option.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{option.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
