import { createContext, useContext } from "react";

export const LanguageContext = createContext({
  language: "zh",
  toggleLanguage: () => {},
});

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguageContext must be used within LanguageContext.Provider");
  }
  return ctx;
}
