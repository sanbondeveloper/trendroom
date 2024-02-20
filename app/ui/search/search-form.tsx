import { useEffect, useRef, useState } from 'react';
import { IProduct } from '../../lib/definitions';
import { useRouter } from 'next/navigation';
import { XCircleIcon } from '@heroicons/react/24/solid';
import SearchResult from './search-result';
import RecentSearch from './recent-search';
import { updateRecentSearches } from '@/app/lib/util';

interface ISearchFormProps {
  products: IProduct[];
}

export default function SearchForm({ products }: ISearchFormProps) {
  const [result, setResult] = useState<IProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();

  const handleSubmit = (query: string) => {
    setResult(products.filter((product) => query !== '' && product.title.toLowerCase().includes(query.toLowerCase())));
  };

  useEffect(() => {
    console.log('mount');

    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <div className="relative mx-auto my-0 h-full w-[800px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const query = inputRef.current?.value;

          if (!query) return;

          push(`/?query=${query}`);
          updateRecentSearches(query);
        }}
      >
        <div className="relative flex items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            id="search"
            type="text"
            className="z-10 mt-14 w-full border-x-0 border-b-2 border-t-0 border-black px-2 pb-3 focus:border-black"
            autoComplete="off"
            placeholder="검색어를 입력하세요"
            onChange={(e) => handleSubmit(e.target.value)}
            ref={inputRef}
          />
          <button
            type="button"
            className="absolute bottom-4 right-1 cursor-pointer border-none bg-transparent"
            aria-label="검색어 지우기"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = '';
              setResult([]);
            }}
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      <RecentSearch />
      <SearchResult result={result} query={inputRef.current ? inputRef.current.value : ''} />
    </div>
  );
}
