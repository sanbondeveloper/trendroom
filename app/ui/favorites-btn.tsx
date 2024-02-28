'use client';

import React, { useOptimistic } from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookMarkFillIcon } from '@heroicons/react/24/solid';
import { interest } from '../lib/actions';
import { IProduct } from '../lib/definitions';
import { auth } from '@/auth';
import { useRouter } from 'next/navigation';

export default function FavoritesBtn({
  active,
  product,
  session,
}: {
  active: boolean;
  product: IProduct;
  session: any;
}) {
  const [optimisticIsActive, setOptimisticIsActive] = useOptimistic(active, (state) => !state);
  const { push } = useRouter();

  return (
    <form
      action={async () => {
        if (!session) return push('/login?back=true');

        setOptimisticIsActive('');
        await interest(product);
      }}
    >
      <button className="absolute bottom-28 right-2 h-7 w-8 cursor-pointer">
        {!optimisticIsActive ? <BookmarkIcon /> : <BookMarkFillIcon />}
      </button>
    </form>
  );
}
