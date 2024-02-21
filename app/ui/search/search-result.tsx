import React from 'react';
import { IProduct } from '../../lib/definitions';
import SearchHighlight from './search-highlight';
import { useRouter } from 'next/navigation';

interface ISearchResultProps {
  result: IProduct[];
  query: string;
  onClose: () => void;
}

export default function SearchResult({ result, query, onClose }: ISearchResultProps) {
  const { push } = useRouter();

  if (query === '') return null;

  return (
    <ul className="absolute top-24 h-[800px] w-full overflow-auto bg-white pt-2 text-sm">
      {result.map((product) => (
        <li key={product.id} className="py-4">
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
  );
}
