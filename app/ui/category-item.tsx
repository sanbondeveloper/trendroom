import { PRODUCT_CATEGORIES } from '../lib/constants';
import { TProductCategories } from '../lib/definitions';
import clsx from 'clsx';

interface ICategoryItemProps {
  category: TProductCategories;
  onChangeCategory: (category: TProductCategories) => void;
  active: boolean;
}
export default function CategoryItem({ category, active, onChangeCategory }: ICategoryItemProps) {
  return (
    <li key={category}>
      <div
        className={clsx('cursor-pointer', { 'border-b-4 border-indigo-500 pb-2.5': active })}
        onClick={() => onChangeCategory(category)}
      >
        {PRODUCT_CATEGORIES[category]}
      </div>
    </li>
  );
}
