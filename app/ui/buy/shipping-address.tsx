import React from 'react';
import AddAddressModal from './add-address-modal';

export default function ShippingAddress() {
  return (
    <div className="mt-2 w-[700px] bg-white px-6 py-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-lg font-semibold leading-5">배송 주소</h3>
        <AddAddressModal />
      </div>
    </div>
  );
}
