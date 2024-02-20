import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProduct } from '../lib/definitions';
import { XCircleIcon } from '@heroicons/react/24/solid';
import SearchHighlight from './search-highlight';

interface ISearchFormProps {
  products: IProduct[];
  onClose: () => void;
}

export default function SearchForm({ products, onClose }: ISearchFormProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<IProduct[]>([]);
  const { push } = useRouter();

  const handleSubmit = (query: string) => {
    setQuery(query);
    setResult(products.filter((product) => query !== '' && product.title.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <div className="mx-auto my-0 h-full w-[800px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative flex items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            id="search"
            type="text"
            className="mt-14 w-full border-x-0 border-b-2 border-t-0 border-black px-2 pb-3 focus:border-black"
            autoComplete="off"
            placeholder="검색어를 입력하세요"
            onChange={(e) => handleSubmit(e.target.value)}
          />
          <button
            type="button"
            className="absolute bottom-4 right-1 cursor-pointer border-none bg-transparent"
            aria-label="검색어 지우기"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </form>

      <ul className="h-[800px] overflow-auto pt-2 text-sm">
        {result.map((product) => (
          <li key={product.id} className=" py-4">
            <div
              onClick={() => {
                push(`/products/${product.id}`);
                onClose();
              }}
              className="w-fit cursor-pointer"
            >
              <SearchHighlight text={product.title} query={query} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
