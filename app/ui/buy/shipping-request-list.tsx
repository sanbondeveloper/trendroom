import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { REQUEST_TEXT_LIST } from '@/app/lib/constants';
import clsx from 'clsx';
function ShippingRequestList({ activeId, setActiveId }: { activeId: number; setActiveId: (id: number) => void }) {
  return (
    <ul>
      {REQUEST_TEXT_LIST.map(({ id, text }) => (
        <li
          key={id}
          className={clsx('flex cursor-pointer justify-between border-b py-4 text-sm last:border-b-0', {
            'font-bold': activeId === id,
          })}
          onClick={() => setActiveId(id)}
        >
          <span>{text}</span>
          {activeId === id && <CheckIcon className="h-4 w-4" />}
        </li>
      ))}
    </ul>
  );
}

export default ShippingRequestList;
