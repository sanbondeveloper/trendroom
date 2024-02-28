'use client';

import React, { useOptimistic } from 'react';
import { IProduct } from '@/app/lib/definitions';
import ProductsList from '../products-list';

export default function Interest({ interests }: { interests: IProduct[] }) {
  const [optimisticInterests, setOptimisticInterests] = useOptimistic(interests, (state, id) =>
    state.filter((interest) => interest.id !== id),
  );

  return (
    <ProductsList
      products={optimisticInterests}
      interests={optimisticInterests}
      setOptimisticProducts={setOptimisticInterests}
    />
  );
}
