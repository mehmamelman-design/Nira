import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadAppCriticalImages } from './lib/imagePreloader';

// Immediately initiate background preloading of critical category and banner images
preloadAppCriticalImages();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
