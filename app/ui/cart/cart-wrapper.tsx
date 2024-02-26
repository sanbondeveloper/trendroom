'use client';

import React, { useEffect, useState } from 'react';

export default function CartWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined' || !mounted) return <></>;

  return mounted ? <>{children}</> : <></>;
}
