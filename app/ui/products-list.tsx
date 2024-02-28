'use client';

import { useOptimistic } from 'react';
import { IProduct } from '../lib/definitions';
import ProductItem from './product-item';

export default function ProductsList({ products, interests }: { products: IProduct[]; interests: IProduct[] }) {
  const [optimisticInterests, setOptimisticInterests] = useOptimistic(interests, (state, product: IProduct) => {
    const interest = state.find((interest) => interest.id === product.id);

    if (interest) {
      return state.filter((interest) => interest.id !== product.id);
    }

    return [...state, product];
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            interests={optimisticInterests}
            setOptimisticInterests={setOptimisticInterests}
          />
        ))}
      </ul>
    </div>
  );
}
