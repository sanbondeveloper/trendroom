import React, { useEffect, useState } from 'react';
import { ellipsisText, getRecentSearches, setRecentSearches } from '@/app/lib/util';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function RecentSearch() {
  const [recentSearches, _setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    _setRecentSearches(getRecentSearches());
  }, []);

  return (
    <>
      <div className="mb-2 mt-3 flex gap-1">
        <h2 className="text-base font-bold">최근 검색어</h2>
        <button
          type="button"
          aria-label="최근 검색어 모두 지우기"
          className="pt-1 text-xs underline"
          onClick={() => {
            _setRecentSearches([]);
            setRecentSearches([]);
          }}
        >
          지우기
        </button>
      </div>

      <ul className="flex gap-2">
        {recentSearches.map((search) => (
          <li
            key={search}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-2xl border px-3 py-1 text-sm"
          >
            <div className="pb-1 text-gray-600">
              <Link href={`/?query=${search}`}>{ellipsisText(search)}</Link>
            </div>
            <button
              type="button"
              aria-label="최근 검색어 지우기"
              className="h-fit w-fit"
              onClick={() => {
                _setRecentSearches(recentSearches.filter((target) => target !== search));
                setRecentSearches(recentSearches.filter((target) => target !== search));
              }}
            >
              <XMarkIcon className="w-3" />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
