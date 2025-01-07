'use client';
import ContentHeader from '@/components/layouts/ContentHeader';
import { useGetAllProductsQuery } from '@/store/services/products/api';
import {
  TGetAllProductsResponse,
  TProductsItem,
} from '@/store/services/products/type';
import { FC } from 'react';
import PageForm from './PageForm';
import PageTable from './PageTable';

export const PAGE_PATH = '/products';
export const PAGE_NAME = 'products';
export type TResponse = TGetAllProductsResponse | undefined;
export type TResponseItem = TProductsItem | undefined;
export type TColumnType = TProductsItem;

type Props = {};

const Content: FC<Props> = () => {
  const getAll = useGetAllProductsQuery();

  return (
    <>
      <ContentHeader className="mb-5" pageName={PAGE_NAME}>
        <PageForm />
      </ContentHeader>
      <PageTable response={getAll?.data} />
    </>
  );
};

export default Content;
