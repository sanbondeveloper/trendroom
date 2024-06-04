import { getProducts } from '@/lib/actions';
import { ProductCategories } from '@/types/product';
import ProductList from '@/components/products/product-list';

export default async function Home({ searchParams }: { searchParams?: { tab?: ProductCategories; query?: string } }) {
  const category = searchParams?.tab;
  const products = await getProducts(category);

  return <ProductList products={products} />;
}
