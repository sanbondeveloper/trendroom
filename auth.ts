import type { User } from '@/app/lib/definitions';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import KaKaoProvider from 'next-auth/providers/kakao';
import { authConfig } from './auth.config';
import { z } from 'zod';

async function getUser(input: { email: string; password: string }): Promise<User | undefined> {
  try {
    const response = await fetch('https://port-0-trendroom-backend-2aat2cluqqq264.sel5.cloudtype.app/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: input.email, password: input.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const user = await response.json();

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
  ],
});
