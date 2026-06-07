// Cargar PostHog vía script tag (como Google Analytics)
// No agrega nada al bundle de JavaScript

export function loadPostHog() {
  if (typeof window === 'undefined') return;
  if ((window as any).posthog) return; // Evitar doble carga

  const POSTHOG_KEY = 'phc_mzCpnNat2hWi3syZRPCqnN3EWvem8tbUKsVSPuj3QhKK';
  const POSTHOG_HOST = 'https://us.i.posthog.com';

  // Cargar el script de PostHog
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = POSTHOG_HOST.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
  
  // Una vez cargado, inicializar
  script.onload = () => {
    (window as any).posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      session_recording: {
        recordCrossOriginIframes: true,
      },
      capture_pageview: true,
      capture_pageleave: true,
    });
  };

  document.head.appendChild(script);
}

// Cargar después de 3 segundos O al interactuar
let loaded = false;
const load = () => {
  if (loaded) return;
  loaded = true;
  loadPostHog();
};

setTimeout(load, 3000);
window.addEventListener('scroll', load, { once: true });
window.addEventListener('click', load, { once: true });