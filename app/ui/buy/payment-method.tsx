import { PAYMENT_METHOD_LIST } from '@/app/lib/constants';
import clsx from 'clsx';
import React, { useState } from 'react';

function PaymentMethod() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="mt-2 w-[700px] bg-white px-6 py-6">
      <h3 className="text-lg font-semibold leading-5">결제 방법</h3>
      <h4 className="pb-3 pt-4 text-[15px]">일반 결제</h4>
      <ul className="flex flex-row flex-wrap gap-2">
        {PAYMENT_METHOD_LIST.map(({ id, method, title }) => (
          <li
            key={method}
            className={clsx(
              'border=[#d3d3d3] flex h-[60px] w-[156px] cursor-pointer items-center rounded-lg border bg-white px-[10px] py-[16px]',
              { 'border-2 border-black': activeId === id },
            )}
            onClick={() => setActiveId(id)}
          >
            <span className="text-xs">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentMethod;
