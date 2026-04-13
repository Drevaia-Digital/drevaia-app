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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  // 🌍 DETECCIÓN AUTOMÁTICA (SOLO PRIMERA VEZ)
  useEffect(() => {
    const saved = localStorage.getItem('language');

    if (saved) {
      setLanguageState(saved as Language);
      return;
    }

    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith('es')) setLanguageState('es');
    else if (browserLang.startsWith('fr')) setLanguageState('fr');
    else if (browserLang.startsWith('pt')) setLanguageState('pt');
    else setLanguageState('en');
  }, []);

  // 💾 GUARDAR ELECCIÓN DEL USUARIO
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