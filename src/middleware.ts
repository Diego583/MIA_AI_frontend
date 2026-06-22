import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const hasSession = !!req.cookies.get('refreshToken')?.value;

    const protectedPaths = ['/chats', '/account', '/billing'];
    const isProtectedPath = protectedPaths.some(path =>
        req.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath && !hasSession) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/chats/:path*", "/support", "/account/:path*", "/billing/:path*", "/auth"],
};