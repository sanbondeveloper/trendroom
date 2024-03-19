import React, { forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import SearchHighlight from './search-highlight';
import { IProduct } from '@/app/lib/definitions';

interface IResultItem {
  product: IProduct;
  isFocus: boolean;
  scrollRef: React.RefObject<HTMLLIElement>;
  onClose: () => void;
  query: string;
}

export default function ResultItem({ product, isFocus, scrollRef, onClose, query }: IResultItem) {
  const { push } = useRouter();

  return (
    <li
      key={product.id}
      className={clsx('py-4', { 'bg-slate-400': isFocus })}
      ref={isFocus ? scrollRef : undefined}
      tabIndex={0}
    >
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
  );
}
