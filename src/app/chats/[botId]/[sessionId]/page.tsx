"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useApi from "@/hooks/use-api";
import AIChat from "@/components/AIChat";
import pfp from "../../../../../public/img/pfp.png";
import { useSocket } from "@/contexts/SocketContext";
import { useAuth } from "@/contexts/AuthContext";

interface SessionBubbleProps {
    idSession: string;
    botName: string;
    lastMessage: string;
    templateNumber: number;
    active: boolean;
    onClick: () => void;
}

const SessionBubble: React.FC<SessionBubbleProps> = ({ 
    idSession, botName, lastMessage, templateNumber, active, onClick }) => {
    return (
        <div id={idSession}
        onClick={onClick}
        className="flex items-center p-3 gap-3 hover:bg-gray-200 cursor-pointer" 
        style={{ backgroundColor: active ? "#dcdcdc" : "none", borderRadius: "10px" }}>
            <Avatar>
                <AvatarImage src={pfp.src} />
            </Avatar>
            <div className="flex flex-col">
                <h3 className="font-bold">{botName}</h3>
                <p className="" style={{ fontSize: "0.85rem" }}>
                    {lastMessage?.slice(0, 35) || ''}
                    </p>
            </div>
        </div>
    );
};


const Session = () => {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const { botId, sessionId } = useParams<{
        botId: string;
        sessionId: string;
    }>();
    
    const [conversationData, setConversationData] = useState<any>(null);
    const [isLoadingConversation, setIsLoadingConversation] = useState(false);
    const { getChatMessages, createNewConversation } = useApi();
    const socketContext = useSocket();
    const { messages: socketMessages = [] } = socketContext || {};

    useEffect(() => {
        const loadConversationData = async () => {
            // Handle "new" sessions by creating a proper conversation via backend
            if (sessionId === 'new') {
                console.log('New session detected - creating conversation via backend and redirecting');
                try {
                    const newConversationData = await createNewConversation();
                    const newSessionId = newConversationData.conversation.sessionId;
                    console.log('Created new conversation from new session, redirecting to:', newSessionId);
                    router.push(`/chats/mia/${newSessionId}`);
                    return;
                } catch (error) {
                    console.error('Failed to create new conversation from new session:', error);
                    // Set empty state as fallback
                    setConversationData({
                        messages: [],
                        conversation: {
                            sessionId: 'new',
                            title: 'Chat with MIA'
                        }
                    });
                    setIsLoadingConversation(false);
                    return;
                }
            }

            try {
                setIsLoadingConversation(true);
                console.log('Loading conversation data for sessionId:', sessionId);
                
                const data = await getChatMessages(sessionId, null, null);
                setConversationData(data);
                console.log('Loaded conversation data:', data);
                
            } catch (error) {
                console.error('Failed to load conversation data:', error);
                // Set empty state instead of failing completely
                setConversationData({
                    messages: [],
                    conversation: {
                        sessionId: sessionId,
                        title: 'Chat with MIA'
                    }
                });
            } finally {
                setIsLoadingConversation(false);
            }
        };

         if (sessionId && !authLoading && user) {
            loadConversationData();
        }
    }, [sessionId, authLoading, user, router]);

    const getLastMessage = () => {
        if (isLoadingConversation) {
            return "Loading...";
        }
        
        if (!conversationData || !conversationData.messages || conversationData.messages.length === 0) {
            return "Start chatting with MIA...";
        }
        
        const lastMessage = conversationData.messages[conversationData.messages.length - 1];
        return lastMessage.content.slice(0, 35) + (lastMessage.content.length > 35 ? "..." : "");
    };

    return (
        <div className="flex h-full w-full">
            <div className="hidden md:flex flex-col h-full w-full md:w-1/3 py-4 pr-[24.78px]" style={{ borderRight: "1px solid #E5E5E5" }}>
                <h2>Chats</h2>

                <div className="flex flex-col mt-3">
                    <SessionBubble 
                        onClick={() => router.push(`/chats/mia/${sessionId}`)}
                        key="mia-conversation"
                        botName="MIA"
                        idSession={sessionId}
                        lastMessage={getLastMessage()}
                        templateNumber={12}
                        active={true}
                    />
                </div>
            </div>
            <div className="flex flex-col h-full w-full">
                <AIChat sessionId={sessionId} botId={botId} />
            </div>
        </div>
    );
};

export default Session;