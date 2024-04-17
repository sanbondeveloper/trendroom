'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { authenticate } from '@/lib/actions';
import LoginButton from './login-button';
import useNotificationActions from '@/hooks/useNotificationActions';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

function LoginForm() {
  const [email, setEmail] = useState({ value: '', isDirty: false, isValid: false });
  const [password, setPassword] = useState({ value: '', isDirty: false, isValid: false });
  const actions = useNotificationActions();

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

  const isFormValid = email.isValid && password.isValid;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    const message = await authenticate({ email: email.value, password: password.value });

    if (message) {
      actions?.showNotification({
        title: '',
        message: message,
        status: 'error',
      });
    }
  };

  const isEmailInvalid = email.isDirty && !email.isValid;
  const isPasswordInvalid = password.isDirty && !password.isValid;

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <label className={clsx('block text-sm font-bold', { 'text-[#f15746]': isEmailInvalid })} htmlFor="email">
          <h3>이메일 주소</h3>
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
          <h3>비밀번호</h3>
        </label>
        <input
          className={clsx('w-[100%] border-b-[1px] py-2 outline-0 focus:border-b-black', {
            'border-b-[#f15746] focus:border-b-[#f15746]': isPasswordInvalid,
          })}
          type="password"
          name="password"
          id="password"
          maxLength={16}
          value={password.value}
          onChange={handlePasswordChange}
        />
        <p className={clsx('block text-xs leading-4 text-[#f15746]', { hidden: !isPasswordInvalid })}>
          영문, 숫자, 특수문자를 조합해서 입력해주세요. (8~16자)
        </p>
      </div>

      <div className="mt-5">
        <LoginButton isFormValid={isFormValid} />
      </div>
    </form>
  );
}

export default LoginForm;
