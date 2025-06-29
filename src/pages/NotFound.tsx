import Nav from '@/components/Nav';
import { useTheme } from '@/hooks/useTheme';

const NotFound: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <main className="notfound">
      <Nav onToggleTheme={toggleTheme} />
      <div className="notfound-content">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/">← Back to Home</a>
      </div>
    </main>
  );
};

export default NotFound;
