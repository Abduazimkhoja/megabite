import ContentHeader from '@/components/layouts/ContentHeader';
import Button from '@/components/ui/Button';
import { FC } from 'react';
import PageTable from './PageTable';

const productList = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Footwear' },
  { id: 3, name: 'Accessories' },
  { id: 4, name: 'Computers' },
  { id: 5, name: 'Fashion' },
  { id: 6, name: 'Electronics' },
  { id: 7, name: 'Vehicles' },
  { id: 8, name: 'Bags' },
  { id: 9, name: 'Photography' },
  { id: 10, name: 'Kitchen' },
];

export const PAGE_PATH = '/categories';
export const PAGE_NAME = 'categories';
export type TResponse = typeof productList | undefined;
export type TColumnType = (typeof productList)[number];

type Props = {};

const Content: FC<Props> = () => {
  return (
    <>
      <ContentHeader className="mb-5" pageName={PAGE_NAME}>
        <Button>Добавить</Button>
      </ContentHeader>
      <PageTable response={productList} />
    </>
  );
};

export default Content;
