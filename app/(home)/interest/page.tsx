import React from 'react';
import { getInterests } from '@/app/lib/api';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Interest from '@/app/ui/interest/interest';

export default async function InterestPage() {
  const session = await auth();

  if (!session) return redirect('/login');

  const interests = (await getInterests()) || [];
  return <Interest interests={interests} />;
}
