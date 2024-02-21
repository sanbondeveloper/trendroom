import { atom } from 'recoil';
import { IProduct } from '../lib/definitions';

type TCartState = {
  product: IProduct;
  size: string;
  quantity: number;
}[];

export const cartState = atom<TCartState>({
  key: 'cartState',
  default: [],
});
