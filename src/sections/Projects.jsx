import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Marquee } from "../components/Marquee";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";
import ProjectDetails from "../components/ProjectDetails";

const ProjectCard = ({ title, image, tags, onClick }) => {
  return (
    <figure
      onClick={onClick}
      className={twMerge(
        "relative h-100 w-130 cursor-pointer overflow-hidden rounded-2xl border p-4",
        "border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm", 
        "hover:border-primary/50 transition-all duration-300 group/card hover:-translate-y-2" 
      )}
    >
      {/* Imagem do Projeto */}
      <div className="h-65 w-full overflow-hidden rounded-xl bg-black/50">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover/card:opacity-100 group-hover/card:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Título e Tech Stack */}
      <div className="mt-8 flex flex-col gap-2">
        <figcaption className="text-lg font-bold text-white">
          {title}
        </figcaption>
        
        {/* Lista horizontal de ícones das tecnologias */}
        <div className="flex gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="rounded-full bg-white/10 p-2.5 backdrop-blur-md" title={tag.name}>
              <img src={tag.path} alt={tag.name} className="h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-[#7a57db] opacity-10 transition-opacity duration-900 group-hover/card:opacity-50" />
    </figure>
  );
};

export default function Testimonial() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Estado para controlar o Modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Recriando a lista de projetos (Mesma lógica do Projects.jsx para manter consistência)
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
        { id: 1, name: "C#", path: "assets/logos/csharp-plain-logo.svg" }, 
        { id: 2, name: ".NET 8", path: "assets/logos/dotnetcore-original-logo.svg" },
        { id: 3, name: "Entity Framework", path: "assets/logos/entityframeworkcore-plain.svg" },
        { id: 4, name: "SQLite", path: "assets/logos/sqlite.svg" },
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
        { id: 1, name: "PHP", path: "assets/logos/php-original-logo.svg" },
        { id: 2, name: "MySQL", path: "assets/logos/mysql.svg" },
        { id: 3, name: "Bootstrap", path: "assets/logos/bootstrap-original-wordmark-logo.svg" },
        { id: 4, name: "JavaScript", path: "assets/logos/javascript.svg" },
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
        { id: 1, name: "HTML5", path: "assets/logos/html5.svg" },
        { id: 2, name: "CSS3", path: "assets/logos/css3.svg" },
        { id: 3, name: "JavaScript", path: "assets/logos/javascript.svg" },
        { id: 4, name: "Responsive", path: "assets/logos/responsive.png" },
      ],
    },
  ];

  const marqueeList = [...myProjects, ...myProjects]; 

  return (
    <section className="c-space py-20 overflow-hidden">
      <h2 className="text-heading mb-12">{language === 'pt' ? 'Meus Projetos' : 'My Projects'}</h2>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Marquee Principal */}
        <Marquee pauseOnHover className="[--duration:30s]">
          {marqueeList.map((project, index) => (
            <ProjectCard 
              // Usando index na key porque duplicamos os projetos
              key={`${project.id}-${index}`} 
              {...project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </Marquee>

        {/* Degradê lateral para suavizar a entrada/saída (Fade edges) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#030412] z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#030412] z-10"></div>
      </div>

      {/* Modal de Detalhes */}
      {selectedProject && (
        <ProjectDetails
          {...selectedProject}
          closeModal={() => setSelectedProject(null)}
          language={language}
        />
      )}
    </section>
  );
}