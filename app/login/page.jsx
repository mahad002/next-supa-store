'use client'

import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { supabase } from '../utils/supabaseClient';
import {useUserStore} from '../stores/userStore';
import {useRouter} from "next/router";

export default function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  },[]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);

      if (error) {
        throw error;
      }

      if (!users || users.length === 0) {
        throw new Error('User not found');
      }

      const user = users[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      // Set the user data in the Zustand store
      setUser(user);

      // Redirect the user to the appropriate dashboard based on their role
      if (user.role === 'buyer') {
        router.push('/buyerDashboard');
      } else if (user.role === 'supplier') {
        router.push('/supplierDashboard');
      } else {
        // Handle other roles or scenarios
      }

      console.log('User signed in successfully:', user);
      setPassword('');
      setEmail('');
      
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert(error.message);
    }
  };

  if(loading) return (<div>Loading...</div>);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4 8a6 6 0 1112 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm2-2a2 2 0 012-2h4a2 2 0 012 2v1H6V6z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-2 text-black">
        <p>
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:text-blue-800">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
