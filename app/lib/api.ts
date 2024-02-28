import { auth } from '@/auth';
import { IProduct, TProductCategories } from './definitions';

export async function getProducts(category: TProductCategories, query: string): Promise<IProduct[] | null> {
  try {
    const apiUrl =
      category === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;
    const response = await fetch(apiUrl);

    if (!response.ok) return null;

    const products = await response.json();

    return query === ''
      ? products
      : products.filter((product: IProduct) => product.title.toLowerCase().includes(query.toLowerCase()));
  } catch (error) {
    console.error('제품 리스트 조회 실패', error);

    return null;
  }
}

export async function getCategories(): Promise<TProductCategories[] | null> {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');

    if (!response.ok) return null;

    const categories = await response.json();

    return categories;
  } catch (error) {
    console.error('카테고리 리스트 조회 실패', error);

    return null;
  }
}

export async function getProductById(id: number): Promise<IProduct | null> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!response.ok) return null;

    const product = await response.json();

    return product;
  } catch (error) {
    console.error('특정 상품 조회 실패', error);

    return null;
  }
}

export async function getInterests(): Promise<IProduct[] | null> {
  const session = await auth();

  if (!session) return null;

  try {
    const response = await fetch('http://localhost:3001/interest', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      next: { tags: ['interest'] },
    });

    if (!response.ok) return null;

    const interests = await response.json();

    return interests;
  } catch (error) {
    console.error('관심상품조회 실패', error);

    return null;
  }
}
