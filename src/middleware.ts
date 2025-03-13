import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile', '/home']
const authPaths = ['/register', '/login', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value ?? null;

  console.log("Middleware Path:", pathname);
  console.log("Middleware sessionToken:", sessionToken);

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
  }

  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/home', request.url), { status: 307 })
  }
  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/home', '/profile/:path*', '/login', '/register']
}