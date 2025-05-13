import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// Global styles
import '@/styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
