'use client';

import LoginFooter from '@/components/login/login-footer';
import LoginForm from '@/components/login/login-form';
import LoginHeader from '@/components/login/login-header';
import Tab from '@/components/tab';
import { useCallback, useState } from 'react';

const items = [
  { id: 1, label: '가입 회원' },
  { id: 2, label: '비회원 주문 조회' },
];

function LoginPage() {
  const [tabIndex, setTabIndex] = useState(1);

  const handleTabIndexChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return (
    <main className="bg-main-grey h-screen">
      <div className="m-auto h-full max-w-[450px] bg-white">
        <LoginHeader />
        <Tab items={items} tabIndex={tabIndex} onTabIndexChange={handleTabIndexChange} />
        {tabIndex === 1 && <LoginForm />}
        <LoginFooter />
      </div>
    </main>
  );
}

export default LoginPage;
