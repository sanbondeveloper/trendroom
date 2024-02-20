import { XCircleIcon } from '@heroicons/react/24/solid';
import { IProduct } from '../lib/definitions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ISearchFormProps {
  products: IProduct[];
  onClose: () => void;
}

export default function SearchForm({ products, onClose }: ISearchFormProps) {
  const [result, setResult] = useState<IProduct[]>([]);
  const { push } = useRouter();

  const handleSubmit = (term: string) => {
    setResult(products.filter((product) => term !== '' && product.title.toLowerCase().includes(term.toLowerCase())));
  };

  return (
    <>
      <form>
        <div className="relative flex w-full items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            id="search"
            type="text"
            className="w-full border-x-0 border-b-2 border-t-0 border-black px-2 pb-3 focus:border-black"
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

      <ul className="pt-2 text-sm">
        {result.map((product) => (
          <li
            key={product.id}
            onClick={() => {
              push(`/products/${product.id}`);
              onClose();
            }}
            className="cursor-pointer py-2"
          >
            {product.title}
          </li>
        ))}
      </ul>
    </>
  );
}