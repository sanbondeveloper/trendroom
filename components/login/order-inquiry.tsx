import { useState } from 'react';
import InputClearBtn from './input-clear-btn';

function OrderInquiry() {
  const [orderer, setOrderer] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const isBtnDisabled = !orderer || !orderNumber;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="px-7" onSubmit={handleSubmit}>
      <div className="relative">
        <label htmlFor="orderer">주문자명</label>
        <input
          className="w-full"
          type="text"
          name="orderer"
          id="orderer"
          value={orderer}
          onChange={(e) => setOrderer(e.target.value)}
        />
        {orderer && (
          <div className="absolute right-2 top-8 ">
            <InputClearBtn onInputClear={() => setOrderer('')} />
          </div>
        )}
      </div>
      <div className="relative mt-5">
        <label htmlFor="orderNumber">주문번호</label>
        <input
          className="w-full"
          type="text"
          name="orderNumber"
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        {orderNumber && (
          <div className="absolute right-2 top-8 ">
            <InputClearBtn onInputClear={() => setOrderNumber('')} />
          </div>
        )}
      </div>
      <div className="mt-6">
        <button className="h-[50px] w-full bg-black text-white disabled:bg-[#f3f3f3]" disabled={isBtnDisabled}>
          주문 내역 조회하기
        </button>
      </div>
    </form>
  );
}

export default OrderInquiry;
