// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// export default NextAuth(authConfig).auth;

export default function middleware(request: NextRequest) {
  const cookieStore = cookies();

  if (cookieStore.get('connect.sid')?.value) {
    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/join')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
