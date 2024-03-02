import React, { useState } from 'react';
import Modal from '../common/modal';
import AddressList from './address-list';
import { TAddress } from '@/app/lib/definitions';

export default function ChangeAddressModal({
  defaultAddress,
  onShippingAddressChange,
}: {
  defaultAddress: TAddress | null;
  onShippingAddressChange: (address: TAddress, checked: boolean) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type="button" className="rounded-lg border px-3 py-2 text-xs" onClick={() => setIsModalOpen(true)}>
        변경
      </button>

      <Modal title="주소록" open={isModalOpen} onClose={handleClose}>
        <AddressList defaultAddress={defaultAddress} onShippingAddressChange={onShippingAddressChange} />
      </Modal>
    </>
  );
}
