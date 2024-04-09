import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn({ user, profile }) {
      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      return true;
    },
    // 로그인 등으로 인해 JWT가 생성되었거나 업데이트 되었을 때 실행
    // 반환값은 암호화되어 쿠키에 저장된다.
    // token: email, name, image만 포함, user: 로그인 반환값
    async jwt({ token, user, account }) {
      return { ...token, ...user }; // session callback의 token이 된다.
    },
    async session({ session, token }) {
      session.accessToken = token.token as string; // 타입 확징이 필요!
      session.user.id = token.id as string;
      session.user.name = token.nickname as string;

      return session;
    },
  },
  providers: [],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;
