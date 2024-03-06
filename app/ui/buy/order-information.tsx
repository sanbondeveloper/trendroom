import React from 'react';

export default function OrderInformation({ price }: { price: string }) {
  return (
    <>
      <div className="box-white mt-2">
        <h3 className="mb-2 text-lg font-semibold leading-5 ">최종 주문정보</h3>
        <ul>
          <li className="flex justify-between text-sm">
            <div>구매가</div>
            <span>{price}원</span>
          </li>
          <li className="mt-2 flex justify-between text-sm">
            <div>배송비</div>
            <span>-</span>
          </li>
          <li className="mt-2 flex justify-between text-sm">
            <div>쿠폰</div>
            <span>-</span>
          </li>
          <li className="mt-2 flex justify-between text-sm">
            <div>포인트</div>
            <span>-</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 w-[700px]">
        <p className="text-base font-semibold">총 결제금액</p>
        <div className="flex justify-end text-xl font-bold">{price}원</div>
      </div>
    </>
  );
}
