import { useTheme } from '@/hooks/useTheme';
import Nav from '@/components/Nav';
import ScrambleText from '@/components/ScrambleText';
import '@/styles/components/notfound.scss';

const NotFound: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <main className="notfound">
      <Nav onToggleTheme={toggleTheme} />
      <div className="notfound-inner">
        <div>
          <h1 className="notfound-ttl text-en">
            <ScrambleText text="404 Page Not Found" />
          </h1>
          <p className="text-en">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a className="text-en" href="/">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
