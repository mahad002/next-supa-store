// BuyerProducts.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import ProductCard from './ProductCard';

const BuyerProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);
    
    useEffect(() => {
        fetchProducts(); // Fetch products initially
        const intervalId = setInterval(fetchProducts, 60000); // Fetch products every 1 minute

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (error) {
                throw error;
            }
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    }; 

    return (
        <div className="flex flex-wrap justify-center">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default BuyerProducts;
