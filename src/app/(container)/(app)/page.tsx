import { FC } from 'react';
import Content from './PageContent';

type Props = {
  params: {};
  searchParams: Record<string, string | string[] | undefined>;
};

const Page: FC<Props> = async ({ params, searchParams }) => {
  return <Content />;
};

export default Page;
