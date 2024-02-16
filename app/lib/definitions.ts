import { PRODUCT_CATEGORIES } from './constants';

export interface IUser {
  accessToken: string;
  user: {
    email: string;
    username: string;
    id: string;
  };
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
