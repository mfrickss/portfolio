import { assetUrl } from "../lib/assets";
import { useLanguage } from "../contexts/language";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="min-h-11 rounded-sm focus-visible:outline-2 focus-visible:outline-lavender px-3 py-1 text-sm font-medium transition-colors cursor-pointer"
      title={language === "pt" ? "Mudar para Inglês" : "Switch to Portuguese"}
    >
      <img
        src={assetUrl(language === "pt" ? "assets/brasil.svg" : "assets/uk.svg")}
        alt={language === "pt" ? "Mudar para Inglês" : "Switch to Portuguese"}
        className="w-6 h-6"
        style={{ display: "inline", verticalAlign: "middle" }}
      />
    </button>
  );
};

export default LanguageToggle;
