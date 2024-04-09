'use client'

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import supabase client
import Chat from './Chat'; // Import the Chat component
import ChatPage from './ChatPage'; // Import the ChatPage component

// Inbox component
const Inbox = () => {
    const [messageThreads, setMessageThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null); // State to track the selected thread

    // Fetch message threads from Supabase
    useEffect(() => {
        async function fetchMessageThreads() {
            try {
                // Fetch the current user from local storage
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not found in local storage');
                }

                // Determine whether the user is a buyer or a supplier
                const isBuyer = user.role === 'buyer';

                // Fetch message threads based on user role
                const { data, error } = await supabase
                    .from('message_threads')
                    .select('*')
                    .eq(isBuyer ? 'user1_id' : 'user2_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                console.log('Message threads:', data);

                // Update state with fetched message threads
                setMessageThreads(data);
            } catch (error) {
                console.error('Error fetching message threads:', error.message);
            }
        }

        fetchMessageThreads();
    }, []);

    // Function to handle chat item click
    const handleChatClick = (thread) => {
        // Set the selected thread
        setSelectedThread(thread);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Your Messages</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Below are the message threads in your inbox.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200 text-black">
                            {messageThreads.map(thread => (
                                <li key={thread.id} onClick={() => handleChatClick(thread)} style={{ cursor: 'pointer' }}>
                                    <Chat thread={thread} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {selectedThread && <ChatPage thread={selectedThread} />} {/* Render the ChatPage component with the selected thread */}
        </div>
    );
};

export default Inbox;

