'use client'
import React from 'react';
import useUserStore from '../stores/userStore';
import { useClient } from 'next/client';

const BuyerDashboard = () => {
    const user = useUserStore((state) => state.user);
    console.log('User:', user);
  return (
    <div className='min-h-screen flex flex-col items-center text-black justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <h1>Welcome to Buyer Dashboard, {user.name}!</h1>
      {/* Add content specific to the supplier dashboard */}
    </div>
  );
};

export default function ClientSupplierDashboard() {
    // Ensure rendering only on the client side
    if (typeof window === 'undefined') return null;
  
    return <BuyerDashboard />;
  }