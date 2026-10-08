import { FlipWords } from "./FlipWords";
import { motion as Motion } from "motion/react";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";

const wordsPt = [
  "Interfaces Fluidas",
  "APIs Escaláveis",
  "Fluxos Automatizados",
  "Sistemas com IA",
  "Arquiteturas Robustas",
];

const wordsEn = [
  "Fluid Interfaces",
  "Scalable APIs",
  "Automated Workflows",
  "AI-Powered Systems",
  "Robust Architectures",
];

const variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const HeroText = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const words = language === "pt" ? wordsPt : wordsEn;

  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl relative w-full max-w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)]">
      <div className="flex flex-col w-full max-w-full px-2 sm:px-0 md:mt-28 md:px-10 lg:px-15">
        <Motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] tracking-tight"
          variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }}>
          {t.hero.title}
        </Motion.h1>
        <Motion.p
          className="mt-4 sm:mt-6 md:mt-0 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.2 }}>
          {t.hero.subtitle}
        </Motion.p>
        <Motion.p
          className="mt-4 sm:mt-6 md:mt-1 text-2xl sm:text-3xl md:text-5xl font-bold text-neutral-100 tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.3 }}>
          {t.hero.building}
        </Motion.p>
        <div className="mt-4 sm:mt-6 md:mt-2 min-h-[2.6em] sm:min-h-[1.5em] md:min-h-[1.3em] flex items-center justify-center md:justify-start w-full max-w-full overflow-hidden md:overflow-visible">
          <Motion.div
            variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.5 }}
            className="w-full max-w-full md:w-auto">
            <FlipWords words={words}
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 text-3xl sm:text-5xl drop-shadow-[0_2px_14px_rgba(192,132,252,0.45)]" />
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
