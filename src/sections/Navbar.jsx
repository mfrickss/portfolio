import React, { useState } from "react";
import { motion } from "motion/react"; // NÃO SEI PQ TA ERRADO MAS TA FUNCIONANDO!!
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";
import LanguageToggle from "../components/LanguageToggle";

function Navigation() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home">
          {t.nav.home}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about">
          {t.nav.about}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work">
          {t.nav.work}
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          {t.nav.contact}
        </a>
      </li>
      <li className="nav-li ml-2">
        <LanguageToggle />
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
            href=""
          >
            MFRICKS
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            ></img>
          </button>
          <nav className="hidden sm:flex w-full justify-end">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "180vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
