import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { REQUEST_TEXT_LIST } from '@/app/lib/constants';
import Modal from '../common/modal';
import ShippingRequestList from './shipping-request-list';
import ModalBottomBtn from '../common/modal-bottom-btn';

function ShippingRequestModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingRequest, setShippingRequest] = useState(REQUEST_TEXT_LIST[0]);
  const [activeId, setActiveId] = useState(1);
  const [textareaInput, setTextareaInput] = useState('');

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleShippingRequestChange = () => {
    if (activeId === 5) {
      setShippingRequest({ id: 5, text: textareaInput });
    } else {
      setShippingRequest(REQUEST_TEXT_LIST[activeId - 1]);
    }
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-[#ebebeb] px-3 py-3 text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <span>{shippingRequest.text}</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>

      <Modal title="배송 요청사항" open={isModalOpen} onClose={handleClose}>
        <ShippingRequestList activeId={activeId} setActiveId={setActiveId} />
        {activeId === 5 && (
          <textarea
            maxLength={40}
            placeholder="내용을 입력해주세요.(최대 40자)"
            className="w-full resize-none rounded-lg border border-[#ebebeb] px-3 py-3 text-sm"
            onChange={(e) => setTextareaInput(e.target.value)}
          />
        )}
        <div className="mt-6">
          <ModalBottomBtn
            okText="적용하기"
            isValid={!(activeId === 5 && !textareaInput)}
            onClose={handleClose}
            onShippingRequestChange={handleShippingRequestChange}
          />
        </div>
      </Modal>
    </>
  );
}

export default ShippingRequestModal;
