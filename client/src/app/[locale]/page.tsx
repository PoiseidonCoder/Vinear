'use client';
import { useTranslations } from 'next-intl';

import { Phone, Video, MessageCircle } from 'lucide-react';
import ProfileCard from '@/components/ui/profile-card';
import { featuresData, profilesData } from '@/config/data';

const HomePage = () => {
    const t = useTranslations('home');

    return (
        <>
            <section
                className='min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed'
                style={{
                    backgroundImage: "url('https://tinder.com/static/build/744fe6d80266616aba687006b7d764ad.webp')"
                }}
            >
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl'></div>
                    <div className='absolute bottom-20 right-10 w-48 h-48 bg-accent rounded-full blur-3xl'></div>
                </div>

                <div className='container mx-auto px-6 py-20 relative z-10'>
                    <div className='grid lg:grid-cols-2 gap-12 items-center'>
                        <div className='space-y-8'>
                            <div className='space-y-6'>
                                <h1 className='text-5xl lg:text-7xl font-bold'>
                                    <span className='text-foreground'>{t('hero.title')}</span>
                                </h1>
                                <p className='text-xl text-muted-foreground leading-relaxed max-w-lg'>{t('hero.description')}</p>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-4'>
                                <button className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2'>
                                    <Video className='w-5 h-5' />
                                    {t('actions.startVideoCall')}
                                </button>
                                <button className='bg-card/80 backdrop-blur-sm text-foreground px-8 py-4 rounded-xl font-semibold border border-border hover:bg-card transition-all duration-300 flex items-center gap-2'>
                                    <MessageCircle className='w-5 h-5' />
                                    {t('actions.joinChat')}
                                </button>
                            </div>
                        </div>

                        <div className='relative h-[600px] lg:h-[700px]'>
                            {profilesData.map((p, i) => (
                                <div key={i} className={p.wrapperClass}>
                                    <ProfileCard name={p.name} age={p.age} image={p.image} verified={p.verified} className={p.cardClass} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className='py-20 bg-background'>
                <div className='container mx-auto px-6'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl lg:text-5xl font-bold mb-6 text-foreground'>{t('whyChoose.title')}</h2>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>{t('whyChoose.description')}</p>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {featuresData.map((feature, index) => (
                            <div
                                key={index}
                                className='bg-card rounded-2xl p-8 shadow-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border'
                            >
                                <div className='text-primary mb-4'>{feature.icon}</div>
                                <h3 className='text-xl font-semibold mb-3 text-foreground'>{feature.title}</h3>
                                <p className='text-muted-foreground'>{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className='text-center mt-12'>
                        <button className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto'>
                            <Phone className='w-5 h-5' />
                            {t('actions.startFirstCall')}
                        </button>
                    </div>
                </div>
            </section>

            <div className='fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-6 z-50'>
                <div className='container mx-auto'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                        <p className='text-sm text-muted-foreground'>{t('privacy.notice')}</p>
                        <div className='flex gap-3 shrink-0'>
                            <button className='bg-muted text-muted-foreground px-6 py-2 rounded-lg text-sm hover:bg-muted/80 transition-colors'>
                                {t('privacy.settings')}
                            </button>
                            <button className='bg-foreground text-background px-6 py-2 rounded-lg text-sm hover:bg-foreground/90 transition-colors'>
                                {t('privacy.accept')}
                            </button>
                            <button className='border border-border px-6 py-2 rounded-lg text-sm hover:bg-muted/50 transition-colors'>
                                {t('privacy.decline')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
