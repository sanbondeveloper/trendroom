function LoginForm() {
  return (
    <form>
      <p className="px-7">
        <label htmlFor="id" />
        <input className="w-full" type="text" name="id" id="id" placeholder="아이디" required />
      </p>
      <p className="mt-2 px-7">
        <label htmlFor="password" />
        <input className="w-full" type="password" name="password" id="password" placeholder="비밀번호" required />
      </p>
      <p className="px-7">
        <button className="mt-3 h-[50px] w-full bg-black text-white">로그인</button>
      </p>
      <div className="mt-5 flex items-center justify-between px-7">
        <p className="flex items-center">
          <input type="checkbox" name="autologin" id="autologin" />
          <label className="ml-2" htmlFor="autologin">
            자동 로그인
          </label>
        </p>
        <ul className="flex text-sm">
          <li>아이디 찾기</li>
          <li className="before:mx-3 before:content-['|']">비밀번호 찾기</li>
        </ul>
      </div>
    </form>
  );
}

export default LoginForm;
