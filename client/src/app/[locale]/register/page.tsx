'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { AuthRequestDto } from '@/types/auth';
import { authSchema } from '@/schema/auth';
import useRegister from '@/hooks/queries/use-register';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { GoogleButton } from '@/components/ui/google-button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { authRoutes } from '@/config/navigation';

import { useState } from 'react';

const RegisterPage = () => {
    const t = useTranslations('auth');
    const [googleLoading, setGoogleLoading] = useState(false);

    const form = useForm<AuthRequestDto>({
        resolver: zodResolver(authSchema(t)),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const { mutateAsync: registerMutate, isPending: isRegistering } = useRegister(t);

    const onSubmit = async (authRequestDto: AuthRequestDto) => {
        await registerMutate(authRequestDto);
    };

    const handleGoogleRegister = async () => {
        setGoogleLoading(true);
        setTimeout(() => setGoogleLoading(false), 2000);
    };

    return (
        <div
            className='min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-fixed'
            style={{ backgroundImage: "url('https://tinder.com/static/build/744fe6d80266616aba687006b7d764ad.webp')" }}
        >
            <div className='w-full max-w-md'>
                <Card className='shadow-2xl border border-border/60 rounded-3xl backdrop-blur-sm bg-card/80'>
                    <CardHeader className='text-center space-y-4 pb-6'>
                        <CardTitle className='text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text'>
                            {t('register_title')}
                        </CardTitle>
                        <CardDescription className='text-muted-foreground text-lg'>{t('register_description')}</CardDescription>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                        <GoogleButton onClick={handleGoogleRegister} loading={googleLoading}>
                            {t('google_register')}
                        </GoogleButton>

                        <div className='relative'>
                            <Separator className='bg-border/60' />
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <span className='bg-card px-4 text-sm text-muted-foreground font-medium'>{t('or_divider')}</span>
                            </div>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('username')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('username_placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('password')}</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder={t('password_placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type='submit' className='w-full' disabled={isRegistering}>
                                    {isRegistering ? t('register_in') : t('register_button')}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className='pt-0 pb-8'>
                        <div className='w-full text-center'>
                            <p className='text-sm text-muted-foreground'>
                                {t('have_account')}{' '}
                                <Link
                                    href={authRoutes.login}
                                    className='font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-2'
                                >
                                    {t('sign_in')}
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;
