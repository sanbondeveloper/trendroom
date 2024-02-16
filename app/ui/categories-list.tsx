import { getCategories } from '../lib/api';
import { PRODUCT_CATEGORIES } from '../lib/constants';

export default async function CategoriesList() {
  const categories = await getCategories();

  if (!categories) return <div>오류 발생</div>;

  return (
    <ul className="mt-7 flex space-x-10">
      {categories?.map((category) => <li key={category}>{PRODUCT_CATEGORIES[category]}</li>)}
    </ul>
  );
}
