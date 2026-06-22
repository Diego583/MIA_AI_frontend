"use client";

import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
} from "./ui/sidebar";
import { 
    PiChatsCircleFill,
    PiQuestionFill,
    PiUserCircleFill,
    PiSignOut,
} from "react-icons/pi";
import { usePathname } from "next/navigation";
import { protectedRoutes } from "@/constants/routes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const navItems = [
    {
        title: "Chat",
        href: "/chats",
        Icon: PiChatsCircleFill,
    },
    // {
    //     title: "Support",
    //     href: "/support",
    //     Icon: PiQuestionFill,
    // },
    {
        title: "Profile",
        href: "/account",
        Icon: PiUserCircleFill,
    },
];

const AppSidebar = () => {
    const pathName = usePathname();
    const isActive = (href: string) => pathName.startsWith(href);

    if (
        !protectedRoutes.includes(pathName) 
        &&
        !pathName.startsWith("/chats/")
    ) {
        return null;
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarMenu className="flex items-center space-y-2 p-4">
                    {navItems.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <Tooltip>
                                <TooltipTrigger className="flex">
                                    <Link
                                        href={item.href}
                                        className={`${
                                            isActive(item.href)
                                                ? "bg-primary text-text-foreground"
                                                : ""
                                        } p-2 md:p-4 rounded-full hover:bg-primary hover:text-text-foreground`}
                                    >
                                        <item.Icon className="w-6 h-6" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.title}</p>
                                </TooltipContent>
                            </Tooltip>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu className="flex items-center space-y-2">
                    <SidebarMenuItem>
                        <Tooltip>
                            <TooltipTrigger className="flex">
                                <Link
                                    href="/auth/logout"
                                    className="rounded-full hover:bg-primary hover:text-text-foreground"
                                >
                                    <PiSignOut className="w-6 h-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
