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
