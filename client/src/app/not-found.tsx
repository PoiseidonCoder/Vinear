'use client';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className='flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-gray-700'>
            <h1 className='text-7xl font-extrabold text-red-600 mb-4'>404</h1>
            <p className='text-2xl mb-6'>Oops! Page Not Found.</p>
            <Link href='/' className='px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition'>
                Go To Back
            </Link>
        </main>
    );
}
