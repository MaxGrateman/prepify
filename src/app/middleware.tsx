import {NextRequest, NextResponse} from "next/server";

const protectedRoutes = ['/profile']

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile'],
};