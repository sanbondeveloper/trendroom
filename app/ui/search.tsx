'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IProduct } from '../lib/definitions';
import SearchModal from './search-modal';
export default function Search({ products }: { products: IProduct[] | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!products) return <div>에러 발생</div>;

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <MagnifyingGlassIcon className="w-7" />
      </button>

      <SearchModal open={isModalOpen} products={products} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
