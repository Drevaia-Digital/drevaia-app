import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

// 🔥 GOOGLE ANALYTICS
const GA_ID = "G-4SZZ386T00";

if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];

  type GtagFunction = (...args: any[]) => void;

  const gtag: GtagFunction = (...args) => {
    (window as any).dataLayer.push(args);
  };

  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, {
    page_path: window.location.pathname,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);