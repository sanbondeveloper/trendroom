'use client';

import React from 'react';
import { cartCountState } from '../store/selectors';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import useSelectorSSR from '../hooks/useSelectorSSR';

export default function InCartBtn() {
  const count = useSelectorSSR({ state: cartCountState, defaultValue: 0 });

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingBagIcon className="w-9" />
      {count > 0 && (
        <div className="absolute left-4 top-[20px] flex items-center justify-center rounded-xl bg-red-500 px-[6px] py-[2px] text-xs font-bold text-white">
          {count}
        </div>
      )}
    </Link>
  );
}
