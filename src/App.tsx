import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';

import Home from '@/pages/Home';
import Photos from '@/pages/Photos';
import NotFound from '@/pages/NotFound';
import LoadingScreen from '@/components/LoadingScreen';

const App = () => {
  // const isLoading = true; // Uncomment this line to simulate loading state
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <LoadingScreen onComplete={() => setIsLoading(false)} />
  ) : (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
