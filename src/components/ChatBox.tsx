import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MdThumbDown, MdThumbUp } from "react-icons/md";
import TypingIndicator from "./ui/typing-indicator";
import pfp from "../../public/img/pfp.png";

const ChatBoxContainer =
    "flex flex-col justify-end w-full max-w-4xl mx-auto p-4 space-y-2.5";

const MessageContainer: React.FC<{
    isReply: boolean;
    isLastMessage: boolean;
    rate?: boolean;
    children: React.ReactNode;
}> = ({ isReply, isLastMessage, rate = true, children }) => (
    <div
        className={`flex items-start ${isReply ? "" : "flex-row-reverse"} ${
            isReply && isLastMessage ? "relative" : ""
        }`}
    >
        {isReply && isLastMessage && (
            <div className="absolute -bottom-4 left-0">
                <Avatar>
                    <AvatarImage src={pfp.src} />
                    <AvatarFallback>WF</AvatarFallback>
                </Avatar>
            </div>
        )}
        {children}
        {/* {isReply && isLastMessage && rate && (
            <div className="bg-secondary px-3 py-1 absolute -bottom-8 left-12 flex gap-4 rounded-xl opacity-20 hover:opacity-80">
                <button title="Good response">
                    <MdThumbUp className="text-text hover:text-text-foreground" />
                </button>
                <button title="Bad response">
                    <MdThumbDown className="text-text hover:text-text-foreground" />
                </button>
            </div>
        )} */}
    </div>
);

const MessageBubble: React.FC<{
    isLastMessage?: boolean;
    children: React.ReactNode;
}> = ({ isLastMessage, children }) => (
    <div
        className={`max-w-[60%] py-3 px-4 
            ${isLastMessage ? "rounded-tr-3xl rounded-s-3xl" : "rounded-3xl"}
            bg-secondary text-text-primary`}
    >
        {children}
    </div>
);

const ReplyMessageBubble: React.FC<{
    isLastMessage?: boolean;
    children: React.ReactNode;
}> = ({ isLastMessage, children }) => (
    <div
        className={`max-w-[60%] py-3 px-6 
            ${isLastMessage ? "rounded-tl-3xl rounded-e-3xl" : "rounded-3xl"} 
            bg-gradient-primary text-text-foreground ml-12
            `}
    >
        {children}
    </div>
);

interface ChatBoxProps {
    messages: { text: string; isReply: boolean }[];
    isTyping: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({
    messages,
    isTyping,
}) => {
    return (
        <div className={ChatBoxContainer} style={{ marginTop: 15 }}>
            {messages.map((message, index) => {
                const isLastMessage =
                    index === messages.length - 1 ||
                    messages[index + 1].isReply !== message.isReply;
                return (
                    <MessageContainer
                        key={index}
                        isReply={message.isReply}
                        isLastMessage={isLastMessage}
                    >
                        {message.isReply ? (
                            <ReplyMessageBubble isLastMessage={isLastMessage}>
                                {message.text}
                            </ReplyMessageBubble>
                        ) : (
                            <MessageBubble isLastMessage={isLastMessage}>
                                {message.text}
                            </MessageBubble>
                        )}
                    </MessageContainer>
                );
            })}
            {isTyping && (
                <MessageContainer
                    isReply={true}
                    isLastMessage={true}
                    rate={false}
                >
                    <ReplyMessageBubble isLastMessage={true}>
                        <TypingIndicator />
                    </ReplyMessageBubble>
                </MessageContainer>
            )}
        </div>
    );
};

export default ChatBox;
