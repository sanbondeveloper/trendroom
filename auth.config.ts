import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      const isOnRegisterPage = nextUrl.pathname.startsWith('/register');

      // if(nextUrl.searchParams.get('back')) return Response.;

      if ((isOnLoginPage || isOnRegisterPage) && isLoggedIn) return Response.redirect(new URL('/', nextUrl));
      if (isOnRegisterPage && !isLoggedIn) return true;

      return true;
    },
    // 로그인 등으로 인해 JWT가 생성되었거나 업데이트 되었을 때 실행
    // 반환값은 암호화되어 쿠키에 저장된다.
    // token: email, name, image만 포함, user: 로그인 반환값
    async jwt({ token, user }) {
      return { ...token, ...user }; // session callback의 token이 된다.
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string; // 타입 확징이 필요!
      session.user.id = token.id as string;
      session.user.name = token.nickname as string;

      return session;
    },
  },
  providers: [],
  session: {
    maxAge: 60 * 60 * 24,
  },
} satisfies NextAuthConfig;
