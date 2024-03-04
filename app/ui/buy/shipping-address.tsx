import React, { useOptimistic } from 'react';
import { TAddress } from '@/app/lib/definitions';
import AddAddressModal from './add-address-modal';
import ChangeAddressModal from './chage-address-modal';
import ShippingRequestModal from './shipping-request-modal';
export default function ShippingAddress({ defaultAddress }: { defaultAddress: TAddress | null }) {
  const [shippingAddress, setShippingAddress] = useOptimistic(defaultAddress, (state, newAddress: TAddress) => ({
    ...state,
    ...newAddress,
  }));

  const handleShippingAddressChange = (address: TAddress, checked: boolean) => {
    if (checked || !shippingAddress) {
      setShippingAddress(address);
    }
  };

  return (
    <div className="mt-2 w-[700px] bg-white px-6 py-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-lg font-semibold leading-5">배송 주소</h3>
        <AddAddressModal onShippingAddressChange={handleShippingAddressChange} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className="w-20 text-xs text-zinc-400">받는 분</div>
            <div className="text-sm">{shippingAddress?.name}</div>
          </div>
          <div className="mt-2 flex items-center">
            <div className="w-20 text-xs text-zinc-400">연락처</div>
            <div className="text-sm">{shippingAddress?.phone}</div>
          </div>
          <div className="mt-2 flex items-center">
            <div className="w-20 text-xs text-zinc-400">배송 주소</div>
            <div className="text-sm">{(shippingAddress?.address || '') + ' ' + (shippingAddress?.details || '')}</div>
          </div>
        </div>
        <ChangeAddressModal defaultAddress={shippingAddress} onShippingAddressChange={handleShippingAddressChange} />
      </div>
      <div className="mt-3">
        <ShippingRequestModal />
      </div>
    </div>
  );
}
