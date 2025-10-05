import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App.tsx';
import '@primer/react-brand/lib/css/main.css';
import '@primer/react-brand/fonts/fonts.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
