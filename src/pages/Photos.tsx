import { useTheme } from '@/hooks/useTheme';
import Nav from '@/components/Nav';
import '@/styles/components/photos.scss';

const Photos: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <main>
      <Nav onToggleTheme={toggleTheme} />

      <p>Photos</p>
    </main>
  );
};

export default Photos;
