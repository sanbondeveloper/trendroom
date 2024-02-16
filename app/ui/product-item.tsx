import { IProduct } from '../lib/definitions';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <li>
      <Link href="#" className="group">
        <div className="relative h-72 rounded-lg bg-gray-200">
          <Image
            fill
            src={product.image}
            alt={product.title}
            sizes="(min-width: 640p) 50vw, (min-width: 1024px) 33vw, 25vw"
            className="object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
      </Link>
    </li>
  );
}
