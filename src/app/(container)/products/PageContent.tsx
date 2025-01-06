import ContentHeader from '@/components/layouts/ContentHeader';
import Button from '@/components/ui/Button';
import { FC } from 'react';
import PageTable from './PageTable';

const productList = [
  { id: 1, name: 'Smartphone X', category: 'Electronics' },
  { id: 2, name: 'Running Shoes', category: 'Footwear' },
  { id: 3, name: 'Wireless Headphones', category: 'Accessories' },
  { id: 4, name: 'Gaming Laptop', category: 'Computers' },
  { id: 5, name: 'Leather Wallet', category: 'Fashion' },
  { id: 6, name: 'LED TV', category: 'Electronics' },
  { id: 7, name: 'Electric Scooter', category: 'Vehicles' },
  { id: 8, name: 'Backpack Pro', category: 'Bags' },
  { id: 9, name: 'Digital Camera', category: 'Photography' },
  { id: 10, name: 'Blender 3000', category: 'Kitchen' },
];

export const PAGE_PATH = '/products';
export const PAGE_NAME = 'products';
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
