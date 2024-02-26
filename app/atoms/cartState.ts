import { atom, AtomEffect } from 'recoil';
import { IProduct } from '../lib/definitions';

type TCartState = {
  product: IProduct;
  size: string;
  quantity: number;
}[];

const localStorageEffect =
  (key: string): AtomEffect<TCartState> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key) || null;
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage?.removeItem(key) : localStorage?.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom<TCartState>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('cart')],
});
