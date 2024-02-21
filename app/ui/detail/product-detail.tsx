'use client';

import React, { useState } from 'react';
import { dollarToWon } from '@/app/lib/util';
import SizesModal from '@/app/ui/detail/sizes-modal';
import Image from 'next/image';
import { IProduct } from '@/app/lib/definitions';

export default function ProductDetail({ product }: { product: IProduct }) {
  const [size, setSize] = useState('');

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
  };

  return (
    <div className="top-1/2 mx-auto mt-4 max-w-5xl translate-y-1/2">
      <div className="flex items-center">
        <div className="relative h-72 w-72 flex-1">
          <Image fill src={product.image} alt={product.title} sizes="288px" className="object-contain" />
        </div>
        <div className="flex-1">
          <div className="mb-3">
            <div className="text-sm">구매가</div>
            <div className="text-2xl font-bold">{dollarToWon(product.price).toLocaleString()}</div>
          </div>
          <div className="mb-4 text-lg">{product.title}</div>
          <SizesModal size={size} onSizeChange={handleSizeChange} />
          <div className="mb-5 flex flex-col">
            <button className="rounded-md bg-[#ef6253] px-3 py-3 font-bold text-white">장바구니에 담기</button>
            <button className="border-1 mt-2 rounded-md border-[#ccc] px-3 py-3">관심상품 72</button>
          </div>
          <div>{product.description}</div>
        </div>
      </div>
    </div>
  );
}
