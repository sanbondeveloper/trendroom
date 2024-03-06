import React from 'react';
import { getProductById } from '@/app/lib/api';
import BuyForm from '@/app/ui/buy/buy-form';
import { getDefaultAddress } from '@/app/lib/actions';

export default async function BuyPage({
  params,
  searchParams,
}: {
  params: { productId: number };
  searchParams: { size: string };
}) {
  const { productId } = params;
  const product = await getProductById(productId);
  const defaultAddress = await getDefaultAddress();

  if (!product) return <div>오류 발생</div>;

  return (
    <div className="flex h-fit flex-col items-center bg-[#f4f4f4] pt-10">
      <BuyForm product={product} size={searchParams.size} defaultAddress={defaultAddress} />
    </div>
  );
}
