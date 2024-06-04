export const PRODUCT_CATEGORIES = {
  "men's clothing": '남자',
  "women's clothing": '여자',
  jewelery: '럭셔리',
  electronics: '전자',
  all: '전체',
};

export type ProductCategories = keyof typeof PRODUCT_CATEGORIES;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategories;
  image: string;
  rating: { rate: number; count: number };
}
