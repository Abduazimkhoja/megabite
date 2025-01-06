import GridList from '@/components/blocks/GridList';
import ProductCard from '@/components/blocks/ProductCard';
import ContentHeader from '@/components/layouts/ContentHeader';
import { FC } from 'react';

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

export const PAGE_PATH = '/home';
export const PAGE_NAME = 'home';
export type TResponse = typeof productList | undefined;
export type TResponseItem = (typeof productList)[number];

type Props = {};

const Content: FC<Props> = () => {
  return (
    <>
      <ContentHeader className="mb-5" pageName={PAGE_NAME}></ContentHeader>
      <GridList>
        {productList?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </GridList>
    </>
  );
};

export default Content;
