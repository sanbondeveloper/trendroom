import React from 'react';
import { useRouter } from 'next/navigation';

export default function BuyBtn({ size, productId }: { size: string; productId: number }) {
  const { push } = useRouter();

  return (
    <button
      disabled={size === ''}
      onClick={() => {
        push(`/buy/${productId}?size=${size}`);
      }}
      className="flex-grow rounded-md bg-black font-bold text-white disabled:bg-gray-300"
    >
      구매하기
    </button>
  );
}
