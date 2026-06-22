"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Page = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();

    return (
        <main className={`h-full w-full ${pathName == "/" ? "" : "mr-6"}`}>
            {children}
        </main>
    );
};

export default Page;
