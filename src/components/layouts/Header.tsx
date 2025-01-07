import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="py-3 px-5 bg-blue-400 flex items-center justify-between">
      Logo
      <Link href='/cart' className="text-white">Корзина</Link>
    </header>
  );
};

export default Header;
