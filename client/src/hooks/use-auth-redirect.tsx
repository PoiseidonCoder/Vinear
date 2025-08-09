'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/hooks/stores/use-auth-store';

export const useAuthRedirect = () => {
    const router = useRouter();
    const { sessionToken } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (sessionToken) {
            router.replace('/');
            return;
        }
        setIsChecking(false);
    }, [sessionToken, router]);

    return {
        isAuthenticated: !!sessionToken,
        isChecking: isChecking && !!sessionToken
    };
};
