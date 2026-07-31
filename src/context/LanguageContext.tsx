import React, { createContext, useContext, useState, ReactNode } from "react";
import { Language, translations } from "../i18n";

interface LanguageContextType {
  lang: Language;
  t: typeof translations.fr;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "fr" ? "en" : "fr"));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "fr" as Language,
      t: translations.fr,
      setLang: () => {},
      toggleLang: () => {}
    };
  }
  return context;
}
