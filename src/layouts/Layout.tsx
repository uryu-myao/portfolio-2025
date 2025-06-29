import { Outlet } from 'react-router-dom';
import Nav from '@/components/Nav';
import { useTheme } from '@/hooks/useTheme';

const Layout: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <Nav onToggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
};

export default Layout;
