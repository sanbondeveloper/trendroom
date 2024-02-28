import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookMarkFillIcon } from '@heroicons/react/24/solid';
import { IProduct } from '../lib/definitions';
import { interest } from '../lib/actions';

export default function FavoritesBtn({
  active,
  product,
  setOptimisticInterests,
}: {
  active: boolean;
  product: IProduct;
  setOptimisticInterests: (product: IProduct) => void;
}) {
  return (
    <form
      action={async () => {
        setOptimisticInterests(product);
        await interest(product);
      }}
    >
      <button className="absolute bottom-28 right-2 h-7 w-8 cursor-pointer">
        {!active ? <BookmarkIcon /> : <BookMarkFillIcon />}
      </button>
    </form>
  );
}
