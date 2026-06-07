import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { AuthProvider } from '@/hooks/useAuth';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AppRoutes } from '@/app/router/routes';
import { ScrollToTop } from '@/components/ScrollToTop'; // ← AGREGA ESTO

// 🔥 TRACKING SPA (Google Analytics)
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          {/* 🔥 SCROLL TO TOP */}
          <ScrollToTop /> {/* ← AGREGA ESTO */}

          {/* 🔥 TRACKER */}
          <TrackPageViews />

          {/* 🌌 CINEMATIC APP SHELL */}
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}