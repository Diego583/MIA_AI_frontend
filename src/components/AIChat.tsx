import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { splitSentences } from "@/utils/string";
import { useSocket } from "@/contexts/SocketContext";
import { useAuth } from "@/contexts/AuthContext";
import Picture from "@/components/ui/picture";
import ChatInput from "@/components/ChatInput";
import ChatBox from "@/components/ChatBox";
import Header from "@/components/Header";
import useApi from "@/hooks/use-api";
import pfp from "../../public/img/pfp.png";


type AIChatProps = {
    botId: string;
    sessionId: string;
    showSettings?: boolean;
};

const AIChat: React.FC<AIChatProps> = ({ botId, sessionId, showSettings=true }) => {
    console.log('AIChat: Component rendering with botId:', botId, 'sessionId:', sessionId);
    
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const socketContext = useSocket();
    const { 
        sendMessage, 
        messages: socketMessages = [], 
        isMiaTyping = false, 
        error: socketError = null 
    } = socketContext || {};
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [botName, setBotName] = useState("");
    const [botError] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ text: string; isReply: boolean }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreMessages, setHasMoreMessages] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const { getChatMessages } = useApi();
    const processedSocketMessageCount = useRef(0);

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSendMessage = (message: string) => {
        if (sendMessage) {
            sendMessage(message, sessionId);
        }
    };

    const loadMoreMessages = async () => {
        if (isLoadingMore || !hasMoreMessages || sessionId === 'new') {
            return;
        }

        setIsLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            const data = await getChatMessages(sessionId, nextPage, null);
            const history: { text: string; isReply: boolean }[] = [];

            data.messages.forEach((message: { type: string; content: string }) => {
                if (message.type === "mia") {
                    const contentMsg: string[] = splitSentences(message.content);
                    contentMsg.forEach((msg: string) => {
                        history.push({ text: msg, isReply: true });
                    });
                } else {
                    history.push({ text: message.content, isReply: false });
                }
            });

            // Prepend older messages to the beginning
            setMessages(prev => [...history, ...prev]);
            setCurrentPage(nextPage);
            setHasMoreMessages(nextPage < data.pagination.pages);
        } catch (err) {
            console.error('Failed to load more messages:', err);
        } finally {
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        // Set MIA as the default and only AI companion
        setBotName('MIA');
    }, []);

    // Append new socket messages to existing history
    useEffect(() => {
        console.log('AIChat: useEffect for socketMessages triggered. Count:', socketMessages?.length, 'Processed:', processedSocketMessageCount.current);

        if (socketMessages && Array.isArray(socketMessages) && socketMessages.length > processedSocketMessageCount.current) {
            console.log('AIChat: Processing new socket messages');

            // Process only the new messages we haven't seen yet
            const newSocketMessages = socketMessages.slice(processedSocketMessageCount.current);

            newSocketMessages.forEach(socketMessage => {
                if (socketMessage.type === 'mia') {
                    const contentMsg: string[] = splitSentences(socketMessage.content);
                    const newMessages = contentMsg.map((msg: string) => ({
                        text: msg,
                        isReply: true
                    }));
                    setMessages(prev => [...prev, ...newMessages]);
                } else {
                    setMessages(prev => [...prev, {
                        text: socketMessage.content,
                        isReply: false
                    }]);
                }
            });

            // Update the count of processed messages
            processedSocketMessageCount.current = socketMessages.length;
        }
    }, [socketMessages]);

    useEffect(() => {
        const chatBoxContainer = document.getElementById("chat-box-container");
        chatBoxContainer?.scrollTo({
            top: chatBoxContainer.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isMiaTyping]);

    
    // Redirect to auth if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            console.log('User not authenticated, redirecting to auth page');
            router.push('/auth');
            return;
        }
    }, [user, authLoading, router]);

    // Load chat messages when authenticated (skip for 'new' sessions)
    useEffect(() => {
        if (!authLoading && user && sessionId && sessionId !== 'new') {
            // Reset socket message tracking when loading a new session
            processedSocketMessageCount.current = 0;

            getChatMessages(sessionId, 1, null)
            .then((data: { messages: { type: string; content: string }[]; pagination: { pages: number; page: number } }) => {
                const history: { text: string; isReply: boolean }[] = [];
                data.messages.forEach((message) => {
                    if (message.type === "mia") {
                        const contentMsg: string[] = splitSentences(
                            message.content
                        );
                        contentMsg.forEach((msg: string) => {
                            history.push({ text: msg, isReply: true });
                        });
                    } else {
                        history.push({ text: message.content, isReply: false });
                    }
                });
                setMessages(history);
                setCurrentPage(1);
                setTotalPages(data.pagination.pages);
                setHasMoreMessages(data.pagination.pages > 1);
            })
            .catch((err: any) => {
                if (err.response?.status === 401) {
                    console.log('Token expired or invalid, redirecting to auth');
                    router.push('/auth');
                } else {
                    console.error('Failed to load chat messages:', err);
                    setMessages([]);
                }
            });
        }
    }, [sessionId, user, authLoading, router]);

    // Show loading while checking authentication
    if (authLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    // Don't render if user is not authenticated (will redirect)
    if (!user) {
        return null;
    }

    // Log errors but don't block UI rendering
    if (socketError) {
        console.error('Socket error (UI still functional):', socketError);
    }
    if (botError) {
        console.error('Bot error (UI still functional):', botError);
    }
    if (!socketContext) {
        console.warn('Socket context not available (UI still functional)');
    }
    
    return (
        <div className="flex flex-col h-full w-full ">
            <div
            className="bg-transparent w-full relative overflow-y-auto max-h-[82vh] md:max-h-[90vh] flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            id="chat-box-container"
            >
                <style jsx>{`
                    ::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                <div className="sticky top-3 z-10">
                    <Header
                        botId={botId || "defaultBotId"}
                        botName={botName}
                        avatarOnClick={handleCloseModal}
                        // showSettings={showSettings}
                        showSettings={true}
                    />
                </div>
                {hasMoreMessages && (
                    <div className="flex justify-center py-4">
                        <button
                            onClick={loadMoreMessages}
                            disabled={isLoadingMore}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoadingMore ? 'Loading...' : 'Load Older Messages'}
                        </button>
                    </div>
                )}
                <ChatBox
                    messages={messages}
                    isTyping={isMiaTyping}
                />
            </div>
            <div className="bg-background w-full pb-2 px-[10px] md:px-0">
                <ChatInput
                    onSend={(message) => {
                        handleSendMessage(message);
                    }}
                />
            </div>
            {isModalOpen && (
                <Picture img={pfp.src} handleCloseModal={handleCloseModal} />
            )}
        </div>
    );
};

export default AIChat;
