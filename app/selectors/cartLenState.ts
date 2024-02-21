import { selector } from 'recoil';
import { cartState } from '../atoms/cartState';

export const cartLenState = selector({
  key: 'cartLenState',
  get: ({ get }) => get(cartState).length,
});
