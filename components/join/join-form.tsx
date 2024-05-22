'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { emailRegex, passwordRegex } from '@/lib/schemas';

function JoinForm() {
  const [email, setEmail] = useState({ value: '', isDirty: false, isValid: false });
  const [password, setPassword] = useState({ value: '', isDirty: false, isValid: false });
  const [referrerCode, setReferrerCode] = useState({ value: '', isDirty: false, isValid: false });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({
      value: e.target.value,
      isDirty: true,
      isValid: emailRegex.test(e.target.value),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      value: e.target.value,
      isDirty: true,
      isValid: passwordRegex.test(e.target.value),
    });
  };

  const handleReferrerCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target)
      setReferrerCode({
        value: e.target.value,
        isDirty: true,
        isValid: false,
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!((+e.key >= 0 && +e.key <= 9) || e.key === 'Backspace')) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isEmailInvalid = email.isDirty && !email.isValid;
  const isPasswordInvalid = password.isDirty && !password.isValid;
  const isReferrerCodeInvalid = referrerCode.isDirty && !referrerCode.isValid;

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <label className={clsx('block text-sm font-bold', { 'text-[#f15746]': isEmailInvalid })} htmlFor="email">
          <h3>이메일 주소*</h3>
        </label>
        <input
          className={clsx('w-[100%] border-b-[1px] py-2 outline-0 focus:border-b-black', {
            'border-b-[#f15746] focus:border-b-[#f15746]': isEmailInvalid,
          })}
          type="email"
          name="email"
          id="email"
          placeholder="예) kream@kream.co.kr"
          value={email.value}
          onChange={handleEmailChange}
        />
        <p className={clsx('absolute block text-xs leading-4 text-[#f15746]', { hidden: !isEmailInvalid })}>
          이메일 주소를 정확히 입력해주세요.
        </p>
      </div>

      <div className="relative mt-6">
        <label className={clsx('block text-sm font-bold', { 'text-[#f15746]': isPasswordInvalid })} htmlFor="password">
          <h3>비밀번호*</h3>
        </label>
        <input
          className={clsx('w-[100%] border-b-[1px] py-2 outline-0 focus:border-b-black', {
            'border-b-[#f15746] focus:border-b-[#f15746]': isPasswordInvalid,
          })}
          type="password"
          name="password"
          id="password"
          placeholder="영문, 숫자, 특수문자 조합 8-16자"
          maxLength={16}
          value={password.value}
          onChange={handlePasswordChange}
        />
        <p className={clsx('block text-xs leading-4 text-[#f15746]', { hidden: !isPasswordInvalid })}>
          영문, 숫자, 특수문자를 조합해서 입력해주세요.
        </p>
      </div>

      <div className="relative mt-6">
        <label
          className={clsx('block text-sm font-bold', { 'text-[#f15746]': isReferrerCodeInvalid })}
          htmlFor="referrerCode"
        >
          <h3>추천인 코드</h3>
        </label>
        <input
          className={clsx('w-[100%] border-b-[1px] py-2 outline-0 focus:border-b-black', {
            'border-b-[#f15746] focus:border-b-[#f15746]': isReferrerCodeInvalid,
          })}
          type="text"
          name="referrerCode"
          id="referrerCode"
          placeholder="추천인 코드를 입력하세요"
          autoComplete="off"
          value={referrerCode.value}
          onChange={handleReferrerCode}
          onKeyDown={handleKeyDown}
        />
        <p className={clsx('block text-xs leading-4 text-[#f15746]', { hidden: !isReferrerCodeInvalid })}>
          일치하는 코드를 찾을 수 없습니다.
        </p>
      </div>

      <div className="relative mt-8">
        <label className={clsx('block text-sm font-bold')} htmlFor="size">
          <h3>신발 사이즈</h3>
        </label>
        <input
          className={clsx('w-[100%] border-b-[1px] py-2 outline-0 focus:border-b-black disabled:bg-white')}
          type="text"
          name="size"
          id="size"
          readOnly
          disabled
        />
      </div>
    </form>
  );
}

export default JoinForm;
