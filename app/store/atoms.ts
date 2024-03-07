// 저장소에 상태를 저장하고 동기화하는 리코일용 소형 모듈입니다.

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IProduct } from '../lib/definitions';

type TCart = {
  product: IProduct;
  size: string;
  quantity: number;
};

const defaultValue: TCart[] = [];

const { persistAtom } = recoilPersist();

export const cartState = atom<TCart[]>({
  key: 'cart',
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});
