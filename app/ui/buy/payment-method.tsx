import React from 'react';
import { PAYMENT_METHOD_LIST } from '@/app/lib/constants';
import clsx from 'clsx';

function PaymentMethod({
  payment,
  onPaymentChange,
}: {
  payment: { type: string; amount: number };
  onPaymentChange: (payment: { type: string; amount: number }) => void;
}) {
  return (
    <div className="box-white mt-2">
      <h3 className="text-lg font-semibold leading-5">결제 방법</h3>
      <h4 className="pb-3 pt-4 text-[15px]">일반 결제</h4>
      <ul className="flex flex-row flex-wrap gap-2">
        {PAYMENT_METHOD_LIST.map(({ method, title }) => (
          <li
            key={method}
            className={clsx(
              'border=[#d3d3d3] flex h-[60px] w-[156px] cursor-pointer items-center rounded-lg border bg-white px-[10px] py-[16px]',
              { 'border-2 border-black': payment.type === method },
            )}
            onClick={() => {
              onPaymentChange({ ...payment, type: method });
            }}
          >
            <span className="text-xs">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentMethod;
