import posthog from 'posthog-js';
import 'posthog-js/dist/recorder';

// Inicializar PostHog
posthog.init('phc_mzCpnNat2hWi3syZRPCqnN3EWvem8tbUKsVSPuj3QhKK', {
  api_host: 'https://app.posthog.com',
  
  // Configurar sesión
  autocapture: true,
  capture_pageview: true,
  capture_pageleave: true,
  
  // Session replay (grabaciones de sesiones)
  session_recording: {
    recordCrossOriginIframes: true,
  },
  
  // Opt-out de tracking
  opt_out_capturing_by_default: false,
  
  // Environment
  loaded: (posthog) => {
    if (import.meta.env.MODE === 'development') {
      posthog.debug();
    }
  },
});

export default posthog;