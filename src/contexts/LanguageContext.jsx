import { useEffect, useState } from "react";
import { LanguageContext } from "./language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("pt");
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);
  const toggleLanguage = () => setLanguage((previous) => previous === "pt" ? "en" : "pt");
  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>;
}
