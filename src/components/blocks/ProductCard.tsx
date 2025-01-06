import { TResponseItem } from '@/app/(container)/cart/PageContent';
import Image from 'next/image';
import { FC, JSX } from 'react';

type Props = {
  product: TResponseItem;
} & JSX.IntrinsicElements['li'];

const ProductCard: FC<Props> = ({
  product,
  children,
  className = '',
  ...rest
}) => {
  return (
    <li
      className={`flex flex-col overflow-hidden border rounded-xl h-72 ${className}`}
      {...rest}
    >
      <div className="w-full h-[50%] border-b overflow-hidden">
        <Image
          src={'https://picsum.photos/300/200'}
          width={300}
          height={150}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-xs text-gray-600">{product.name}</p>
      </div>
      <button className="p-2 text-center w-full border-t">В корзину</button>
    </li>
  );
};

export default ProductCard;
