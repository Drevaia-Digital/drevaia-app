import { useState, useCallback, useEffect } from 'react';
import { translations, type Language, type Translations } from '@/i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('es');
  const [t, setT] = useState<Translations>(translations.es);

  useEffect(() => {
    setT(translations[language]);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return { language, t, changeLanguage };
}
