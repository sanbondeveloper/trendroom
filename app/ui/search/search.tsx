import React, { useEffect, useState } from 'react';
import SearchForm from './search-form';
import { IProduct } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import { updateRecentSearches } from '@/app/lib/util';
import RecentSearch from './recent-search';
import SearchResult from './search-result';

interface ISearchProps {
  products: IProduct[];
  onClose: () => void;
}

export default function Search({ products, onClose }: ISearchProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<IProduct[]>([]);
  const [focusIndex, setFocusIndex] = useState(-1);
  const { push } = useRouter();

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Escape' && e.key !== 'Enter') return;

      if (e.key === 'ArrowDown' && result.length > 0) {
        setFocusIndex(focusIndex + 1);
        if (focusIndex + 1 === result.length) setFocusIndex(0);
      } else if (e.key === 'ArrowUp' && result.length > 0) {
        setFocusIndex(focusIndex - 1);
        if (focusIndex - 1 < 0) setFocusIndex(-1);
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && focusIndex !== -1) {
        push(`/products/${result[focusIndex].id}`);
        onClose();
      }
    };

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [result, focusIndex, onClose, push]);

  const handleQueryChange = (newQuery: string) => {
    if (newQuery === '') {
      setFocusIndex(-1);
    }
    setQuery(newQuery);
  };

  const handleResultChange = (newResult: IProduct[]) => {
    setResult(newResult);
  };

  return (
    <div className="relative mx-auto my-0 h-full w-[800px]">
      <SearchForm
        products={products}
        focusIndex={focusIndex}
        onQueryChange={handleQueryChange}
        onResultChange={handleResultChange}
        onClose={onClose}
      />
      <RecentSearch onClose={onClose} />
      <SearchResult query={query} result={result} onClose={onClose} focusIndex={focusIndex} />
    </div>
  );
}
