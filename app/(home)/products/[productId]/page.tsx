import { getProductById } from '@/app/lib/api';
import Image from 'next/image';

export default async function ProductDetailPage({ params }: { params: { productId: number } }) {
  const id = params.productId;
  const product = await getProductById(id);

  if (!product) return <div>오류 발생</div>;

  return (
    <div className="mx-auto mt-4 max-w-5xl">
      <div className="flex items-center">
        <div className="relative h-96 w-96 flex-1">
          <Image fill src={product.image} alt={product.title} sizes="100wv" className="object-contain" />
        </div>
        <div className="flex-1">
          <div className="mb-3">
            <div className="text-sm">구매가</div>
            <div className="text-2xl font-bold">{product.price}</div>
          </div>
          <div className="mb-4 text-lg">{product.title}</div>
          <div className="mb-5">
            <label htmlFor="countries" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              옵션 선택
            </label>
            <select
              id="countries"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option selected>옵션 선택</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5 flex flex-col">
            <button className="rounded-md bg-[#ef6253] px-3 py-3 font-bold text-white">구매하기</button>
            <button className="border-1 mt-2 rounded-md border-[#ccc] px-3 py-3">관심상품 72</button>
          </div>
          <div className="mb-2">
            <div className="text-sm">설명</div>
            <div>{product.description}</div>
          </div>
          <div className="text-sm">평점</div>
          <div>
            {product.rating.rate}({product.rating.count})
          </div>
        </div>
      </div>
    </div>
  );
}
