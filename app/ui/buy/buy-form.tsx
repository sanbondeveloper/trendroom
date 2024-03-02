'use client';

import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { IProduct, TAddress } from '@/app/lib/definitions';
import ShippingAddress from './shipping-address';

export default function BuyForm({
  product,
  size,
  defaultAddress,
}: {
  product: IProduct;
  size: string | null;
  defaultAddress: TAddress | null;
}) {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm<TLoginForm>({
  //   mode: 'onChange',
  //   resolver: zodResolver(LoginSchema),
  //   defaultValues: { email: '', password: '' },
  // });

  return (
    <form>
      <div className="w-[700px] bg-white px-6 py-6">
        <div className="flex">
          <div className="flex items-center justify-center rounded-md border px-3 py-3">
            <div className="relative h-14 w-14">
              <Image fill src={product.image || ''} alt={product.title} sizes="56px" className="object-contain" />
            </div>
          </div>
          <div className="ml-3 flex flex-col justify-center">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold leading-4">TrendRoom</div>
            <div className="mt-[1px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-4">
              {product.title}
            </div>
            <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold leading-4">
              {size}
            </div>
          </div>
        </div>
      </div>

      <ShippingAddress defaultAddress={defaultAddress} />
    </form>
  );
}
