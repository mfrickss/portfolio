import Card from "../components/Card";
import { useRef } from "react";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";
import { Meteors } from "../components/Meteors";
import { assetUrl } from "../lib/assets";
import { engineeringPillars, techLogos } from "../components/constants";

const About = () => {
  const grid2Container = useRef();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="about" className="c-space section-spacing">
      <h2 className="text-heading">{t.about.title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(18rem,auto)] mt-8 sm:mt-12">
        {/* Grid 1 - Pitch e Apresentação Suave e Harmoniosa */}
        <div className="flex flex-col sm:flex-row items-end grid-default-color grid-1 relative overflow-hidden">
          <img
            src={assetUrl("assets/coding-pov.webp")}
            loading="lazy" decoding="async"
            alt=""
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-35 md:opacity-45 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo/90 via-indigo/40 to-transparent pointer-events-none" />
          <div className="z-10 relative p-2 sm:p-3">
            <p className="text-lg sm:text-xl font-semibold text-neutral-100 tracking-tight leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] mb-2">
              {t.about.greeting}
            </p>
            <p className="text-xs sm:text-sm md:text-[0.95rem] font-normal text-neutral-200/90 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] text-pretty">
              {t.about.journey}
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div
          ref={grid2Container}
          className="grid-default-color grid-2 min-h-[10rem] sm:min-h-[15rem]"
        >
          <div className="flex items-center justify-center w-full h-full">
            <p className="flex items-end text-5xl text-gray-500">
              <span className="w-full text-center block">
                {t.about.codeCraft}
              </span>
            </p>

            {/* Pilares de Engenharia (Iteráveis) */}
            {engineeringPillars.map((pillar) => (
              <Card
                key={pillar.id}
                style={pillar.style}
                text={t.about[pillar.key]}
                containerRef={grid2Container}
              />
            ))}

            {/* Logos de Tecnologias (Iteráveis) */}
            {techLogos.map((tech) => (
              <Card
                key={tech.id}
                style={tech.style}
                image={tech.image}
                alt={tech.name}
                containerRef={grid2Container}
              />
            ))}
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3 flex flex-col justify-center h-full">
          <div className="z-10 w-full text-left flex flex-col justify-center">
            <p className="headtext text-lg sm:text-xl">{t.about.timeZone}</p>
            <p className="subtext text-xs sm:text-base">{t.about.location}</p>
          </div>
          <figure aria-hidden="true" className="absolute inset-0">
            <Meteors />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 size-full">
            <p className="text-center headtext text-lg sm:text-xl">
              {t.about.projectTogether}
            </p>{" "}
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5 flex flex-col justify-center relative overflow-hidden py-6 px-6 sm:px-8">
          <div className="absolute inset-y-0 start-0 w-[68%] bg-gradient-to-r from-indigo/95 via-indigo/70 to-transparent pointer-events-none z-[1]" />
          <div className="z-10 max-w-[58%] flex flex-col justify-center space-y-2.5 relative">
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] m-0">
              {t.about.myStack}
            </p>
            <p className="text-sm sm:text-[0.92rem] leading-relaxed text-neutral-200/90 font-normal text-pretty drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] m-0">
              {t.about.stackDescription}
            </p>
          </div>
          <div
            className="absolute inset-y-0 flex items-center justify-center w-full h-full pointer-events-none start-[58%] min-[854px]:start-[46%] scale-95 sm:scale-105 md:scale-115 lg:scale-120"
          >
            <div className="pointer-events-auto">
              <Frameworks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
