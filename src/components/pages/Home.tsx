import { FC } from 'react';
import { TableColumn } from '../ui/Table';

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

type Props = {};

const HomePage: FC<Props> = () => {
  const productCOlumns: TableColumn<(typeof productList)[number]> = [
    { dataIndex: '' },
  ];

  return;
};

export default HomePage;
