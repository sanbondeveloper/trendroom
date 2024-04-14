import { auth } from '@/auth';
import { getInterests, getProducts } from './lib/api';
import { IProduct, TProductCategories } from './lib/definitions';
import ProductsList from './ui/products-list';

export default async function Home({ searchParams }: { searchParams?: { tab?: TProductCategories; query?: string } }) {
  const category = searchParams?.tab || 'all';
  const query = searchParams?.query || '';
  const products = await getProducts(category, query);
  const interests: IProduct[] = [];
  const session = await auth();

  // console.log('session', session);

  if (!products) return <div>오류 발생</div>;

  return <ProductsList products={products} interests={interests} />;
}
