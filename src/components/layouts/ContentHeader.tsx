import Link from 'next/link';
import { FC, JSX } from 'react';
import { headersData, PagesPaths } from './headers.data';

type Props = {
  pageName: PagesPaths[number];
  addBtn?: boolean;
} & JSX.IntrinsicElements['div'];

const ContentHeader: FC<Props> = ({
  pageName,
  className = '',
  children,
  addBtn = false,
  ...rest
}) => {
  const { title, subtitle, addButtonLabel } = headersData[pageName];

  return (
    <div className={`flex justify-between items-center ${className}`} {...rest}>
      <div className="flex flex-col">
        <h1 className=" text-[24px] font-[500]">{title}</h1>
        <h2 className="text-[#687588] pt-[8px]">{subtitle}</h2>
      </div>
      {addBtn && (
        <Link className="btn" href={`/${pageName}/add`}>
          + {addButtonLabel}
        </Link>
      )}
      {children}
    </div>
  );
};

export default ContentHeader;
