import { PRODUCT_CATEGORIES } from './constants';

export interface IUser {
  email: string;
  username: string;
  _id: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export type TProductCategories = keyof typeof PRODUCT_CATEGORIES;
