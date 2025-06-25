import { Timeline } from "../components/Timeline";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

function Experiences() {
  const { language } = useLanguage();
  const t = translations[language];

  // Combinar dados das experiências com traduções
  const experiences = [
    {
      title: t.experiences.items[0].title,
      job: t.experiences.items[0].job,
      date: t.experiences.items[0].date,
      contents: t.experiences.items[0].contents,
    },
    {
      title: t.experiences.items[1].title,
      job: t.experiences.items[1].job,
      date: t.experiences.items[1].date,
      contents: t.experiences.items[1].contents,
    },
    {
      title: t.experiences.items[2].title,
      job: t.experiences.items[2].job,
      date: t.experiences.items[2].date,
      contents: t.experiences.items[2].contents,
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
}

export default Experiences;
