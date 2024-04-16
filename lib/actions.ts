'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authenticate({ email, password }: { email: string; password: string }) {
  const cookieStore = cookies();
  const maxAge = 30 * 24 * 60 * 60 * 1000;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const json = (await response.json()) as { message: string };

    if (response.status === 401) throw new Error(json.message);

    response.headers.getSetCookie().forEach((items) => {
      const [key, str] = items.split('=');
      const [value] = str.split('; ');
      cookieStore.set(key, value, { httpOnly: true, secure: false, maxAge: maxAge });
    });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }

    throw error;
  }

  redirect('/');
}

export async function signOut() {
  const cookieStore = cookies();
  const session = cookieStore.get('connect.sid')?.value;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/logout`, {
      method: 'GET',
      headers: {
        Cookie: `connect.sid=${session}`,
        credentials: 'include',
      },
    });

    if (response.status !== 204) throw new Error('로그아웃 실패');

    cookieStore.delete('connect.sid');
  } catch (error) {
    throw error;
  }
}
