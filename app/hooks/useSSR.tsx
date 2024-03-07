import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
export default function useSSR<T>({ state, defaultValue }: { state: RecoilState<T>; defaultValue: T }) {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(state);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}
