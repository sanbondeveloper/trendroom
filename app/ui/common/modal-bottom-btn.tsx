import React from 'react';

function ModalBottomBtn({
  isValid,
  okText,
  onClose,
  onShippingRequestChange,
}: {
  isValid: boolean;
  okText: string;
  onClose: () => void;
  onShippingRequestChange: () => void;
}) {
  return (
    <div className="flex justify-center pt-8">
      <button className="h-[42px] w-[120px] rounded-xl border border-[#d3d3d3] text-sm" onClick={onClose}>
        취소
      </button>
      <button
        type="submit"
        disabled={!isValid}
        className="ml-2 h-[42px] w-[120px] rounded-xl border bg-black text-sm font-bold  text-white disabled:bg-[#ebebeb]"
        onClick={onShippingRequestChange}
      >
        {okText}
      </button>
    </div>
  );
}

export default ModalBottomBtn;
