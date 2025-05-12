import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages
import Home from '@/pages/Home';
import Photos from '@/pages/Photos';
import NotFound from '@/pages/NotFound';
// Components
import LoadingScreen from '@/components/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <LoadingScreen onComplete={() => setIsLoading(false)} />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
