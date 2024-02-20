'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function useNavigationEvents({ callback }: { callback: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    callback();
  }, [pathname, searchParams]);

  return null;
}
