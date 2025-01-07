'use client';
import { useAppSelector } from '@/store/reduxHooks';
import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  const cartItemCount = useAppSelector((state) => state?.cart?.items?.length);

  return (
    <header className="py-3 px-5 bg-blue-400 flex items-center justify-between">
      Logo
      {cartItemCount && (
        <Link href="/cart" className="text-white">
          Корзина {cartItemCount}
        </Link>
      )}
    </header>
  );
};

export default Header;
