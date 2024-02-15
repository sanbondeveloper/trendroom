'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUp({ email, nickname, password }: { email: string; nickname: string; password: string }) {
  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      body: JSON.stringify({ email, nickname, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return null;

    const user = await response.json();

    return user;
  } catch (error) {
    console.error('회원가입 실패', error);
  }
}
