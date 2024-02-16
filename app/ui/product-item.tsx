import { IProduct } from '../lib/definitions';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <Link href="#" className="group">
      <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          width={256}
          height={325}
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </Link>
  );
}
