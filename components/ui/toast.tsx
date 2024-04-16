'use client';

import clsx from 'clsx';

import useNotificationValue from '@/hooks/useNotificationValue';

function Toast() {
  const notification = useNotificationValue();

  return (
    <div className={clsx('fixed right-1/2 z-[99999] mt-6 translate-x-2/4', { hidden: !notification })}>
      <div className="flex h-[50px] min-w-[400px] items-center rounded-3xl bg-[#222222] py-[6px] pl-3 pr-[43px] opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#f15746"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>

        <div className="flex-1 text-center text-sm leading-[17px] text-white">
          <p>{notification?.message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
