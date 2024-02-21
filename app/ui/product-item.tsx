import { IProduct } from '../lib/definitions';
import { dollarToWon } from '../lib/util';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <li>
      <Link href={`/products/${product.id}`} className="group">
        <div className="relative h-48 w-48 overflow-hidden rounded-lg">
          <Image
            fill
            sizes="200px"
            src={product.image}
            alt={product.title}
            className="object-contain group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{dollarToWon(product.price).toLocaleString()}</p>
      </Link>
    </li>
  );
}
