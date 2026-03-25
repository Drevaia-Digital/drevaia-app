import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from '@/pages/HomePage';
import { LibraryPage } from '@/pages/LibraryPage';
import { AuthPage } from '@/pages/AuthPage';
import { LegalPage } from '@/pages/LegalPage'; // 🔥 corregido
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

          <Route path="/" element={<HomePage />} />

          <Route path="/library" element={<LibraryPage language={language} />} />

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