import { FC } from 'react';
import Navigation from '../ui/Navigation';

const Sidebar: FC = () => {
  return (
    <aside className="p-5 border-r min-w-44">
      <Navigation />
    </aside>
  );
};

export default Sidebar;
