import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 text-sm font-medium transition-colors cursor-pointer"
      title={language === "pt" ? "Switch to English" : "Mudar para Português"}
    >
      <img
        src={language === "pt" ? "/assets/uk.svg" : "/assets/brasil.svg"}
        alt={language === "pt" ? "Switch to English" : "Mudar para Português"}
        className="w-6 h-6"
        style={{ display: "inline", verticalAlign: "middle" }}
      />
    </button>
  );
};

export default LanguageToggle;
