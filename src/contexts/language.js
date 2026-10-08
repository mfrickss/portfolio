import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  return context;
}
