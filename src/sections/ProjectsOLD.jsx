import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";
import Project from "../components/Project";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };
  const [preview, setPreview] = useState(null);

  // Combinar dados dos projetos com traduções
  const myProjects = [
    {
      id: 1,
      title: t.projects.items[0].title,
      description: t.projects.items[0].description,
      subDescription: t.projects.items[0].subDescription,
      href: "https://github.com/mfrickss/ShingekiAPI",
      logo: "",
      image: "assets/projects/shingeki-api.png",
      tags: [
        {
          id: 1,
          name: "C#",
          path: "assets/logos/csharp.svg",
        },
        {
          id: 2,
          name: ".NET 8",
          path: "assets/logos/dotnet.svg",
        },
        {
          id: 3,
          name: "Entity Framework",
          path: "assets/logos/efcore.png",
        },
        {
          id: 4,
          name: "SQLite",
          path: "assets/logos/sqlite.svg",
        },
      ],
    },
    {
      id: 2,
      title: t.projects.items[1].title,
      description: t.projects.items[1].description,
      subDescription: t.projects.items[1].subDescription,
      href: "https://github.com/marcoantoniofranco/SportConnect-Curitiba",
      logo: "",
      image: "assets/projects/sportconnect.png",
      tags: [
        {
          id: 1,
          name: "PHP",
          path: "assets/logos/php.svg",
        },
        {
          id: 2,
          name: "MySQL",
          path: "assets/logos/mysql.svg",
        },
        {
          id: 3,
          name: "Bootstrap",
          path: "assets/logos/bootstrap.svg",
        },
        {
          id: 4,
          name: "JavaScript",
          path: "assets/logos/javascript.svg",
        },
      ],
    },
    {
      id: 3,
      title: t.projects.items[2].title,
      description: t.projects.items[2].description,
      subDescription: t.projects.items[2].subDescription,
      href: "https://github.com/mfrickss/Dessert-Delight",
      logo: "",
      image: "assets/projects/dessert-delight.png",
      tags: [
        {
          id: 1,
          name: "HTML5",
          path: "assets/logos/html5.svg",
        },
        {
          id: 2,
          name: "CSS3",
          path: "assets/logos/css3.svg",
        },
        {
          id: 3,
          name: "JavaScript",
          path: "assets/logos/javascript.svg",
        },
        {
          id: 4,
          name: "Responsive",
          path: "assets/logos/responsive.png",
        },
      ],
    },
  ];

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative c-space mt-40 mb-40"
    >
      <h2 className="text-heading">{t.projects.title}</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-10 h-[1px] w-full" />
      {myProjects.map((project) => (
        <Project
          key={project.id}
          {...project}
          setPreview={setPreview}
          language={language}
        />
      ))}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default Projects;
