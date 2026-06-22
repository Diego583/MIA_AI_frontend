"use client";
import { useState } from "react";
import Link from "next/link";
import { 
    PiChatCircle,
    PiMagicWand,
    PiList,
    PiX,
} from "react-icons/pi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
        style={{
            backgroundColor: "#ffffffa3", 
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
        }}
        className="
        fixed
        top-2
        left-1/2
        z-50
        w-4/5
        -translate-x-1/2
        rounded-[17px]
        px-4
        py-2
        shadow-md
        flex
        flex-col
        ">
            {/* Top row: Logo & Desktop Menu & Hamburger */}
            <div className="flex items-center justify-between">
                {/* Logo */}
                <img
                // src="/img/logo.png" 
                // alt="Mia AI Logo" 
                className="h-[40px] object-cover"
                />

                {/* Desktop Nav Items (hidden on mobile) */}
                <div className="hidden md:flex md:gap-4">
                    {/* <Link 
                    href="/chats/settings"
                    className="
                        flex
                        items-center
                        gap-1
                        px-3
                        py-2
                        text-[var(--primary)]
                        no-underline
                        hover:underline
                        transition-all
                        duration-300
                    "
                    >
                        <PiMagicWand />
                        <span>Create girl</span>
                    </Link> */}

                    {/* <Link 
                    href="/chats"
                    className="
                        flex
                        items-center
                        gap-1
                        px-3
                        py-2
                        text-[var(--primary)]
                        no-underline
                        hover:underline
                        transition-all
                        duration-300
                    "
                    >
                        <PiChatCircle />
                        <span>Chats</span>
                    </Link> */}

                    <Link 
                    href="/auth"
                    className="
                        flex
                        items-center
                        gap-1
                        px-3
                        py-2
                        border
                        border-[var(--primary)]
                        rounded-lg
                        text-[var(--primary)]
                        no-underline
                        hover:underline
                        transition-all
                        duration-300
                    "
                    >
                        Log in
                    </Link>
                </div>

                
                {/* Hamburger (shown on mobile) — toggles to PiX when menu is open */}
                <button 
                className="text-[var(--primary)] block md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <PiX className="h-6 w-6" />
                    ) : (
                        <PiList className="h-6 w-6" />
                    )}
                </button>
            </div>

            
            {/* Mobile Nav Items (collapsible) */}
            <div
            className={`
                mt-2
                flex
                flex-col
                gap-4
                md:hidden
                overflow-hidden
                transition-[max-height]
                duration-300
                ${isOpen ? "max-h-64" : "max-h-0"}
            `}
            >
            {/* <Link 
                href="/chats/settings"
                className="
                flex
                items-center
                gap-1
                px-3
                py-2
                text-[var(--primary)]
                no-underline
                "
                onClick={() => setIsOpen(false)}
            >
                <PiMagicWand />
                <span>Create girl</span>
            </Link>

            <Link 
                href="/chats"
                className="
                flex
                items-center
                gap-1
                px-3
                py-2
                text-[var(--primary)]
                no-underline
                "
                onClick={() => setIsOpen(false)}
            >
                <PiChatCircle />
                <span>Chats</span>
            </Link> */}

            <Link 
                href="/auth"
                className="
                flex
                items-center
                justify-center
                gap-1
                px-3
                py-2
                border
                border-[var(--primary)]
                rounded-lg
                text-[var(--primary)]
                no-underline
                "
                onClick={() => setIsOpen(false)}
            >
                Log in
            </Link>
            </div>
        </nav>
    );
};

export default Navbar;