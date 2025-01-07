'use client';
import ContentHeader from '@/components/layouts/ContentHeader';

import { useGetAllCategoriesQuery } from '@/store/services/categories/api';
import {
  TCategoriesItem,
  TGetAllCategoriesResponse,
} from '@/store/services/categories/type';
import { FC } from 'react';
import PageForm from './PageForm';
import PageTable from './PageTable';

export const PAGE_PATH = '/categories';
export const PAGE_NAME = 'categories';
export type TResponse = TGetAllCategoriesResponse | undefined;
export type TResponseItem = TCategoriesItem | undefined;
export type TColumnType = TCategoriesItem;

type Props = {};

const Content: FC<Props> = () => {
  const getAllCategories = useGetAllCategoriesQuery();

  return (
    <>
      <ContentHeader className="mb-5" pageName={PAGE_NAME}>
        <PageForm />
      </ContentHeader>
      <PageTable response={getAllCategories?.data} />
    </>
  );
};

export default Content;
