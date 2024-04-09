import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter hook to handle navigation

const Chat = ({ thread }) => {
    const router = useRouter();

    // Function to handle click on the chat component
    // const handleChatClick = () => {
    //     // Navigate to the dedicated chat page with the necessary data as query parameters
    //     router.push({
    //         pathname: '/ChatPage',
    //         query: {
    //             threadId: thread.id,
    //             messageId: message.id,
    //             buyerId: buyer.id,
    //             supplierId: supplier.id
    //         }
    //     });
    // };

    return (
        <div className="px-4 py-4 sm:px-6 text-black cursor-pointer">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zM1 10a9 9 0 1118 0 9 9 0 01-18 0zm11 0a1 1 0 10-2 0 1 1 0 002 0zm-5 0a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{thread.subject}</p>
                    <p className="text-sm text-gray-500">{thread.last_message}</p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
