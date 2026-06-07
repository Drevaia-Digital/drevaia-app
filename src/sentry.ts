import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  
  // Captura el 100% de las transacciones para tracing
  tracesSampleRate: 1.0,
  
  // Environment
  environment: import.meta.env.MODE || 'development',
});