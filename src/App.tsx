import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from '@/hooks/useAuth';

// 📄 Pages
import OnboardingPage from "@/pages/OnboardingPage";
import { PortalPage } from '@/pages/PortalPage';
import { HomePage } from '@/pages/HomePage';
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import BlogPost from "@/pages/BlogPost";
import LeadMagnetPage from "@/pages/LeadMagnetPage";
import BlogIndexPage from "@/pages/BlogIndexPage";

// ⚡ Lazy
const LibraryPage = lazy(() => import('@/pages/LibraryPage'));

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>

            {/* 🏠 HOME */}
<Route path="/" element={<Navigate to="/es" replace />} />

<Route path="/es" element={<HomePage />} />
<Route path="/en" element={<HomePage />} />
<Route path="/fr" element={<HomePage />} />
<Route path="/pt" element={<HomePage />} />

            {/* 🌟 LANDING */}
            <Route path="/landing" element={<Navigate to="/" />} />

            {/* 📚 LIBRARY */}
            <Route
              path="/library"
              element={
                <Suspense fallback={<div className="text-white p-10">Cargando...</div>}>
                  <LibraryPage />
                </Suspense>
              }
            />

            {/* 🔥 BLOG MULTI IDIOMA */}
            <Route path="/:lang/blog/:slug" element={<BlogPost />} />

            {/* 🧠 ONBOARDING */}
            <Route path="/:lang/onboarding" element={<OnboardingPage />} />

            {/* 📝 BLOG ROOT */}
<Route path="/blog" element={<BlogIndexPage />} />

            {/* ⚖️ LEGAL */}
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/:section" element={<LegalPage />} />

            {/* 🌐 PORTAL */}
            <Route
  path="/portal"
  element={
    <PortalPage />
  }
/>

            {/* 🔐 AUTH */}
            <Route path="/auth/login" element={<AuthPage mode="login" />} />
            <Route path="/auth/register" element={<AuthPage mode="register" />} />
            <Route path="/auth/forgot-password" element={<AuthPage mode="forgot-password" />} />

            {/* 🎯 LEAD MAGNET */}
            <Route path="/empieza" element={<LeadMagnetPage />} />

            {/* 🚫 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  );
}