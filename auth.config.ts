import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // async signIn () {},
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth?.user);
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      const isOnRegisterPage = nextUrl.pathname.startsWith('/register');

      if ((isOnLoginPage || isOnRegisterPage) && isLoggedIn) return Response.redirect(new URL('/', nextUrl));
      if (isOnRegisterPage && !isLoggedIn) return true;

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;
      }
      return token;
    },
    async session({ session, token }) {
      // session.sessionToken = token.accessToken as string;
      session.user.id = token.id as string;

      return session;
    },
  },
  providers: [],
  session: {
    maxAge: 60 * 60 * 24,
  },
} satisfies NextAuthConfig;
