import { getProductById } from '@/app/lib/api';
import ProductDetail from '@/app/ui/detail/product-detail';

export default async function ProductDetailPage({ params }: { params: { productId: number } }) {
  const id = params.productId;
  const product = await getProductById(id);

  if (!product) return <div>오류 발생</div>;

  return <ProductDetail product={product} />;
}
