import React, { useState } from 'react';
import SearchForm from './search-form';
import { IProduct } from '@/app/lib/definitions';
import RecentSearch from './recent-search';
import SearchResult from './search-result';

interface ISearchProps {
  products: IProduct[];
  onClose: () => void;
}

export default function Search({ products, onClose }: ISearchProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<IProduct[]>([]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleResultChange = (newResult: IProduct[]) => {
    setResult(newResult);
  };

  return (
    <div className="relative mx-auto my-0 h-full w-[800px]">
      <SearchForm
        products={products}
        onQueryChange={handleQueryChange}
        onResultChange={handleResultChange}
        onClose={onClose}
      />
      <RecentSearch onClose={onClose} />
      <SearchResult query={query} result={result} onClose={onClose} />
    </div>
  );
}
