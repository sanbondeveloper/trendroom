'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/auth';

import LoginForm from '@/components/login/login-form';
import LoginHeader from '@/components/login/login-header';
import Tab from '@/components/tab';
import OrderInquiry from '@/components/login/order-inquiry';
import clsx from 'clsx';

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
    <main className="h-screen bg-main-grey">
      <div className="m-auto h-full max-w-[450px] bg-white">
        <LoginHeader />
        <Tab items={items} tabIndex={tabIndex} onTabIndexChange={handleTabIndexChange} />
        <div className={clsx('', { hidden: tabIndex !== 1 })}>
          <LoginForm />
        </div>
        <div className={clsx('', { hidden: tabIndex !== 2 })}>
          <OrderInquiry />
        </div>
        <footer className="mt-4 px-7">
          <p>
            <Link href="#">회원가입</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}

export default LoginPage;
