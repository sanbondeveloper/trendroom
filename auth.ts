import type { User } from '@/app/lib/definitions';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import KaKaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { z } from 'zod';

import { authConfig } from './auth.config';

async function getUser(input: { email: string; password: string }): Promise<User | undefined> {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email: input.email, password: input.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const user = await response.json();
    const cookieStore = cookies();

    console.log('user', user);

    cookieStore.set('accessToken', user.token);

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);

    throw new Error('Failed to fetch user');
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string() }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser({ email, password });

          if (!user) return null;
          if (user?.code === 401) return null;

          // 반환된 객체가 JWT으로
          return user;
        }

        return null;
      },
    }),
    KaKaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    // https://github.com/nextauthjs/next-auth/discussions/9313
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
  ],
});
