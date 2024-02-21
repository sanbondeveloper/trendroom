import { useRef } from 'react';
import { IProduct } from '../../lib/definitions';
import { useRouter } from 'next/navigation';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { updateRecentSearches } from '@/app/lib/util';
import clsx from 'clsx';

interface ISearchFormProps {
  products: IProduct[];
  onQueryChange: (newQuery: string) => void;
  onResultChange: (newResult: IProduct[]) => void;
  onClose: () => void;
}

export default function SearchForm({ products, onQueryChange, onResultChange, onClose }: ISearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();

  const handleQueryChange = (query: string) => {
    onQueryChange(query);
    if (query === '') return;

    const newResult = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
    onResultChange(newResult);
  };

  const handleSubmit = () => {
    const query = inputRef.current?.value;
    if (!query) return;

    push(`/?query=${query}`);
    updateRecentSearches(query);
    onClose();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="relative flex items-center">
        <label htmlFor="search" className="sr-only">
          검색
        </label>
        <input
          id="search"
          type="text"
          className="z-10 mt-14 w-full border-x-0 border-b-2 border-t-0 border-black px-2 pb-3 focus:border-black"
          autoComplete="off"
          placeholder="검색어를 입력하세요"
          onChange={(e) => handleQueryChange(e.target.value)}
          ref={inputRef}
        />
        <button
          type="button"
          className={clsx('absolute bottom-4 right-1 z-10 cursor-pointer border-none bg-transparent', {
            hidden: !inputRef.current || inputRef.current?.value === '',
          })}
          aria-label="검색어 지우기"
          onClick={() => {
            if (inputRef.current) inputRef.current.value = '';
            onQueryChange('');
            onResultChange([]);
          }}
        >
          <XCircleIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}
