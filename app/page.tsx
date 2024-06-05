import { getInterests, getProducts } from '@/lib/actions';
import { ProductCategories } from '@/types/product';
import ProductList from '@/components/products/product-list';

export default async function Home({ searchParams }: { searchParams?: { tab?: ProductCategories; query?: string } }) {
  const category = searchParams?.tab;
  const products = await getProducts(category);
  const interests = await getInterests();
  const productsWithInterested = products.map((product) => ({
    ...product,
    interested: interests.includes(product.id),
  }));

  return <ProductList products={productsWithInterested} />;
}
