import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getInterests } from '@/app/lib/api';
import Interest from '@/app/ui/interest/interest';

export default async function InterestPage() {
  const cookieStore = cookies();
  const session = cookieStore.get('connect.sid')?.value;

  if (!session) return redirect('/login');

  const interests = (await getInterests()) || [];
  return <Interest interests={interests} />;
}
