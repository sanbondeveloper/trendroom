import { auth } from '@/auth';
import { getCategories, getProducts } from '../lib/api';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import LogOutButton from './logout-button';
import Link from 'next/link';
import CategoriesList from './categories-list';
import SearchModal from './search/search-modal';

export default async function Header() {
  const session = await auth();
  const categories = await getCategories();
  const products = await getProducts('all', '');

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-10 bg-white px-10 pt-2 shadow">
        <div className="mb-3 flex justify-end">
          <ul className="flex w-40 justify-between text-xs">
            <li>
              <Link href="#">고객센터</Link>
            </li>
            <li>
              <Link href="#">마이페이지</Link>
            </li>
            <li>{session ? <LogOutButton /> : <Link href={'/login'}>로그인</Link>}</li>
          </ul>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            <Link href="/">TrendRoom</Link>
          </h1>
          <ul className="flex items-center gap-2">
            <li className="flex items-center">
              <SearchModal products={products} />
            </li>
            <li className="flex items-center">
              <ShoppingBagIcon className="w-7" />
            </li>
          </ul>
        </div>
        <CategoriesList categories={categories} />
      </header>
      <div className="h-24" />
    </>
  );
}
