'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Camera, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import useAuthStore from '@/hooks/stores/use-auth-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImageCropper } from '@/components/ui/image-cropper';
import { useUploadAvatar } from '@/hooks/queries/use-upload-avatar';
import { useUpdateProfile } from '@/hooks/queries/use-update-profile';
import Image from 'next/image';

const profileSchema = z.object({
    username: z.string().min(3, 'username_min_length').max(20, 'username_max_length'),
    email: z.string().email('invalid_email').optional().or(z.literal(''))
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileSettingsPage = () => {
    const t = useTranslations('settings.profile');
    const { user } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [showCropper, setShowCropper] = useState(false);

    const uploadAvatarMutation = useUploadAvatar();
    const updateProfileMutation = useUpdateProfile();

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: user?.username || '',
            email: user?.email || ''
        }
    });

    const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setSelectedImage(file);
        setShowCropper(true);
    };

    const handleCroppedImage = (croppedFile: File) => {
        uploadAvatarMutation.mutate(croppedFile);
        setShowCropper(false);
    };

    const onSubmit = (data: ProfileFormData) => {
        updateProfileMutation.mutate(data);
    };

    if (!user) {
        return null;
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <div className='mb-6 flex items-center space-x-4'>
                    <Link href='/settings'>
                        <Button variant='ghost' size='sm'>
                            <ArrowLeft className='w-4 h-4 mr-2' />
                            {t('back_to_settings')}
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('title')}</CardTitle>
                        <CardDescription>{t('description')}</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        <div className='flex flex-col items-center space-y-4'>
                            <div className='relative'>
                                <Avatar className='h-24 w-24'>
                                    {user.avatarUrl ? (
                                        <Image
                                            width={96}
                                            height={96}
                                            src={user.avatarUrl}
                                            alt={user.username}
                                            className='h-full w-full object-cover rounded-full'
                                        />
                                    ) : (
                                        <div className='flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-2xl font-bold'>
                                            {user.username?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </Avatar>
                                <label className='absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors'>
                                    <Camera className='w-4 h-4' />
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleAvatarSelect}
                                        className='hidden'
                                        disabled={uploadAvatarMutation.isPending}
                                    />
                                </label>
                            </div>
                            {uploadAvatarMutation.isPending && (
                                <div className='flex items-center space-x-2'>
                                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-primary'></div>
                                    <p className='text-sm text-muted-foreground'>{t('uploading_avatar')}</p>
                                </div>
                            )}
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('username')}</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder={t('username_placeholder')} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('email')}</FormLabel>
                                            <FormControl>
                                                <Input {...field} type='email' placeholder={t('email_placeholder')} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='pt-4'>
                                    <Button type='submit' disabled={updateProfileMutation.isPending} className='w-full'>
                                        <Save className='w-4 h-4 mr-2' />
                                        {updateProfileMutation.isPending ? t('saving') : t('save_changes')}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <ImageCropper isOpen={showCropper} onClose={() => setShowCropper(false)} onCrop={handleCroppedImage} imageFile={selectedImage} />
            </div>
        </div>
    );
};

export default ProfileSettingsPage;
