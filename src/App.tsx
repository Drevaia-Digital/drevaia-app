import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { LibraryPage } from '@/pages/LibraryPage';
import { AuthPage } from '@/pages/AuthPage';

export default function App() {
  // 🔹 Props temporales para evitar errores (luego los conectamos bien)
  const language = "es";
  const t = {} as any;
  const changeLanguage = () => {};

  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Library */}
        <Route path="/library" element={<LibraryPage language="es" />} />

        {/* Auth */}
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

      </Routes>
    </BrowserRouter>
  );
}