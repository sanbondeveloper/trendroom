import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Modal from '../common/modal';
import SizesRadioGroup from './sizes-radio-group';

interface ISizesModalProps {
  size: string;
  onSizeChange: (newSize: string) => void;
}

export default function SizesModal({ size, onSizeChange }: ISizesModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-5 flex w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-2.5 font-bold"
      >
        <div>{size === '' ? '옵션 선택' : size}</div>
        <ChevronDownIcon className="h-5 w-5" />
      </button>

      <Modal open={isModalOpen} closable={false} onClose={handleClose}>
        <SizesRadioGroup selectedSize={size} onSizeChange={onSizeChange} onClose={handleClose} />
      </Modal>
    </>
  );
}
