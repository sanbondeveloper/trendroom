'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { cartLenState } from '../selectors/cartLenState';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function InCartBtn() {
  const count = useRecoilValue(cartLenState);
  return (
    <div className="relative cursor-pointer">
      <ShoppingBagIcon className="w-9" />
      <div className="absolute left-4 top-[20px] flex items-center justify-center rounded-xl bg-red-500 px-[6px] py-[2px] text-xs font-bold text-white">
        1
      </div>
    </div>
  );
}
