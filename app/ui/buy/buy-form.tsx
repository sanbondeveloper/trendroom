'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { IProduct, TAddress, TBuyForm, TSize } from '@/app/lib/definitions';
import { BuySchema } from '@/app/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { dollarToWon } from '@/app/lib/util';
import ProductInfo from './product-info';
import ShippingAddress from './shipping-address';
import ShippingRequestModal from './shipping-request-modal';
import PaymentMethod from './payment-method';
import OrderInformation from './order-information';
import { REQUEST_TEXT_LIST } from '@/app/lib/constants';
import { order } from '@/app/lib/actions';

export default function BuyForm({
  product,
  size,
  defaultAddress,
}: {
  product: IProduct;
  size: TSize;
  defaultAddress: TAddress | null;
}) {
  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<TBuyForm>({
    mode: 'onChange',
    resolver: zodResolver(BuySchema),
    defaultValues: {
      product: { id: product.id, size },
      address: defaultAddress || undefined,
      payment: { amount: dollarToWon(product.price) },
      message: REQUEST_TEXT_LIST[0],
    },
  });

  const onSubmit: SubmitHandler<TBuyForm> = async (data) => {
    await order(data);
  };

  return (
    <form className="pb-20" onSubmit={handleSubmit(onSubmit)}>
      <ProductInfo product={product} size={size} />
      <Controller
        name="address"
        control={control}
        render={({ field: { value, onChange } }) => (
          <ShippingAddress address={value} onAddressChange={onChange}>
            <Controller
              name="message"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ShippingRequestModal message={value} onMessageChange={onChange} />
              )}
            />
          </ShippingAddress>
        )}
      />

      <Controller
        name="payment"
        control={control}
        render={({ field: { value, onChange } }) => <PaymentMethod payment={value} onPaymentChange={onChange} />}
      />

      <OrderInformation price={dollarToWon(product.price).toLocaleString()} />

      <button
        type="submit"
        disabled={!isValid}
        className="mt-6 h-[55px] w-full rounded-xl border bg-black text-lg font-bold text-white disabled:bg-[#ebebeb]"
      >
        {'결제하기'}
      </button>
    </form>
  );
}
