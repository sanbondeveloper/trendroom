'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Product, ProductCategories } from '@/types/product';

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

export async function checkReferrerCode(code: string) {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/referrer/${code}`, {
      method: 'GET',
    });

    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    throw error;
  }
}

export async function getProducts(category?: ProductCategories): Promise<Product[]> {
  const url = !category
    ? 'https://fakestoreapi.com/products'
    : `https://fakestoreapi.com/products/category/${category}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await response.json();

  return products;
}

export async function getInterests(): Promise<number[]> {
  const response = await fetch(`${process.env.SERVER_URL}/api/user/interests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { interests } = await response.json();

  return interests;
}
