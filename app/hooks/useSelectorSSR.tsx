import { useEffect, useState } from 'react';
import { RecoilValueReadOnly, useRecoilValue } from 'recoil';
export default function useSelectorSSR<T>({ state, defaultValue }: { state: RecoilValueReadOnly<T>; defaultValue: T }) {
  const [isInitial, setIsInitial] = useState(true);
  const value = useRecoilValue(state);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return isInitial ? defaultValue : value;
}
