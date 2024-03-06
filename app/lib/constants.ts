export const PRODUCT_CATEGORIES = {
  "men's clothing": '남자',
  "women's clothing": '여자',
  jewelery: '럭셔리',
  electronics: '전자',
  all: '전체',
} as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const REQUEST_TEXT_LIST = [
  { id: 1, text: '요청사항 없음' },
  { id: 2, text: '문 앞에 놓아주세요' },
  { id: 3, text: '경비실에 맡겨 주세요' },
  { id: 4, text: '파손 위험 상품입니다. 배송 시 주의해주세요' },
  { id: 5, text: '직접 입력' },
];

export const PAYMENT_METHOD_LIST = [
  { method: 'card', title: '신용카드' },
  { method: 'naverpay', title: '네이버페이' },
  { method: 'kakaopay', title: '카카오페이' },
  { method: 'tosspay', title: '토스페이' },
  { method: 'payco', title: '페이코' },
] as const;
