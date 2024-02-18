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
      <header className="fixed left-0 right-0 top-0 z-10 bg-white px-10 pt-2 shadow">
        <div className="mb-2 flex justify-end">
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
        <div className="mb-6 flex items-center justify-between ">
          <h1 className="text-3xl font-bold text-gray-800">TrendRoom</h1>
          <div className="flex gap-2">
            <div>검색</div>
            <div>장바구니</div>
          </div>
        </div>
        <CategoriesList categories={categories} />
      </header>
      <div className="h-24" />
    </>
  );
}
