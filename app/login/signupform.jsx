import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('buyer'); // Default to 'buyer'
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        // userType,
      });
      if (error) {
        throw error;
      }
      // Redirect to appropriate dashboard based on user type
      router.push(userType === 'buyer' ? '/buyer-dashboard' : '/supplier-dashboard');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className="w-full px-3 py-2 bg-gray-300 text-black rounded-md border-gray-300 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        className="w-full px-3 py-2 rounded-md border-gray-300 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
      />
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        className="w-full px-3 py-2 rounded-md text-black bg-gray-300 border-gray-600 mb-4 focus:outline-none focus:ring focus:ring-blue-400"
      >
        <option value='buyer'>Buyer</option>
        <option value='supplier'>Supplier</option>
      </select>
      <button onClick={handleSignUp} className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
        Sign up
      </button>
    </div>
  );
}
