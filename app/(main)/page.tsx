import { getProductsByCategory } from '../lib/api';
import { TProductCategories } from '../lib/definitions';
import ProductsList from '../ui/products-list';

export default async function Home({ searchParams }: { searchParams?: { tab?: TProductCategories } }) {
  const category = searchParams?.tab || 'all';
  const products = await getProductsByCategory(category);

  if (!products) return <div>오류 발생</div>;

  return <ProductsList products={products} />;
}
