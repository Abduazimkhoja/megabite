import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="py-3 px-5 bg-blue-400 flex items-center justify-between">
      Logo
      <span className="text-white">Корзина</span>
    </header>
  );
};

export default Header;
