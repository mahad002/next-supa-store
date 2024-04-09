// ProductUploadForm.js
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import useUserStore from '../stores/userStore';

const standardCategories = ['Electronics', 'Food', 'Fruit', 'Furniture', 'Gadgets', 'Clothing', 'Books', 'Home Appliances', 'Beauty', 'Toys'];

const ProductUploadForm = ({ onSubmit, onClose }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleProductUpload = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error('User is not authenticated. Please log in.');
      }
  
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: productName,
          category,
          description,
          supplier_id: user.id,
        });
  
      if (error) {
        throw error;
      }
  
      console.log('Product uploaded successfully:', data);
      // Clear form fields after successful submission
      setProductName('');
      setCategory('');
      setDescription('');
      onClose(); // Close the pop-up after successful submission
    } catch (error) {
      console.error('Error uploading product:', error.message);
      // Handle error state (e.g., show error message to the user)
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-md shadow-md">
        <button className="absolute top-0 right-0 m-4 text-gray-500" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Upload Product</h2>
        <form className="mt-8 space-y-6" onSubmit={handleProductUpload}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="productName" className="sr-only">Product Name:</label>
              <input
                id="productName"
                name="productName"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="sr-only">Category:</label>
              <select
                id="category"
                name="category"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select Category</option>
                {standardCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Description:</label>
              <textarea
                id="description"
                name="description"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadForm;
