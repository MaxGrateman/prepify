import {NextRequest, NextResponse} from "next/server";

const publicRoutes = ['/login', '/register']
const protectedRoutes = ['/profile']

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/login', '/register', '/questions/:path*'],
};