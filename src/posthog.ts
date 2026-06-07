import posthog from 'posthog-js';

let posthogInitialized = false;

// Inicialización diferida (lazy loading)
function initPostHog() {
  if (posthogInitialized) return;
  posthogInitialized = true;
  
  posthog.init('phc_mzCpnNat2hWi3syZRPCqnN3EWvem8tbUKsVSPuj3QhKK', {
    api_host: 'https://app.posthog.com',
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      recordCrossOriginIframes: true,
    },
    opt_out_capturing_by_default: false,
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') {
        posthog.debug();
      }
    },
  });
}

// Cargar PostHog después de 3 segundos O al hacer scroll
setTimeout(() => {
  import('posthog-js').then(() => {
    initPostHog();
  });
}, 3000);

// O al primer scroll/click
const initOnInteraction = () => {
  if (!posthogInitialized) {
    import('posthog-js').then(() => {
      initPostHog();
    });
  }
  window.removeEventListener('scroll', initOnInteraction);
  window.removeEventListener('click', initOnInteraction);
  window.removeEventListener('keydown', initOnInteraction);
};

window.addEventListener('scroll', initOnInteraction, { once: true });
window.addEventListener('click', initOnInteraction, { once: true });
window.addEventListener('keydown', initOnInteraction, { once: true });

export default posthog;