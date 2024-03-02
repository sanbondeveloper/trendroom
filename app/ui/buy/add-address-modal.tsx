import React, { useState } from 'react';
import { TAddress } from '@/app/lib/definitions';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from '../common/modal';
import AddAddressForm from './add-address-form';

function AddAddressModal({
  onShippingAddressChange,
}: {
  onShippingAddressChange: (address: TAddress, checked: boolean) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} type="button" className="flex items-center text-zinc-400">
        <PlusIcon className="h-3 w-3" />
        <span className="text-xs">새 주소 추가</span>
      </button>

      <Modal title="새 주소 추가" open={isModalOpen} onClose={handleClose}>
        <AddAddressForm onClose={handleClose} onShippingAddressChange={onShippingAddressChange} />
      </Modal>
    </>
  );
}

export default AddAddressModal;
