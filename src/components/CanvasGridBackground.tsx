import { useEffect, useState } from 'react';
import CanvasGridBackgroundLight from './CanvasGridBackgroundLight';
import CanvasGridBackgroundDark from './CanvasGridBackgroundDark';

const CanvasGridBackground = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      const current =
        document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current as 'light' | 'dark');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return theme === 'dark' ? (
    <CanvasGridBackgroundDark />
  ) : (
    <CanvasGridBackgroundLight />
  );
};

export default CanvasGridBackground;
