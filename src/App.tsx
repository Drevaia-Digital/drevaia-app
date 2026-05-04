import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AuthProvider } from '@/hooks/useAuth';

// 📄 Pages
import OnboardingPage from "@/pages/OnboardingPage";
import { PortalPage } from '@/pages/PortalPage';
import HomePage from '@/pages/HomePage';
import { EbookPage } from '@/pages/EbookPage';
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import BlogPost from "@/pages/BlogPost";
import LeadMagnetPage from "@/pages/LeadMagnetPage";
import BlogIndexPage from "@/pages/BlogIndexPage";

// ⚡ Lazy
const LibraryPage = lazy(() => import('@/pages/LibraryPage'));


// 🔥 TRACKING SPA (Google Analytics)
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag("event", "page_view", {
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

          {/* 🔥 TRACKER */}
          <TrackPageViews />

          <Routes>

            {/* 🏠 HOME */}
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    navigator.language.startsWith("fr")
                      ? "/fr"
                      : navigator.language.startsWith("pt")
                      ? "/pt"
                      : navigator.language.startsWith("en")
                      ? "/en"
                      : "/es"
                  }
                  replace
                />
              }
            />

            <Route path="/es" element={<HomePage />} />
            <Route path="/en" element={<HomePage />} />
            <Route path="/fr" element={<HomePage />} />
            <Route path="/pt" element={<HomePage />} />

            {/* 🌟 LANDING */}
            <Route path="/landing" element={<Navigate to="/" />} />

            {/* 📘 EBOOK */}
            <Route path="/no-se-que-hacer-con-mi-vida" element={<EbookPage />} />
            <Route path="/ebook" element={<EbookPage />} />

            {/* 📚 LIBRARY */}
            <Route
              path="/library"
              element={
                <Suspense fallback={<div className="text-white p-10">Cargando...</div>}>
                  <LibraryPage />
                </Suspense>
              }
            />

            {/* 🔥 BLOG */}
            <Route path="/:lang/blog/:slug" element={<BlogPost />} />
            <Route path="/blog" element={<BlogIndexPage />} />

            {/* 🧠 ONBOARDING */}
            <Route path="/:lang/onboarding" element={<OnboardingPage />} />

            {/* ⚖️ LEGAL */}
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/:section" element={<LegalPage />} />

            {/* 🌐 PORTAL */}
            <Route path="/portal" element={<PortalPage />} />

            {/* 🔐 AUTH */}
            <Route path="/auth/login" element={<AuthPage mode="login" />} />
            <Route path="/auth/register" element={<AuthPage mode="register" />} />
            <Route path="/auth/forgot-password" element={<AuthPage mode="forgot-password" />} />

            <Route path="/:lang/auth/login" element={<AuthPage mode="login" />} />
            <Route path="/:lang/auth/register" element={<AuthPage mode="register" />} />
            <Route path="/:lang/auth/forgot-password" element={<AuthPage mode="forgot-password" />} />

            {/* 🎯 LEAD */}
            <Route path="/empieza" element={<LeadMagnetPage />} />

            {/* 🚫 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}