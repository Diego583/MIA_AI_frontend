import React, { useState } from "react";
import { PiPaperPlaneTiltFill } from "react-icons/pi";


type ChatInputProps = {
    onSend: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendClick = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <div
            className={`flex items-center h-fit w-full max-w-3xl mx-auto rounded-full border border-${
                isTyping ? "primary" : "text/30"
            } p-2`}
        >
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder="Write a message..."
                className="flex-grow text-text/30 rounded-full bg-transparent px-2 focus:outline-none"
            />
            <button
                onClick={handleSendClick}
                className="flex items-center bg-gradient-primary p-2 md:p-3 text-text-foreground rounded-full hover:bg-primary focus:outline-none"
                aria-label="Send message"
            >
                <div className="h-4 w-4 md:h-5 md:w-5">
                    <PiPaperPlaneTiltFill className="w-full h-full" />
                </div>
            </button>
        </div>
    );
};

export default ChatInput;
