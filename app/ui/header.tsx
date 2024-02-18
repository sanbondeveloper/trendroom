import { auth } from '@/auth';
import { getCategories } from '../lib/api';
import LogOutButton from './logout-button';
import Link from 'next/link';
import CategoriesList from './categories-list';

export default async function Header() {
  const session = await auth();
  const categories = await getCategories();

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-10 h-32 bg-white px-10 py-2 shadow">
        <div className="flex justify-end">
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
        <h1 className="text-4xl font-bold text-gray-800">TrendRoom</h1>
        <CategoriesList categories={categories} />
      </header>
      <div className="mb-20" />
    </>
  );
}
