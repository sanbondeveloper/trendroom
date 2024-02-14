import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      console.log(auth);

      if (isOnLoginPage && isLoggedIn) return Response.redirect(new URL('/', nextUrl));

      return isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
