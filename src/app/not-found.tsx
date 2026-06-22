import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
            <h2>404 | Page Not Found</h2>
            <Link href="/" className="hover:text-primary">
                Return
            </Link>
        </div>
    );
};

export default NotFound;
