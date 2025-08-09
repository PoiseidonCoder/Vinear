'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import { AuthRequestDto } from '@/types/auth';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { GoogleButton } from '@/components/ui/google-button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { authRoutes } from '@/config/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { authSchema } from '@/schema/auth';
import useLogin from '@/hooks/queries/use-login';

const LoginPage = () => {
    const t = useTranslations('auth');
    const [showPassword, setShowPassword] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const form = useForm<AuthRequestDto>({
        resolver: zodResolver(authSchema(t)),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const { mutateAsync: loginMutate, isPending: isLoging } = useLogin(t);

    const onSubmit = async (authRequestDto: AuthRequestDto) => {
        await loginMutate(authRequestDto);
    };

    const handleGoogleLogin = async () => {
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
                            {t('login_title')}
                        </CardTitle>
                        <CardDescription className='text-muted-foreground text-lg'>{t('login_description')}</CardDescription>
                    </CardHeader>

                    <CardContent className='space-y-6'>
                        <GoogleButton onClick={handleGoogleLogin} loading={googleLoading}>
                            {t('google_login')}
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
                                            <FormLabel className='text-sm font-semibold'>{t('username')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('username_placeholder')}
                                                    className='h-12 rounded-xl border-border/60 bg-background/50 focus:bg-background transition-colors'
                                                    {...field}
                                                />
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
                                            <FormLabel className='text-sm font-semibold'>{t('password')}</FormLabel>
                                            <FormControl>
                                                <div className='relative'>
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder={t('password_placeholder')}
                                                        className='h-12 rounded-xl border-border/60 bg-background/50 focus:bg-background transition-colors pr-12'
                                                        {...field}
                                                    />
                                                    <Button
                                                        type='button'
                                                        variant='ghost'
                                                        size='sm'
                                                        className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent/50'
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type='submit'
                                    className='w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                                    disabled={isLoging}
                                >
                                    {isLoging ? (
                                        <div className='flex items-center gap-2'>
                                            <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                                            {t('logging_in')}
                                        </div>
                                    ) : (
                                        t('login_button')
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className='pt-0 pb-8'>
                        <div className='w-full text-center'>
                            <p className='text-sm text-muted-foreground'>
                                {t('no_account')}{' '}
                                <Link
                                    href={authRoutes.register}
                                    className='font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-2'
                                >
                                    {t('create_account')}
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
