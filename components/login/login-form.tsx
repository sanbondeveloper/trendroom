import { useCallback, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import PasswordVisibleToggle from './password-visible-toggle';
import InputClearBtn from './input-clear-btn';
import LoginOthers from './login-others';
import { authenticate } from '@/lib/actions';

function LoginForm() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const handleisVisibleChange = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handlePasswordClear = useCallback(() => {
    setPasswordInput('');
  }, []);

  return (
    <form className="px-7" action={dispatch}>
      <div>
        <label htmlFor="email" />
        <input
          className="w-full"
          type="email"
          name="email"
          id="email"
          data-cy="emailInput"
          placeholder="이메일"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>

      <div className="relative mt-2">
        <label htmlFor="password" />
        <input
          className="w-full"
          type={isPasswordVisible ? 'text' : 'password'}
          name="password"
          id="password"
          data-cy="passwordInput"
          placeholder="비밀번호"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        {passwordInput && (
          <div className="absolute right-9 top-2 ">
            <InputClearBtn onInputClear={handlePasswordClear} />
          </div>
        )}
        <PasswordVisibleToggle isVisible={isPasswordVisible} onisVisibleChange={handleisVisibleChange} />
      </div>

      <div>
        <LoginButton />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="autologin"
            id="autologin"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
          />
          <label className="ml-2" htmlFor="autologin">
            자동 로그인
          </label>
        </div>

        <ul className="flex text-sm">
          <li>아이디 찾기</li>
          <li className="before:mx-3 before:content-['|']">비밀번호 찾기</li>
        </ul>
      </div>
      <LoginOthers />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-3 h-[50px] w-full bg-black text-white" data-cy="loginButton" disabled={pending}>
      로그인
    </button>
  );
}

export default LoginForm;
