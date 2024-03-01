import React from 'react';

interface IAddr {
  address: string;
  zonecode: string;
}
export default function ZipcodeBtn({
  onZipcodeChange,
}: {
  onZipcodeChange: (obj: { zipcode: string; address: string }) => void;
}) {
  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: (data: IAddr) => {
        onZipcodeChange({ zipcode: data.zonecode, address: data.address });
      },
    }).open();
  };

  return (
    <button
      type="button"
      className="absolute bottom-2 right-0 h-[34px] rounded-xl border border-[#d3d3d3] px-[14px] text-xs"
      onClick={handleClick}
    >
      우편번호
    </button>
  );
}
