import { FC, JSX } from 'react';

type Props = {} & JSX.IntrinsicElements['ul'];

const GridList: FC<Props> = ({ children, className = '', ...rest }) => {
  return (
    <ul
      className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 ${className}`}
      {...rest}
    >
      {children}
    </ul>
  );
};

export default GridList;
