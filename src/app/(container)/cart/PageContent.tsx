'use client';
import GridList from '@/components/blocks/GridList';
import ProductCard from '@/components/blocks/ProductCard';
import ContentHeader from '@/components/layouts/ContentHeader';
import { useAppSelector } from '@/store/reduxHooks';
import {
  TGetAllProductsResponse,
  TProductsItem,
} from '@/store/services/products/type';
import { FC } from 'react';

export const PAGE_PATH = '/cart';
export const PAGE_NAME = 'cart';
export type TResponse = TGetAllProductsResponse | undefined;
export type TResponseItem = TProductsItem | undefined;
export type TColumnType = TProductsItem;

type Props = {};

const Content: FC<Props> = () => {
  const cartItems = useAppSelector((state) => state?.cart?.items);

  return (
    <>
      <ContentHeader className="mb-5" pageName={PAGE_NAME}></ContentHeader>
      <GridList>
        {cartItems?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </GridList>
    </>
  );
};

export default Content;
