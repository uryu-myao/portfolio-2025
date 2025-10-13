import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import LoadingScreen from '@/components/LoadingScreen';
import GlobalPasswordGate from '@/components/GlobalPasswordGate';

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [checkingUnlock, setCheckingUnlock] = useState(true);
  // ▼ TEST: ACTIVATE for testing loading screen
  // const isLoading = true;
  // ▲ down to here ▲
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ▼ TEST: COMMENT OUT for testing password gate
    const unlocked = localStorage.getItem('global-unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    // ▲ down to here ▲
    setCheckingUnlock(false);
  }, []);

  if (checkingUnlock) return null;
  if (!isUnlocked) {
    return <GlobalPasswordGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <ThemeProvider>
      <Router>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <div className={`app-content ${isLoading ? 'invisible' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
