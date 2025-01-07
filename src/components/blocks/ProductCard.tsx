import { TResponseItem } from '@/app/(container)/(app)/PageContent';
import { useAppDispatch, useAppSelector } from '@/store/reduxHooks';
import { changeCartQuantity, setCart } from '@/store/slices/cart.slice';
import Image from 'next/image';
import { FC, JSX } from 'react';
import Button from '../ui/Button';

type Props = {
  product: TResponseItem;
} & JSX.IntrinsicElements['li'];

const ProductCard: FC<Props> = ({
  product,
  children,
  className = '',
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const itemExist = useAppSelector((state) =>
    state?.cart?.items?.find(({ id }) => id === product?.id),
  );

  if (!product) return;

  return (
    <li
      className={`flex flex-col overflow-hidden border rounded-xl h-72 ${className}`}
      {...rest}
    >
      <div className="w-full h-[50%] border-b overflow-hidden">
        <Image
          src={product?.image || ''}
          width={300}
          height={150}
          alt={product?.name || ''}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <h3 className="text-sm font-semibold line-clamp-2">{product?.name}</h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {product?.description}
        </p>
      </div>
      {!itemExist ? (
        <button
          onClick={() => dispatch(setCart(product))}
          className="p-2 text-center w-full border-t"
        >
          В корзину
        </button>
      ) : (
        <div className="p-2 text-center w-full border-t flex gap-4 justify-center items-center">
          <Button
            onClick={() =>
              dispatch(changeCartQuantity({ id: product?.id, type: 'minus' }))
            }
          >
            -
          </Button>
          {itemExist?.quantity}
          <Button
            onClick={() =>
              dispatch(changeCartQuantity({ id: product?.id, type: 'plus' }))
            }
          >
            +
          </Button>
        </div>
      )}
    </li>
  );
};

export default ProductCard;
