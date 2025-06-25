import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm font-medium transition-colors cursor-pointer"
      title={language === "pt" ? "Mudar para Inglês" : "Switch to Portuguese"}
    >
      <img
        src={language === "pt" ? "assets/uk.svg" : "assets/brasil.svg"}
        alt={language === "pt" ? "Mudar para Inglês" : "Switch to Portuguese"}
        className="w-6 h-6"
        style={{ display: "inline", verticalAlign: "middle" }}
      />
    </button>
  );
};

export default LanguageToggle;
