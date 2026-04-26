import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en' | 'fr' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
});

function detectLanguageFromPath(): Language | null {
  const path = window.location.pathname.toLowerCase();

  if (path.startsWith('/es')) return 'es';
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/fr')) return 'fr';
  if (path.startsWith('/pt')) return 'pt';

  return null;
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    // 1️⃣ PRIORIDAD ABSOLUTA: URL
    const pathLang = detectLanguageFromPath();

    if (pathLang) {
      setLanguageState(pathLang);
      localStorage.setItem('language', pathLang);
      return;
    }

    // 2️⃣ LOCAL STORAGE
    const saved = localStorage.getItem('language');

    if (saved && ['es', 'en', 'fr', 'pt'].includes(saved)) {
      setLanguageState(saved as Language);
      return;
    }

    // 3️⃣ NAVEGADOR
    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('es')) setLanguageState('es');
    else if (browserLang.startsWith('fr')) setLanguageState('fr');
    else if (browserLang.startsWith('pt')) setLanguageState('pt');
    else setLanguageState('en');
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);