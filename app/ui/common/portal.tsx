'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
  children: React.ReactNode;
  elementId: string;
}
export default function Portal({ children, elementId }: IPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return <></>;

  return mounted ? createPortal(children, document.getElementById(elementId) as HTMLElement) : <></>;
}
