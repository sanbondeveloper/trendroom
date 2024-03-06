'use server';

import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { IProduct, TAddress } from './definitions';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function signUp({
  email,
  nickname,
  password,
}: {
  email: string;
  nickname: string;
  password: string;
}): Promise<{ message: string } | null> {
  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      body: JSON.stringify({ email, nickname, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201 && response.status !== 409) return null;

    const message = await response.json();

    return message;
  } catch (error) {
    console.error('회원가입 실패', error);

    return null;
  }
}

export async function interest(product: IProduct) {
  try {
    const session = await auth();

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

export async function getDefaultAddress(): Promise<TAddress | null> {
  try {
    const session = await auth();

    const response = await fetch('http://localhost:3001/address', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      next: { tags: ['defaultAddress'] },
    });

    if (!response.ok) {
      throw new Error('사용자 기본주소 조회 실패');
    }

    const address = await response.json();

    return address;
  } catch (error) {
    console.error('Error fetching data:', error);

    return null;
  }
}

export async function getAddressList() {
  try {
    const session = await auth();

    const response = await fetch('http://localhost:3001/addresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) return null;

    const addressList = await response.json();

    return addressList;
  } catch (error) {
    console.error('주소리스트조회 실패', error);
  }
}

export async function addAddress(address: TAddress) {
  try {
    const session = await auth();

    const response = await fetch('http://localhost:3001/address', {
      method: 'POST',
      body: JSON.stringify({ address }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('새 주소 추가 실패');
    }

    const newAddress = await response.json();

    revalidateTag('defaultAddress');
    return newAddress;
  } catch (error) {
    console.error('Error fetching data:', error);

    return null;
  }
}

export async function changeDefaultAddress(addressId: string) {
  try {
    const session = await auth();

    const response = await fetch('http://localhost:3001/address', {
      method: 'PATCH',
      body: JSON.stringify({ addressId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('사용자 기본 주소 변경 실패');
    }

    const address = await response.json();

    // revalidateTag('defaultAddress');
    return address;
  } catch (error) {
    console.error('Error fetching data:', error);

    return null;
  }
}

export async function checkSession() {
  const session = await auth();

  if (session) return;

  redirect('/login');
}
