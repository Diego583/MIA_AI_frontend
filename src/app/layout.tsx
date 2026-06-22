import type { Metadata } from "next";
import "./globals.css";
import Page from "@/components/Page";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";

export const metadata: Metadata = {
    title: "MIA AI - Your Personal AI Chat Companion",
    description: "Chat with MIA, your confident and charming AI influencer companion",
    keywords: "AI chat, virtual companion, AI assistant, MIA AI",
    authors: [{ name: "MIA AI Team" }],
    openGraph: {
        title: "MIA AI - Your Personal AI Chat Companion",
        description: "Chat with MIA, your confident and charming AI influencer companion",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon/favicon.ico" />
                <meta
                    name="google-site-verification"
                    content="lIbbeLoztd0RKDEwOMAOscSz-mgX8mriWOzLQcn1_MQ"
                />
            </head>
            <body className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
                <AuthProvider>
                    <SocketProvider>
                        <SidebarProvider>
                            <div className="flex min-h-screen w-screen">
                                <AppSidebar />
                                <SidebarTrigger />
                                <Page>{children}</Page>
                            </div>
                            <Toaster />
                        </SidebarProvider>
                    </SocketProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
