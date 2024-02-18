'use client';

import { TProductCategories } from '../lib/definitions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CategoryItem from './category-item';

export default function CategoriesList({ categories }: { categories: TProductCategories[] | null }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedCategory = searchParams.get('tab') || 'all';

  const handleChangeCategory = (category: TProductCategories) => {
    if (category === 'all') {
      return replace(`${pathname}`);
    }

    const params = new URLSearchParams();
    params.set('tab', category);

    replace(`${pathname}?${params.toString()}`);
  };

  if (pathname !== '/') return null;
  if (!categories) return <div>오류 발생</div>;

  const categoriesWithAll = [...categories, 'all'] as TProductCategories[];

  return (
    <ul className="flex space-x-10">
      {categoriesWithAll?.map((category) => (
        <CategoryItem
          key={category}
          category={category}
          active={selectedCategory === category}
          onChangeCategory={handleChangeCategory}
        />
      ))}
    </ul>
  );
}
