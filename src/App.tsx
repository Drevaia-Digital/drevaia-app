import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';

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
      </Routes>
    </BrowserRouter>
  );
}