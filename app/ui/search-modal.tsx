import { XMarkIcon } from '@heroicons/react/24/outline';
import { IProduct } from '../lib/definitions';
import SearchForm from './search-form';

interface ISearchModalProps {
  open: boolean;
  products: IProduct[];
  onClose: () => void;
}
export default function SearchModal({ open, products, onClose }: ISearchModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center bg-white pt-10">
      <div className="w-full max-w-3xl p-6 ">
        <button
          onClick={onClose}
          className="absolute right-0 top-0 m-4 text-gray-600 hover:text-gray-900"
          aria-label="닫기"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>

        <SearchForm products={products} onClose={onClose} />
      </div>
    </div>
  );
}
