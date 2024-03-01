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
  title?: string | null;
  full?: boolean;
}

export default function Modal({
  open,
  children,
  onClose,
  closable = true,
  maskClosable = true,
  title = null,
  full = false,
}: IModalProps) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

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
            { 'relative top-1/2 mx-auto my-0 w-[600px] -translate-y-1/2 rounded-lg ': !full },
          )}
          tabIndex={0}
        >
          <div>
            <h2 className={clsx({ 'pt-3 text-center text-lg font-bold': !!title })}>{title}</h2>
            {closable && (
              <button className="absolute right-3 top-[15px]" onClick={onClose}>
                <XMarkIcon className="w-6" />
              </button>
            )}
          </div>
          <div className="px-[20px] py-[40px]">{children}</div>
        </div>
      </div>
    </Portal>
  );
}
