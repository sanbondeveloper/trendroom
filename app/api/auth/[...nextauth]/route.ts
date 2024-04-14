import { type NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest, { params }: { params: { nextauth: string[] } }) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const provider = params.nextauth[1];
  const cookieStore = cookies();
  const maxAge = 30 * 24 * 60 * 60 * 1000;

  if (!provider) return;

  const response = await fetch(`${process.env.SERVER_URL}/api/auth/${provider}`, {
    method: 'POST',
    body: JSON.stringify({ code, state }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status !== 200) throw new Error(`${provider} 로그인 실패`);

  response.headers.getSetCookie().forEach((items) => {
    const [key, str] = items.split('=');
    const [value] = str.split('; ');
    cookieStore.set(key, value, { httpOnly: true, secure: false, maxAge: maxAge });
  });

  redirect('/');
}
