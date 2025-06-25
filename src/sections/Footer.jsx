import { mySocials } from "../components/constants";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Atualizar os caminhos das imagens dos socials
  const updatedSocials = mySocials.map((social) => ({
    ...social,
    icon: social.icon.replace("/assets/", "assets/"),
  }));

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>{language === "pt" ? "Termos & Condições" : "Terms & Conditions"}</p>
        <p>|</p>
        <p>
          {language === "pt" ? "Política de Privacidade" : "Privacy Policy"}
        </p>
      </div>
      <div className="flex gap-3">
        {updatedSocials.map((social, index) => (
          <a
            href={social.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </a>
        ))}
      </div>
      <p>
        © 2025 Ricardo.{" "}
        {language === "pt"
          ? "Todos os direitos reservados."
          : "All rights reserved."}
      </p>
    </section>
  );
};

export default Footer;
