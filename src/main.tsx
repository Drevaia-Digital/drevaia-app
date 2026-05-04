import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

// 🔥 GOOGLE ANALYTICS (PRODUCCIÓN)
const GA_ID = "G-4SZZ386T00";

function initGA() {
  if (typeof window === "undefined") return;

  // Evitar doble carga
  if ((window as any).gtag) return;

  // Script oficial GA
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // DataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];

  // Tipado flexible
  type GtagFunction = (...args: any[]) => void;

  const gtag: GtagFunction = (...args) => {
    (window as any).dataLayer.push(args);
  };

  (window as any).gtag = gtag;

  // Init
  gtag('js', new Date());

  // ⚠️ IMPORTANTE: desactivar auto page_view (SPA)
  gtag('config', GA_ID, {
    send_page_view: false,
  });
}

// 🔥 Inicializar GA
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);