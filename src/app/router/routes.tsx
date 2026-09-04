import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import OnboardingPage from '@/pages/OnboardingPage';
import { PortalPage } from '@/pages/PortalPage';
import HomePage from '@/pages/HomePage';
import { EbookPage } from '@/pages/EbookPage';
import { BookDetailPage } from '@/pages/BookDetailPage';
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import BlogPost from '@/pages/BlogPost';
import LeadMagnetPage from '@/pages/LeadMagnetPage';
import BlogIndexPage from '@/pages/BlogIndexPage';
import GalleryPage from '@/pages/gallery/GalleryPage';
import GalleryDetailPage from '@/pages/gallery/GalleryDetailPage';
const AIStudioPage = lazy(() => import("@/pages/AIStudioPage"));
const AIStudioHistoryPage = lazy(
  () => import("@/pages/AIStudioHistoryPage"),
);

import { useLanguage } from "@/context/LanguageContext";
import { PageLoader } from '@/components/motion/PageLoader';
import AuthCallbackPage from '@/pages/AuthCallbackPage';

const LibraryPage = lazy(() => import('@/pages/LibraryPage'));

export function AppRoutes() {
  const { language } = useLanguage();

  return (
    <Routes>

      {/* 🏠 HOME */}
      
  <Route
  path="/auth/callback"
  element={<AuthCallbackPage />}
/>

<Route
  path="/:lang/auth/callback"
  element={<AuthCallbackPage />}
/>

  <Route
  path="/"
  element={
    <Navigate
      to={`/${language}`}
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
      <Route
        path="/no-se-que-hacer-con-mi-vida"
        element={<EbookPage />}
      />

      <Route
        path="/ebook"
        element={<EbookPage />}
      />

      {/* 📚 LIBRARY */}
      <Route
        path="/library"
        element={
          <Suspense fallback={<PageLoader />}>
            <LibraryPage />
          </Suspense>
        }
      />
      
<Route
  path="/:lang/library"
  element={
    <Suspense fallback={<PageLoader />}>
      <LibraryPage />
    </Suspense>
  }
/>

<Route
  path="/:lang/books/:slug"
  element={<BookDetailPage />}
/>

      {/* 🖼️ GALLERY */}
<Route
  path="/gallery"
  element={<GalleryPage />}
/>

<Route
  path="/gallery/:id"
  element={<GalleryDetailPage />}
/>

      {/* 🔥 BLOG */}
      <Route path="/:lang/blog/:slug" element={<BlogPost />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/:lang/blog" element={<BlogIndexPage />} />

      {/* 🧠 ONBOARDING */}
      <Route path="/:lang/onboarding" element={<OnboardingPage />} />

      {/* ⚖️ LEGAL */}
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/legal/:section" element={<LegalPage />} />
      <Route path="/:lang/legal" element={<LegalPage />} />
      <Route path="/:lang/legal/:section" element={<LegalPage />} />

            {/* 🌐 PORTAL */}
      <Route path="/portal" element={<PortalPage />} />
      <Route path="/:lang/portal" element={<PortalPage />} />

      {/* 🤖 AI STUDIO */}
      <Route
  path="/studio"
  element={
    <Suspense fallback={<PageLoader />}>
      <AIStudioPage />
    </Suspense>
  }
/>

<Route
  path="/:lang/studio"
  element={
    <Suspense fallback={<PageLoader />}>
      <AIStudioPage />
    </Suspense>
  }
/>

<Route
  path="/studio/history"
  element={
    <Suspense fallback={<PageLoader />}>
      <AIStudioHistoryPage />
    </Suspense>
  }
/>

<Route
  path="/:lang/studio/history"
  element={
    <Suspense fallback={<PageLoader />}>
      <AIStudioHistoryPage />
    </Suspense>
  }
/>
      {/* 🔐 AUTH */}
      <Route path="/auth/login" element={<AuthPage mode="login" />} />
      <Route path="/auth/register" element={<AuthPage mode="register" />} />
      <Route path="/auth/forgot-password" element={<AuthPage mode="forgot-password" />} />
      <Route path="/:lang/auth/login" element={<AuthPage mode="login" />} />
      <Route path="/:lang/auth/register" element={<AuthPage mode="register" />} />
      <Route path="/:lang/auth/forgot-password" element={<AuthPage mode="forgot-password" />} />

      {/* 🎯 LEAD */}
      <Route path="/empieza" element={<LeadMagnetPage />} />
      <Route path="/:lang/empieza" element={<LeadMagnetPage />} />

      {/* 🚫 404 */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}