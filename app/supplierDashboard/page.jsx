'use client'

import React, { useState, useEffect } from 'react';
import ProductUploadForm from './ProductUploadForm';
import Products from './Products';
import { supabase } from '../utils/supabaseClient';

const SupplierDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [showProductUploadForm, setShowProductUploadForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProducts(user.id);
    }
  }, [showProductUploadForm, user]);


  const fetchProducts = async (userId) => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('supplier_id', userId);
      if (error) {
        throw error;
      }
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const toggleProductUploadForm = () => {
    setShowProductUploadForm(!showProductUploadForm);
  };

  return (
    <div className='min-h-screen flex flex-col items-center text-black justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <h1>Welcome to Supplier Dashboard, {user ? user.name : 'Guest'}!</h1>
      <button onClick={toggleProductUploadForm} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Upload Product
      </button>
      {showProductUploadForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="z-10">
            <ProductUploadForm onClose={toggleProductUploadForm} />
          </div>
        </div>
      )}
      <Products products={products} />
    </div>
  );
};

export default SupplierDashboard;
