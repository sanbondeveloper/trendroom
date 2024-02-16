import { signOut, auth } from '@/auth';
import { getProducts } from '../lib/api';
import ProductsList from '../ui/products-list';

export default async function Home() {
  // const session = await auth();
  const products = await getProducts();

  if (!products) return <div>오류 발생</div>;

  return <ProductsList products={products} />;
}
