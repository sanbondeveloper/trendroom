'use client';

import React, { useOptimistic } from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookMarkFillIcon } from '@heroicons/react/24/solid';
import { interest } from '../lib/actions';
import { IProduct } from '../lib/definitions';

export default function FavoritesBtn({ active, product }: { active: boolean; product: IProduct }) {
  const [optimisticIsActive, setOptimisticIsActive] = useOptimistic(active, (state) => !state);

  return (
    <form
      action={async () => {
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
