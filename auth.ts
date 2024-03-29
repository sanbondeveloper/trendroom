import type { IUser } from '@/app/lib/definitions';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

async function getUserFromLogin({ email, password }: { email: string; password: string }): Promise<IUser | null> {
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return null;

    const user = await response.json();

    return { ...user };
  } catch (error) {
    console.error('로그인 실패:', error);

    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string() }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserFromLogin({ email, password });

          if (!user) return null;

          return user;
        }

        return null;
      },
    }),
  ],
});
