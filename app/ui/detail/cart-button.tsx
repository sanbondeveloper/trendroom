import React from 'react';
import { IProduct } from '@/app/lib/definitions';
import { useRecoilState } from 'recoil';
import { cartState } from '@/app/atoms/cartState';

interface ICartButtonProps {
  product: IProduct;
  size: string;
}
export default function CartButton({ product, size }: ICartButtonProps) {
  const [cart, setCart] = useRecoilState(cartState);

  const handleCardAdd = () => {
    const isExist = cart.some((item) => item.product.id === product.id && item.size === size);
    if (isExist) return;

    setCart((prevState) => {
      return [...prevState, { product, size, quantity: 1 }];
    });
  };

  return (
    <button
      disabled={size === ''}
      onClick={handleCardAdd}
      className="rounded-md bg-[#ef6253] px-3 py-3 font-bold text-white disabled:bg-gray-300"
    >
      장바구니에 담기
    </button>
  );
}