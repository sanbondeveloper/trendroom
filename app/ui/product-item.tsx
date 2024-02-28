import { IProduct } from '../lib/definitions';
import { dollarToWon } from '../lib/util';
import Link from 'next/link';
import Image from 'next/image';
import FavoritesBtn from './favorites-btn';

export default function ProductItem({
  product,
  interests,
  setOptimisticInterests,
}: {
  product: IProduct;
  interests: IProduct[];
  setOptimisticInterests: (product: IProduct) => void;
}) {
  const isInterest = !!interests.find((interest) => interest.id === product.id);

  return (
    <li className="relative">
      <Link href={`/products/${product.id}`} className="group">
        <div className="flex justify-center rounded-lg border py-8">
          <div className="relative h-40 w-40 overflow-hidden rounded-lg">
            <Image
              fill
              sizes="160px"
              src={product.image}
              alt={product.title}
              className="object-contain group-hover:opacity-75"
            />
          </div>
        </div>
        <h3
          className="mt-4 h-10 overflow-hidden text-ellipsis whitespace-normal break-keep text-sm text-gray-700"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.title}
        </h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{dollarToWon(product.price).toLocaleString() + '원'}</p>
        <div className="text-xs text-gray-400">구매가</div>
      </Link>
      <FavoritesBtn active={isInterest} product={product} setOptimisticInterests={setOptimisticInterests} />
    </li>
  );
}
