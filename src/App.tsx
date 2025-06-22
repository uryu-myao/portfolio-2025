import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Home from '@/pages/Home';
import Photos from '@/pages/Photos';
import NotFound from '@/pages/NotFound';
// Components
import LoadingScreen from '@/components/Loading';

const App = () => {
  // test LoadingScreen
  // return <LoadingScreen onComplete={() => {}} />;

  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return isLoading ? (
    <LoadingScreen onComplete={() => setIsLoading(false)} />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
