'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IProduct } from '../lib/definitions';
import Modal from './common/modal';
import SearchForm from './search-form';
export default function SearchModal({ products }: { products: IProduct[] | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (!products) return <div>에러 발생</div>;

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <MagnifyingGlassIcon className="w-7" />
      </button>

      <Modal open={isModalOpen} onClose={handleClose} full={true}>
        <SearchForm products={products} onClose={handleClose} />
      </Modal>
    </>
  );
}
