import React from 'react';
import { getProductById } from '@/app/lib/api';
import BuyForm from '@/app/ui/buy/buy-form';
import { getDefaultAddress } from '@/app/lib/actions';

export default async function BuyPage({
  params,
  searchParams,
}: {
  params: { productId: number };
  searchParams: { size?: string };
}) {
  const { productId } = params;
  const product = await getProductById(productId);
  const defaultAddress = await getDefaultAddress();

  if (!product) return <div>오류 발생</div>;

  return (
    <div className="flex h-full flex-col items-center bg-[#f4f4f4] pt-10">
      <BuyForm product={product} size={searchParams?.size || null} defaultAddress={defaultAddress} />

      {/* <div className="mt-2 w-[700px] bg-white px-6 py-6">
        <div className="flex justify-between pb-3">
          <h3 className="text-lg font-semibold leading-5">배송 주소</h3>
          <button className="flex items-center text-zinc-400">
            <PlusIcon className="h-3 w-3" />
            <span className="text-xs">새 주소 추가</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <div className="w-20 text-xs text-zinc-400">받는 분</div>
              <div className="text-sm">박**</div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="w-20 text-xs text-zinc-400">연락처</div>
              <div className="text-sm">010-8***-*619</div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="w-20 text-xs text-zinc-400">배송 주소</div>
              <div className="text-sm">경기 군포시 고산로677번길 12 동백(우성)아파트 1309동 1702호</div>
            </div>
          </div>
          <button className="rounded-lg border px-3 py-2 text-xs">변경</button>
        </div>
      </div>

      <div className="mt-2 w-[700px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-5">결제 방법</h3>
        <h4 className="pb-3 pt-4 text-[15px]">일반 결제</h4>
      </div> */}
    </div>
  );
}
