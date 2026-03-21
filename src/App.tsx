import ScrollToTop from "./ScrollToTop"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { AuthProvider } from '@/hooks/useAuth';

// Pages
import { HomePage } from '@/pages/HomePage';
import { LibraryPage } from '@/pages/LibraryPage';
import { BookDetailPage } from '@/pages/BookDetailPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { PortalPage } from '@/pages/PortalPage';
import { LegalPage } from '@/pages/LegalPage';
import { AuthPage } from '@/pages/AuthPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { CheckoutSuccessPage } from '@/pages/CheckoutSuccessPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Components
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';

import './App.css';

function App() {
  const { language, t, changeLanguage } = useLanguage();
  const { mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <OfflineIndicator />
        <PWAInstallPrompt />

        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          <Route 
            path="/library" 
            element={
              <LibraryPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          {/* 🔥 NUEVA RUTA PARA eBooks */}
          <Route 
            path="/ebooks" 
            element={
              <LibraryPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          <Route 
            path="/books/:slug" 
            element={
              <BookDetailPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          <Route 
            path="/blog" 
            element={
              <BlogPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          <Route 
            path="/blog/:slug" 
            element={
              <BlogPostPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          <Route 
            path="/portal" 
            element={
              <PortalPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          <Route 
            path="/legal/:section" 
            element={
              <LegalPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />

          {/* Auth */}
          <Route 
            path="/auth/login" 
            element={
              <AuthPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage}
                mode="login"
              />
            } 
          />

          <Route 
            path="/auth/register" 
            element={
              <AuthPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage}
                mode="register"
              />
            } 
          />

          <Route 
            path="/auth/forgot-password" 
            element={
              <AuthPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage}
                mode="forgot-password"
              />
            } 
          />

          {/* Profile */}
          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage}
              />
            } 
          />

          {/* Checkout */}
          <Route 
            path="/checkout/success" 
            element={
              <CheckoutSuccessPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage}
              />
            } 
          />

          {/* ❗ SIEMPRE LA ÚLTIMA */}
          <Route 
            path="*" 
            element={
              <NotFoundPage 
                t={t} 
                language={language} 
                changeLanguage={changeLanguage} 
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;