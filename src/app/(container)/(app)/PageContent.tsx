'use client';
import GridList from '@/components/blocks/GridList';
import ProductCard from '@/components/blocks/ProductCard';
import ContentHeader from '@/components/layouts/ContentHeader';
import { useGetAllProductsQuery } from '@/store/services/products/api';
import {
  TGetAllProductsResponse,
  TProductsItem,
} from '@/store/services/products/type';
import { FC } from 'react';

export const PAGE_PATH = '/home';
export const PAGE_NAME = 'home';
export type TResponse = TGetAllProductsResponse | undefined;
export type TResponseItem = TProductsItem | undefined;
export type TColumnType = TProductsItem;

type Props = {};

const Content: FC<Props> = () => {
  const getAll = useGetAllProductsQuery();

  return (
    <>
      <ContentHeader className="mb-5" pageName={PAGE_NAME}></ContentHeader>
      <GridList>
        {getAll?.data?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </GridList>
    </>
  );
};

export default Content;
