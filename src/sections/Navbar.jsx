import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";
import LanguageToggle from "../components/LanguageToggle";
import { assetUrl } from "../lib/assets";

function Navigation({ onNavigate }) {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <ul className="nav-ul">
      {[["home", "home"], ["about", "about"], ["work", "work"], ["contact", "contact"]].map(([id, label]) => (
        <li key={id} className="nav-li"><a className="nav-link rounded-sm focus-visible:outline-2 focus-visible:outline-lavender" href={`#${id}`} onClick={onNavigate}>{t.nav[label]}</a></li>
      ))}
      <li className="nav-li ml-2"><LanguageToggle /></li>
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].nav;
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");
    const closeDesktop = () => { if (desktop.matches) setOpen(false); };
    const escape = (event) => {
      if (event.key === "Escape" && open) { setOpen(false); buttonRef.current?.focus(); }
    };
    desktop.addEventListener("change", closeDesktop);
    document.addEventListener("keydown", escape);
    return () => { desktop.removeEventListener("change", closeDesktop); document.removeEventListener("keydown", escape); };
  }, [open]);
  function navigate(event) {
    setOpen(false);
    const target = document.querySelector(event.currentTarget.hash);
    if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
  }
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a className="text-xl font-bold transition-colors text-neutral-400 hover:text-white rounded-sm focus-visible:outline-2 focus-visible:outline-lavender" href="#home">MFRICKS</a>
          <button ref={buttonRef} type="button" onClick={() => setOpen((previous) => !previous)} aria-label={open ? t.closeMenu : t.openMenu} aria-expanded={open} aria-controls="mobile-navigation"
            className="flex min-h-11 min-w-11 items-center justify-center cursor-pointer text-neutral-400 hover:text-white rounded-sm focus-visible:outline-2 focus-visible:outline-lavender sm:hidden">
            <img src={assetUrl(open ? "assets/close.svg" : "assets/menu.svg")} className="w-6 h-6" alt="" />
          </button>
          <nav aria-label={language === "pt" ? "Navegação principal" : "Main navigation"} className="hidden sm:flex w-full justify-end"><Navigation /></nav>
        </div>
      </div>
      <div id="mobile-navigation" hidden={!open} className="sm:hidden">
        {open ? <motion.nav aria-label={language === "pt" ? "Navegação móvel" : "Mobile navigation"} className="pb-5 overflow-hidden text-center" initial={reducedMotion ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}><Navigation onNavigate={navigate} /></motion.nav> : null}
      </div>
    </header>
  );
}
