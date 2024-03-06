import React, { useOptimistic } from 'react';
import { TAddress } from '@/app/lib/definitions';
import AddAddressModal from './add-address-modal';
import ChangeAddressModal from './chage-address-modal';
export default function ShippingAddress({
  address,
  onAddressChange,
  children,
}: {
  address: TAddress | null;
  onAddressChange: (address: TAddress) => void;
  children: React.ReactNode;
}) {
  const handleShippingAddressChange = (address: TAddress, checked: boolean) => {
    if (checked || !address) {
      onAddressChange(address);
    }
  };

  return (
    <div className="box-white mt-2">
      <div className="flex justify-between pb-3">
        <h3 className="text-lg font-semibold leading-5">배송 주소</h3>
        <AddAddressModal onShippingAddressChange={handleShippingAddressChange} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className="w-20 text-xs text-zinc-400">받는 분</div>
            <div className="text-sm">{address?.name}</div>
          </div>
          <div className="mt-2 flex items-center">
            <div className="w-20 text-xs text-zinc-400">연락처</div>
            <div className="text-sm">{address?.phone}</div>
          </div>
          <div className="mt-2 flex items-center">
            <div className="w-20 text-xs text-zinc-400">배송 주소</div>
            <div className="text-sm">{(address?.address || '') + ' ' + (address?.details || '')}</div>
          </div>
        </div>
        <ChangeAddressModal defaultAddress={address} onShippingAddressChange={handleShippingAddressChange} />
      </div>
      {children}
    </div>
  );
}
