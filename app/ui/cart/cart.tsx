'use client';

import React, { useMemo } from 'react';
import { dollarToWon } from '@/app/lib/util';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cartState } from '@/app/store/atoms';
import { faker } from '@faker-js/faker';
import useSSR from '@/app/hooks/useSSR';
import Image from 'next/image';
import Table from './Table';

export default function Cart() {
  faker.seed(123);
  const [cart] = useSSR({ state: cartState, defaultValue: [] });
  const columns = useMemo(
    () => [
      {
        id: 'name',
        header: '이름',
        accessorKey: 'name',
      },
      {
        id: 'email',
        header: '이메일',
        accessorKey: 'email',
      },
      {
        id: 'phone',
        header: '전화번호',
        accessorKey: 'phone',
      },
    ],
    [],
  );
  const data = Array(53)
    .fill(null)
    .map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    }));

  return (
    <div className="mx-auto mt-11 max-w-2xl">
      <Table columns={columns} data={data} />
      {cart.map(({ product, size, quantity }, idx) => (
        <div key={idx} className="relative flex items-center border">
          <button className="absolute right-0 top-0">
            <XMarkIcon className="w-6" />
          </button>
          <div className="relative h-24 w-24 ">
            <Image fill src={product.image} alt={product.title} sizes="96px" className="object-contain" />
          </div>
          <div>
            <div className="text-xs">TrendRoom</div>
            <div className="text-sm">{product.title}</div>
            <div className="text-xs">{`수량 ${quantity}개 | ${size}`}</div>
            <div className="mt-2 flex justify-between">
              <button className="rounded-md border px-2 text-xs">옵션/수량</button>
              <div className="font-bold">{(dollarToWon(product.price) * quantity).toLocaleString() + '원'}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
