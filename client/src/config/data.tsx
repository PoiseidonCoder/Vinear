import { Users, Shield, Video, MessageCircle } from 'lucide-react';
import type { Feature, ProfileCardData } from '@/types/home';

export const featuresData: Feature[] = [
    { icon: <Video className='w-8 h-8' />, title: 'Video Calls', description: 'Connect face-to-face with high quality video calls' },
    { icon: <MessageCircle className='w-8 h-8' />, title: 'Live Chat', description: 'Real-time messaging with your matches' },
    { icon: <Users className='w-8 h-8' />, title: 'Group Calls', description: 'Host group video calls with multiple people' },
    { icon: <Shield className='w-8 h-8' />, title: 'Safe & Secure', description: 'End-to-end encryption for your privacy' }
];

export const profilesData: ProfileCardData[] = [
    {
        name: 'Sophia',
        age: 25,
        image: 'https://tse-mm.bing.com/th?q=%E1%BA%A3nh%20g%C3%A1i%20xinh%2018',
        verified: true,
        cardClass: 'animate-float',
        wrapperClass: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30'
    },
    {
        name: 'Alex',
        age: 28,
        image: 'https://kenh14cdn.com/203336854389633024/2024/6/19/photo-21-17187651944931034176482.jpg',
        cardClass: 'animate-float-delayed opacity-90 scale-90',
        wrapperClass: 'absolute top-8 left-4 z-20 -rotate-[15deg]'
    },
    {
        name: 'Maria',
        age: 26,
        image: 'https://danviet-24h.ex-cdn.com/files/upload/2-2021/images/2021-05-22/anh-8-1621645023-458-width650height813.jpg',
        verified: true,
        cardClass: 'animate-float opacity-80 scale-85',
        wrapperClass: 'absolute top-16 right-0 z-20 rotate-[10deg]'
    },
    {
        name: 'James',
        age: 24,
        image: 'https://yt3.googleusercontent.com/MxCG9mY4BVOI8-CcsXTkXxdDMzUefM9tC1I1tUMrOiBljvaK8znUls43Uy7xhsBPQWkQePemhg=s900-c-k-c0x00ffffff-no-rj',
        cardClass: 'animate-float-delayed opacity-75 scale-80',
        wrapperClass: 'absolute bottom-8 left-8 z-10 -rotate-[8deg]'
    }
];
