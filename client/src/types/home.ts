import { ReactNode } from 'react';

export interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
}

export interface ProfileCardData {
    name: string;
    age: number;
    image: string;
    verified?: boolean;
    cardClass?: string;
    wrapperClass: string;
}
