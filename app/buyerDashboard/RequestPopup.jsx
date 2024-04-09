import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import supabase client

const RequestPopup = ({ product, supplier, onClose }) => {
    const [quantity, setQuantity] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [requestId, setRequestId] = useState(null);
    const [messageThreadId, setMessageThreadId] = useState(null);
    const [messageId, setMessageId] = useState(null);

    console.log('Product:', product);
    console.log('Supplier:', supplier);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Fetch the buyer from local storage
            const buyer = JSON.parse(localStorage.getItem('user'));
            if (!buyer) {
                throw new Error('Buyer not found in local storage');
            }
    
            // Insert request details into the requests table
            const { data: request, error: requestError } = await supabase
                .from('requests')
                .insert({
                    buyer_id: buyer.id,
                    product_id: product.id,
                    supplier_id: supplier.id,
                    quantity,
                    delivery_time: deliveryTime,
                    status: 'pending',
                })
                .select();

                console.log('Request:', request[0].id)
    
            // Handle request error
            if (requestError) {
                throw requestError;
            }
    
            // Update requestId state with the ID of the created request
            setRequestId(request[0].id);
    
            // Create a message thread for the request
            const { data: messageThread, error: threadError } = await supabase
                .from('message_threads')
                .insert({
                    user1_id: buyer.id,
                    user2_id: supplier.id,
                    request_id: request[0].id,
                })
                .select();
    
            // Handle thread error
            if (threadError) {
                throw threadError;
            }
    
            // Update messageThreadId state with the ID of the created message thread
            setMessageThreadId(messageThread[0].id);
            console.log('Message Thread:', messageThread[0]);
    
            // Create a message for the request
            const { data: message, error: messageError } = await supabase
                .from('messages')
                .insert({
                    thread_id: messageThread[0].id,
                    sender_id: buyer.id,
                    receiver_id: supplier.id,
                    message: `Request for ${quantity} ${product.name}`,
                    is_request_related: true,
                })
                .select();
    
            // Handle message error
            if (messageError) {
                throw messageError;
            }
    
            // Update messageId state with the ID of the created message
            setMessageId(message[0].id);
    
            console.log('Request submitted successfully:', request, message);
            onClose(); // Close the pop-up after successful submission
        } catch (error) {
            console.error('Error submitting request:', error.message);
            // Handle error state (e.g., show error message to the user)
        }
    };
    
    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Request Details</h3>
                                    <div className="mt-2">
                                        <div className="mb-4">
                                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                            <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Delivery Time</label>
                                            <input type="datetime-local" name="deliveryTime" id="deliveryTime" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
                            <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestPopup;
