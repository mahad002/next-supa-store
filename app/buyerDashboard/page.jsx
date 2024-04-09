'use client'

import React from 'react';
import BuyerProducts from './BuyerProducts';
import { useRouter } from 'next/navigation';

const BuyerDashboard = () => {
    const router = useRouter();
    // Check if localStorage is available before using it
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : JSON.parse(localStorage.getItem('user'));

    console.log('User:', user);

    const handleLogin = async () => {
        router.push('/login');
    }
    if (user == null) {
        return (
            <div className='min-h-screen flex flex-col items-center text-black justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
                <h1>Error 404, Access Denied!</h1>
                <button type="submit" onClick={handleLogin} className="group relative w-1/2 mt-4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4 8a6 6 0 1112 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm2-2a2 2 0 012-2h4a2 2 0 012 2v1H6V6z" clipRule="evenodd" />
                        </svg>
                    </span>
                    Sign in
                </button>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex flex-col items-center text-black justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <h1>Welcome to Buyer Dashboard, {user.name}!</h1>
            <BuyerProducts />
        </div>
    );
};

export default BuyerDashboard;
