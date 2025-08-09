'use client';

import { useEffect } from 'react';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className='flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-gray-700'>
            <h1 className='text-7xl font-extrabold text-gray-900 mb-4'>500</h1>
            <p className='text-2xl mb-6'>Something went wrong.</p>
            <p className='mb-8 max-w-md text-center text-gray-600'>An unexpected error occurred. Please try again or contact support.</p>
            <button onClick={() => reset()} className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'>
                Go To Back
            </button>
        </main>
    );
}
