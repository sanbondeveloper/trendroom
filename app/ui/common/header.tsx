import { auth } from '@/auth';
import { getCategories, getProducts } from '../../lib/api';
import LogOutButton from '../logout-button';
import Link from 'next/link';
import CategoriesList from '../categories-list';
import SearchModal from '../search/search-modal';
import InCartBtn from '../in-cart-btn';
import CartWrapper from '../cart/cart-wrapper';

export default async function Header() {
  const session = await auth();
  const categories = await getCategories();
  const products = await getProducts('all', '');

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-10 flex justify-center bg-white px-10 pt-2 shadow">
        <div className="w-full max-w-[1280px]">
          <div className="mb-4 flex justify-end">
            <ul className="flex w-full justify-end text-xs">
              <li>
                <Link href="#">고객센터</Link>
              </li>
              <li className="ml-6">
                <Link href="#">마이페이지</Link>
              </li>
              <li className="ml-6">
                <Link href="/interest">관심</Link>
              </li>
              <li className="ml-6">
                <Link href="#">알림</Link>
              </li>
              <li className="ml-6">{session ? <LogOutButton /> : <Link href={'/login'}>로그인</Link>}</li>
            </ul>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              <Link href="/" scroll={false}>
                TrendRoom
              </Link>
            </h1>
            <ul className="flex items-center text-lg">
              <li className="mr-10">
                <Link href="#">HOME</Link>
              </li>
              <li className="mr-10">
                <Link href="#">STYLE</Link>
              </li>
              <li className="mr-10">
                <Link href="#">SHOP</Link>
              </li>
              <li className="mr-10 flex items-center">
                <SearchModal products={products} />
              </li>
              <li className="flex items-center">
                <CartWrapper>
                  <InCartBtn />
                </CartWrapper>
              </li>
            </ul>
          </div>
          <CategoriesList categories={categories} />
        </div>
      </header>
      <div className="h-24" />
    </>
  );
}
