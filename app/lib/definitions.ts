import { z } from 'zod';
import { AddressSchema, BuySchema } from './schema';
import { PRODUCT_CATEGORIES } from './constants';

export interface User {
  email?: string;
  nick: string;
  provider: 'local' | 'kakao' | 'apple';
  snsId?: string;
  accessToken: string;
  code: number;
}

export interface IUser {
  email: string;
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

export type TSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type TProductCategories = keyof typeof PRODUCT_CATEGORIES;

export type TAddress = { _id?: string } & z.infer<typeof AddressSchema>;

export type TBuyForm = { _id?: string } & z.infer<typeof BuySchema>;
