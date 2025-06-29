import { Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';
import Photos from '@/pages/Photos';
import NotFound from '@/pages/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/photos" element={<Photos />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
