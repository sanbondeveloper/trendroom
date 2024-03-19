import React, { useEffect, useRef } from 'react';
import { IProduct } from '../../lib/definitions';
import { useRouter } from 'next/navigation';
import ResultItem from './result-item';

interface ISearchResultProps {
  result: IProduct[];
  query: string;
  onClose: () => void;
  focusIndex: number;
}

export default function SearchResult({ result, query, onClose, focusIndex }: ISearchResultProps) {
  const scrollRef = useRef<HTMLLIElement>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (focusIndex === -1) return;
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusIndex]);

  if (query === '') return null;

  return (
    <ul className="absolute top-24  h-[700px] w-full overflow-auto bg-white pt-2 text-sm">
      {result.length > 0 ? (
        result.map((product, idx) => (
          <ResultItem
            key={product.id}
            product={product}
            isFocus={focusIndex === idx}
            scrollRef={scrollRef}
            onClose={onClose}
            query={query}
          />
        ))
      ) : (
        <span>검색결과가 없습니다.</span>
      )}
    </ul>
  );
}
