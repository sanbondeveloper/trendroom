import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      if (!profile) return true;

      if (account?.provider !== 'kakao') return true;

      const response = await fetch(`${process.env.SERVER_URL}/api/auth/login/kakao`, {
        method: 'POST',
        body: JSON.stringify({
          email: user.email || null,
          nick: user.name,
          snsId: profile.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return false;

      const data = await response.json();
      const cookieStore = cookies();

      cookieStore.set('accessToken', data.token);

      return true;
    },
    authorized({ auth, request: { nextUrl } }) {
      const cookieStore = cookies();

      console.log(cookieStore);

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
