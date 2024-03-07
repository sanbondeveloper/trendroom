import { selector } from 'recoil';
import { cartState } from './atoms';

export const cartCountState = selector<number>({
  key: 'cartCount',
  get: ({ get }) => get(cartState).length,
});
