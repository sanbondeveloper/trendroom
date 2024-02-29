import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookMarkFillIcon } from '@heroicons/react/24/solid';
import { IProduct } from '../lib/definitions';
import { checkSession, interest } from '../lib/actions';

export default function FavoritesBtn({
  active,
  product,
  setOptimisticInterests,
  setOptimisticProducts = null,
}: {
  active: boolean;
  product: IProduct;
  setOptimisticInterests: (product: IProduct) => void;
  setOptimisticProducts?: ((id: number) => void) | null;
}) {
  return (
    <form
      action={async () => {
        await checkSession();
        setOptimisticProducts?.(product.id);
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
