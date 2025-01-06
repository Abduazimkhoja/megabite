import { FC } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </main>
    </>
  );
};

export default BaseLayout;
