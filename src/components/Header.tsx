import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiSliders } from "react-icons/pi";
import pfp from "../../public/img/pfp.png";

const Header = ({
    botId,
    botName,
    avatarOnClick,
    showSettings=true,
}: {
    botId: string;
    botName: string;
    avatarOnClick: () => void;
    showSettings?: boolean;
}) => {
    return (
        <div
            className="
        flex justify-between items-center h-fit px-4 py-2
        w-full
        backdrop-filter 
        backdrop-blur-lg 
        bg-[rgba(255, 255, 255, 0.9)]
        backdrop-blur-md
        md:max-w-3xl
        md:mx-auto 
        md:rounded-[20px] 
        md:shadow-md    
        "
        >
            <div className="flex items-center gap-2">
                <Avatar
                    className="h-10 w-10 md:h-12 md:w-12 hover:scale-105 transform transition duration-300 cursor-pointer"
                    onClick={avatarOnClick}
                >
                    <AvatarImage src={pfp.src} />
                    <AvatarFallback>WF</AvatarFallback>
                </Avatar>
                <h4 className="font-bold text-[1.2rem] text-gray-700">{botName}</h4>
            </div>
            {showSettings ? (
                <a
                    href={`/chats/${botId}`}
                    className="h-6 w-6 md:h-8 md:w-8 hover:text-primary text-gray-700"
                    title="Waifu Settings"
                >
                    <PiSliders className="w-full h-full" />
                </a>
            ): (
                <div/>
            )}
        </div>
    );
};

export default Header;
