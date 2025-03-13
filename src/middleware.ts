import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile', '/home']
const authPaths = ['/register', '/login', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionToken = cookieHeader
    .split("; ")
    .find((row) => row.startsWith("sessionToken="))
    ?.split("=")[1];


  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/home', '/profile/:path*', '/login', '/register']
}