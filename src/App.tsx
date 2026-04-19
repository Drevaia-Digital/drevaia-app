import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from '@/hooks/useAuth';

// 📄 Pages
import OnboardingPage from "@/pages/OnboardingPage";
import { HomePage } from '@/pages/HomePage';
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import BlogPost from "@/pages/BlogPost";
import LeadMagnetPage from "@/pages/LeadMagnetPage";
import LandingPage from "@/pages/LandingPage";

// ⚡ Lazy
const LibraryPage = lazy(() => import('@/pages/LibraryPage'));

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>

            {/* 🏠 HOME */}
            <Route path="/" element={<HomePage />} />

            {/* 🌟 LANDING */}
            <Route path="/landing" element={<LandingPage />} />

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
            <Route
              path="/blog"
              element={
                <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Blog Drevaia</h1>
                    <p className="text-gray-400">Muy pronto encontrarás contenido aquí.</p>
                  </div>
                </div>
              }
            />

            {/* ⚖️ LEGAL */}
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/legal/:section" element={<LegalPage />} />

            {/* 🌐 PORTAL */}
            <Route
              path="/portal"
              element={
                <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Portal en construcción</h1>
                    <p className="text-gray-400">Este espacio estará disponible próximamente.</p>
                  </div>
                </div>
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