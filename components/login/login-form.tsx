import { useCallback, useState } from 'react';

import PasswordVisibleToggle from './password-visible-toggle';
import InputClearBtn from './input-clear-btn';
import LoginOthers from './login-others';

function LoginForm() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleisVisibleChange = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handlePasswordClear = useCallback(() => {
    setPasswordInput('');
  }, []);

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailInput) {
      return alert('아이디를 입력해주세요.');
    }

    if (!passwordInput) {
      return alert('비밀번호를 입력해주세요.');
    }
  };

  return (
    <form className="px-7" onSubmit={handleSumbit}>
      <div>
        <label htmlFor="id" />
        <input
          className="w-full"
          type="text"
          name="id"
          id="id"
          placeholder="아이디"
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
        <button className="mt-3 h-[50px] w-full bg-black text-white">로그인</button>
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

export default LoginForm;
