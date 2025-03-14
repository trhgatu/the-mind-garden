import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/profile']
const authPaths = ['/register', '/login', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value

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
  matcher: [...privatePaths, ...authPaths]
}