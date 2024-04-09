import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import RequestPopup from './RequestPopup'; // Import your request popup component

const ProductCard = ({ product }) => {
    const { id, name, category, description, supplier_id } = product;
    const [supplier, setSupplier] = useState(null);
    const [showRequestPopup, setShowRequestPopup] = useState(false);

    useEffect(() => {
        fetchSupplier();
    }, []);

    const fetchSupplier = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', supplier_id)
                .single();

            if (error) {
                throw error;
            }

            setSupplier(data);
        } catch (error) {
            console.error('Error fetching supplier:', error.message);
        }
    };

    const handleRequest = () => {
        // Toggle the visibility of the request popup
        setShowRequestPopup(true);
    };

    const handleCloseRequestPopup = () => {
        // Close the request popup
        setShowRequestPopup(false);
    };

    return (
        <div className="border rounded-lg p-4 m-4 cursor-pointer hover:bg-gray-100 relative" style={{ width: '300px', height: '200px' }}>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600 mb-2">{category}</p>
            <p className="text-gray-700">{description}</p>
            {/* Add a button for the request */}
            <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleRequest}>Request</button>
            {/* Render the request popup component if showRequestPopup is true */}
            {showRequestPopup && <RequestPopup product={product} supplier={supplier} onClose={handleCloseRequestPopup} />}
        </div> 
    );
};

export default ProductCard;
