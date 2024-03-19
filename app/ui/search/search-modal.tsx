'use client';

import { useState } from 'react';
import { IProduct } from '../../lib/definitions';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Modal from '../common/modal';
import Search from './search';
export default function SearchModal({ products }: { products: IProduct[] | null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (!products) return <div>에러 발생</div>;

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <MagnifyingGlassIcon className="w-9" />
      </button>

      <Modal open={isModalOpen} onClose={handleClose} full={true}>
        <Search products={products} onClose={handleClose} />
      </Modal>
    </>
  );
}
