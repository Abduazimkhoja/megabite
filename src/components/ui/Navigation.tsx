import Link from 'next/link';
import { FC, JSX } from 'react';

const navigateItems = [
  { label: 'Главное', link: '/' },
  { label: 'Продукты', link: '/products' },
  { label: 'Категории', link: '/categories' },
  { label: 'Корзина', link: '/cart' },
  { label: 'Not found page', link: '/test' },
];

type Props = {} & Omit<JSX.IntrinsicElements['ul'], 'children'>;

const Navigation: FC<Props> = ({ className = '', ...rest }) => {
  return (
    <nav>
      <ul className={`${className}`} {...rest}>
        {navigateItems?.map(({ label, link }) => {
          return (
            <li key={link}>
              <Link href={link}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
