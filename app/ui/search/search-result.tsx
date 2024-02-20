import React from 'react';
import { IProduct } from '../../lib/definitions';
import SearchHighlight from './search-highlight';
import Link from 'next/link';

interface ISearchResultProps {
  result: IProduct[];
  query: string;
}

export default function SearchResult({ result, query }: ISearchResultProps) {
  if (query.length === 0) return null;

  return (
    <ul className="absolute top-24 h-[800px] w-full overflow-auto bg-white pt-2 text-sm">
      {result.map((product) => (
        <li key={product.id} className="py-4">
          <Link href={`/products/${product.id}`} className="w-fit cursor-pointer">
            <SearchHighlight text={product.title} query={query} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
