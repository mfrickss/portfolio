import { assetUrl } from "../lib/assets";
import { Timeline } from "../components/Timeline";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";

function Experiences() {
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = t.experiences.items;

  return (
    <div className="relative w-full py-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-center bg-repeat-y bg-[length:100%_auto] opacity-10"
        style={{
          backgroundImage: `url("${assetUrl("assets/grid.png")}")`,
        }}
      />
      <Timeline data={experiences} />
    </div>
  );
}

export default Experiences;
