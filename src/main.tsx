import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

// 🔥 LIMPIEZA DE SERVICE WORKERS (CRÍTICO)
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
}

// 🔥 GOOGLE ANALYTICS (PRODUCCIÓN)
const GA_ID = "G-4SZZ386T00";

function initGA() {
  if (typeof window === "undefined") return;

  // Evitar doble carga
  if ((window as any).gtag) return;

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
    send_page_view: false,
  });
}

initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);