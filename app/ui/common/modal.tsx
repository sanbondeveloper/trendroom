'use client';

import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Portal from './portal';

interface IModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  maskClosable?: boolean;
  closable?: boolean;
  full?: boolean;
}

export default function Modal({
  open,
  children,
  onClose,
  closable = true,
  maskClosable = true,
  full = false,
}: IModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

  const onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && maskClosable) onClose?.();
  };

  if (!open) return null; // display: none 보다 성능이 좋다고 한다.

  return (
    <Portal elementId="modal-root">
      <div className="modal-overlay fixed inset-0 z-50 bg-black/60" />
      <div
        tabIndex={-1}
        onClick={onMaskClick}
        className="modal-wrapper fixed inset-0 z-50 overflow-auto focus:outline-none"
      >
        <div
          className={clsx(
            'modal-inner bg-white shadow-md',
            { 'fixed inset-0': full },
            { 'relative top-1/2 mx-auto my-0 w-[600px] -translate-y-1/2 rounded-lg px-[20px] py-[40px]': !full },
          )}
          tabIndex={0}
        >
          {closable && (
            <button className="absolute right-3 top-3" onClick={onClose}>
              <XMarkIcon className="w-6" />
            </button>
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
}
