import { IProduct } from './definitions';

export async function getProducts(): Promise<IProduct[] | null> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) return null;

    const products = await response.json();

    return products;
  } catch (error) {
    console.error('제품 조회 실패', error);

    return null;
  }
}
