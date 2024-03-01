import { z } from 'zod';
import { AddressSchema } from './schema';
import { PRODUCT_CATEGORIES } from './constants';

export interface IUser {
  // email: string;
  username: string;
  id: string;
  accessToken: string;
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

export type TAddress = z.infer<typeof AddressSchema>;
