'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LocaleStore = {
    locale: string;
    setLocale: (locale: string) => void;
};

export const useLocaleStore = create<LocaleStore>()(
    persist(
        (set) => ({
            locale: 'vi',
            setLocale: (locale) => set({ locale })
        }),
        {
            name: 'locale-storage'
        }
    )
);
