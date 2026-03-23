import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LibraryPage } from '@/pages/LibraryPage';

export default function App() {
  const language = "es";
  const t = (key: string) => key;
  const changeLanguage = () => {};

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}