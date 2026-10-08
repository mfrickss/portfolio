import { assetUrl } from "../lib/assets";
import { mySocials } from "../components/constants";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="c-space pb-6 text-sm text-neutral-400">
      <div className="flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-medium text-neutral-200">Ricardo Camargo</p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()}. {t.copyright}</p>
        </div>
        <nav aria-label={t.socials} className="flex flex-wrap gap-x-4 gap-y-1">
          {mySocials.map((social) => (
            <a href={social.href} key={social.name} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
              <img src={assetUrl(social.icon)} className="size-4" width="16" height="16" alt="" />
              {social.name}
            </a>
          ))}
        </nav>
        <a href="#home" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
          {t.backToTop}<span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
