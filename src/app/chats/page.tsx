"use client";

import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import useApi from "@/hooks/use-api";

const Chats = () => {
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const { getActiveConversation, createNewConversation } = useApi();
    const [isLoadingConversation, setIsLoadingConversation] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrCreateConversation = async () => {
            // Wait for authentication to complete
            if (authLoading) return;
            
            // Redirect to auth if not authenticated
            if (!user) {
                router.push('/auth');
                return;
            }

            try {
                setIsLoadingConversation(true);
                setError(null);
                
                console.log('Fetching active conversation for user');
                const conversationData = await getActiveConversation();
                
                
                if (conversationData?.conversation?.sessionId) {
                    // User has an active conversation, redirect to it
                    const sessionId = conversationData.conversation.sessionId;
                    router.push(`/chats/mia/${sessionId}`);
                } else {
                    // No active conversation found - create one via backend
                    try {
                        const newConversationData = await createNewConversation();
                        const newSessionId = newConversationData.conversation.sessionId;
                        router.push(`/chats/mia/${newSessionId}`);
                    } catch (createError) {
                        console.error('Failed to create new conversation:', createError);
                        setError('Failed to create conversation. Please try again.');
                    }
                }
                
            } catch (error: any) {
                console.error('Failed to load conversation:', error);
                console.error('Error details:', error.response?.status, error.response?.data);

                if (error.response?.status === 404) {
                    // No conversation history found - create one via backend
                    try {
                        const newConversationData = await createNewConversation();
                        const newSessionId = newConversationData.conversation.sessionId;
                        router.push(`/chats/mia/${newSessionId}`);
                    } catch (createError) {
                        console.error('Failed to create new conversation after 404:', createError);
                        setError('Failed to create conversation. Please try again.');
                    }
                } else {
                    // Other error - show error message
                    setError('Failed to load conversation. Please try again.');
                }
            } finally {
                setIsLoadingConversation(false);
            }
        };

        loadOrCreateConversation();
    }, [user, authLoading, router]); // Removed getActiveConversation and createNewConversation to prevent infinite loop

    if (error) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="text-center">
                <Loading />
                <p className="mt-4 text-gray-600">
                    {isLoadingConversation ? 'Loading your conversation...' : 'Preparing chat...'}
                </p>
            </div>
        </div>
    );
};

export default Chats;