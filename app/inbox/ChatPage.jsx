
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient'; // Import supabase client

const ChatPage = ({thread}) => {
    // const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // const { threadId, messageId, buyerId, supplierId } = router.query;
    const threadId = thread.id;
    const buyerId = thread.user1_id;
    const supplierId = thread.user2_id;


    // Fetch messages for the selected thread
    useEffect(() => {
        async function fetchMessages() {
            try {
                // Fetch messages based on the selected thread ID
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('thread_id', threadId);

                if (error) {
                    throw error;
                }

                // Update state with fetched messages
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error.message);
            }
        }

        fetchMessages();
    }, [threadId]);

    // Function to handle sending a new message
    const sendMessage = async () => {
        try {
            // Insert the new message into the database
            const { data, error } = await supabase
                .from('messages')
                .insert({
                    thread_id: threadId,
                    sender_id: buyerId, // Assuming buyer is sending the message
                    receiver_id: supplierId,
                    message: newMessage,
                    is_request_related: false,
                })
                .select();

            if (error) {
                throw error;
            }

            // Add the new message to the local state
            setMessages([...messages, data]);

            // Clear the input field after sending the message
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Chat with {buyerId} and {supplierId}</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <ul className="divide-y divide-gray-200 text-black">
                            {messages.map(message => (
                                <li key={message.id}>
                                    <p>{message.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="px-4 py-3 sm:px-6">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                        />
                        <button
                            onClick={sendMessage}
                            className="mt-2 inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
