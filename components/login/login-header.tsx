'use client';

import { useRouter } from 'next/navigation';

function LoginHeader() {
  const router = useRouter();

  const handleBackBtnClick = () => {
    router.back();
  };

  return (
    <header className="relative flex items-center justify-center py-4">
      <div className="absolute left-4">
        <button className="flex items-center" onClick={handleBackBtnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
      <h2>로그인</h2>
    </header>
  );
}

export default LoginHeader;
