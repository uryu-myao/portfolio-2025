import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import LoadingScreen from '@/components/LoadingScreen';

const App = () => {
  // const isLoading = true; // Uncomment this line to simulate loading state
  const [isLoading, setIsLoading] = useState(true);

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
