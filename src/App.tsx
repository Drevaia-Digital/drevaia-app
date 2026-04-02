import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { lazy, Suspense } from 'react';
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage';
import { AuthProvider } from '@/hooks/useAuth';
import { NotFoundPage } from '@/pages/NotFoundPage';

const LibraryPage = lazy(() => import('./pages/LibraryPage'));

export default function App() {
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
          <Route path="/legal" element={<LegalPage />} />
          <Route path="/legal/:section" element={<LegalPage />} />

          {/* 📝 Blog */}
          <Route
            path="/blog"
            element={
              <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Blog en construcción</h1>
                <p>Muy pronto encontrarás contenido aquí.</p>
              </div>
            }
          />

          {/* 🌐 Portal */}
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
          <Route path="/auth/login" element={<AuthPage mode="login" />} />
          <Route path="/auth/register" element={<AuthPage mode="register" />} />
          <Route path="/auth/forgot-password" element={<AuthPage mode="forgot-password" />} />

          {/* 🚫 404 */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}