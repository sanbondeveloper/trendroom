import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSchema } from '../../lib/schema';
import { TAddress } from '@/app/lib/definitions';
import ValidationMessage from '../auth/validation-message';
import ZipcodeBtn from './zipcode-btn';
import { addAddress } from '@/app/lib/actions';
export default function AddAddressForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    formState: { errors, isValid },
    setValue,
    handleSubmit,
  } = useForm<TAddress>({
    mode: 'onChange',
    resolver: zodResolver(AddressSchema),
    defaultValues: { name: '', phone: '', zipcode: '', address: '', details: '' },
  });

  const handleZipcodeChange = ({ zipcode, address }: { zipcode: string; address: string }) => {
    setValue('zipcode', zipcode);
    setValue('address', address);
  };

  const onSubmit: SubmitHandler<TAddress> = async (data) => {
    await addAddress(data);
    onClose();
  };

  return (
    <form className="px-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="h-[90px]">
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          이름
        </label>
        <div>
          <input
            id="name"
            type="text"
            placeholder="수령인의 이름"
            className="block w-full border-b border-l-0 border-r-0 border-t-0 px-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('name')}
          />
        </div>
        {errors.name && <ValidationMessage message={errors.name?.message} />}
      </div>

      <div className="h-[90px]">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
          휴대폰 번호
        </label>
        <div>
          <input
            id="phone"
            type="text"
            placeholder="- 없이 입력"
            className="block w-full border-b border-l-0 border-r-0 border-t-0 px-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('phone')}
          />
        </div>
        {errors.phone && <ValidationMessage message={errors.phone?.message} />}
      </div>

      <div className="h-[90px]">
        <label htmlFor="zipcode" className="block text-sm font-medium leading-6 text-gray-900">
          우편 번호
        </label>
        <div className="relative">
          <input
            id="zipcode"
            type="text"
            placeholder="우편 번호를 검색하세요"
            className="block w-full cursor-text border-b border-l-0 border-r-0 border-t-0 px-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled
            {...register('zipcode')}
          />
          <ZipcodeBtn onZipcodeChange={handleZipcodeChange} />
        </div>
      </div>

      <div className="h-[90px]">
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
          주소
        </label>
        <div>
          <input
            id="address"
            type="text"
            placeholder="우편 번호 검색 후, 자동입력 됩니다"
            className="block w-full cursor-text border-b border-l-0 border-r-0 border-t-0 px-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            disabled
            {...register('address')}
          />
        </div>
      </div>

      <div className="h-[70px]">
        <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
          상세 주소
        </label>
        <div>
          <input
            id="details"
            type="text"
            placeholder="건물, 아파트, 동/호수 입력"
            className="block w-full border-b border-l-0 border-r-0 border-t-0 px-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('details')}
          />
        </div>
      </div>

      <div className="flex items-center px-1">
        <input id="checked" type="checkbox" className="scale-150 cursor-pointer" {...register('checked')} />

        <label htmlFor="checked" className="ml-3 block cursor-pointer text-xs font-medium leading-6 text-gray-900">
          기본 배송지로 설정
        </label>
      </div>

      <div className="flex justify-center pt-8">
        <button className="h-[42px] w-[120px] rounded-xl border border-[#d3d3d3] text-sm" onClick={onClose}>
          취소
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="ml-2 h-[42px] w-[120px] rounded-xl border bg-black text-sm font-bold  text-white disabled:bg-[#ebebeb]"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
