import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Import supabase client

// MessageList component
const MessageList = ({ threadId }) => {
    const [messages, setMessages] = useState([]);

    // Fetch messages for the specified thread from Supabase
    useEffect(() => {
        async function fetchMessages() {
            try {
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

    return (
        <ul className="mt-2 ml-6">
            {messages.map(message => (
                <li key={message.id} className="mb-1">
                    <p>{message.message}</p>
                </li>
            ))}
        </ul>
    );
};

export default MessageList;
