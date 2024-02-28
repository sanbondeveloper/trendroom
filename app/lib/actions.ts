'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { IProduct } from './definitions';
import { revalidateTag } from 'next/cache';

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

    return null;
  }
}

export async function interest(product: IProduct) {
  const session = await auth();

  try {
    const response = await fetch('http://localhost:3001/interest', {
      method: 'POST',
      body: JSON.stringify({ userId: session?.user?.id, product }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) return null;

    revalidateTag('interest');
    return true;
  } catch (error) {
    console.error('관심상품등록 실패', error);
  }
}
