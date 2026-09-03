import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  translations,
  type Language,
  type Translations,
} from "@/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined,
  );

function detectLanguageFromPath(): Language | null {
  const path =
    window.location.pathname.toLowerCase();

  if (path.startsWith("/es")) return "es";
  if (path.startsWith("/en")) return "en";
  if (path.startsWith("/fr")) return "fr";
  if (path.startsWith("/pt")) return "pt";

  return null;
}

function detectLanguageFromBrowser(): Language {
  const browserLanguage =
    navigator.language.toLowerCase();

  if (browserLanguage.startsWith("es")) {
    return "es";
  }

  if (browserLanguage.startsWith("fr")) {
    return "fr";
  }

  if (browserLanguage.startsWith("pt")) {
    return "pt";
  }

  return "en";
}

function getInitialLanguage(): Language {
  const pathLanguage =
    detectLanguageFromPath();

  if (pathLanguage) {
    return pathLanguage;
  }

  const savedLanguage =
    localStorage.getItem("language");

  if (
    savedLanguage === "es" ||
    savedLanguage === "en" ||
    savedLanguage === "fr" ||
    savedLanguage === "pt"
  ) {
    return savedLanguage;
  }

  return detectLanguageFromBrowser();
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>(() =>
      getInitialLanguage(),
    );

  const setLanguage = (
    lang: Language,
  ) => {
    localStorage.setItem(
      "language",
      lang,
    );

    setLanguageState(lang);
  };

  const t = useMemo(
    () => translations[language],
    [language],
  );

  useEffect(() => {
    document.documentElement.lang =
      language;

    localStorage.setItem(
      "language",
      language,
    );
  }, [language]);

  const value =
    useMemo<LanguageContextType>(
      () => ({
        language,
        setLanguage,
        t,
      }),
      [language, t],
    );

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider.",
    );
  }

  return context;
}