'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, JSX } from 'react';

type Props = {} & LinkProps & JSX.IntrinsicElements['a'];

const NavLink: FC<Props> = ({ children, className = '', href, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${isActive ? 'text-blue-300' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavLink;
