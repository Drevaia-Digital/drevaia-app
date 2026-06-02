import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AuthProvider } from '@/hooks/useAuth';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AppRoutes } from '@/app/router/routes';
import { RouteLoader } from '@/components/motion/RouteLoader';

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

  const [loadingRoute] = useState(false);

  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>

          {/* 🔥 TRACKER */}
          <TrackPageViews />
          <RouteLoader loading={loadingRoute} />

          {/* 🌌 CINEMATIC APP SHELL */}
          <MainLayout>
            <AppRoutes />
          </MainLayout>

        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}