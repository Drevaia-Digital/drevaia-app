import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { lazy, Suspense } from 'react';

const LibraryPage = lazy(() => import('./pages/LibraryPage'));
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage';
import { AuthProvider } from '@/hooks/useAuth';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {

  const language = "es";
  const t = {} as any;
  const changeLanguage = () => {};

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🏠 Home */}
<Route path="/" element={<HomePage />} />

{/* 📚 Library */}
<Route
  path="/library"
  element={
    <Suspense fallback={<div className="text-white p-10">Cargando...</div>}>
      <LibraryPage />
    </Suspense>
  }
/>

          {/* ⚖️ Legal */}
          <Route
            path="/legal"
            element={
              <LegalPage
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

          {/* 📝 Blog (placeholder para evitar 404) */}
          <Route
            path="/blog"
            element={
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Blog en construcción</h1>
                <p>Muy pronto encontrarás contenido aquí.</p>
              </div>
            }
          />

          {/* 🌐 Portal (placeholder) */}
          <Route
            path="/portal"
            element={
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Portal en construcción</h1>
                <p>Este espacio estará disponible próximamente.</p>
              </div>
            }
          />

          {/* 🔐 Auth */}
          <Route
            path="/auth/login"
            element={
              <AuthPage
                mode="login"
                t={t}
                language={language}
                changeLanguage={changeLanguage}
              />
            }
          />

          <Route
            path="/auth/register"
            element={
              <AuthPage
                mode="register"
                t={t}
                language={language}
                changeLanguage={changeLanguage}
              />
            }
          />

          <Route
            path="/auth/forgot-password"
            element={
              <AuthPage
                mode="forgot-password"
                t={t}
                language={language}
                changeLanguage={changeLanguage}
              />
            }
          />

          {/* 🚫 404 */}
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