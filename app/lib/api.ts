import { IProduct, TProductCategories } from './definitions';

export async function getProducts(): Promise<IProduct[] | null> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) return null;

    const products = await response.json();

    return products;
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
