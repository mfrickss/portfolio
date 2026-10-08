import { useRef, useState } from "react";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";
import { myProjects, projectThumbnailWidths } from "../components/constants";
import ProjectDetails from "../components/ProjectDetails";
import ProjectImage from "../components/ProjectImage";

import { assetUrl } from "../lib/assets";
// c-space padding, grid gaps and card padding determine the rendered cover width.
const cardImageSizes = "(min-width: 1536px) 422px, (min-width: 1280px) 337px, (min-width: 1024px) 406px, (min-width: 768px) 298px, (min-width: 640px) 526px, calc(100vw - 74px)";

function ProjectCard({ project, labels, onOpen }) {
  return (
    <article className="group/card row-span-5 grid min-w-0 grid-rows-subgrid gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-lavender/40">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black/40">
        <ProjectImage src={assetUrl(`${project.cardImage}-768.webp`)}
          srcSet={projectThumbnailWidths.map((width) => `${assetUrl(`${project.cardImage}-${width}.webp`)} ${width}w`).join(", ")}
          sizes={cardImageSizes} alt={project.imageAlt} width={768} height={432}
          loading="lazy" unavailableLabel={labels.imageUnavailable}
          className={`h-full w-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover/card:scale-105`} />
      </div>
      <h3 className="self-start text-xl leading-snug font-bold text-balance text-white">{project.title}</h3>
      <p className="self-start text-sm leading-relaxed text-pretty text-neutral-300">{project.description}</p>
      <ul aria-label={labels.technologies} className="flex flex-wrap content-start items-start gap-2">
          {project.tags.map((tag) => (
            <li key={tag.id} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs leading-4 text-neutral-300">{tag.name}</li>
          ))}
      </ul>
      <div className="flex items-end pt-2">
        <button type="button" onClick={(event) => onOpen(project.key, event.currentTarget)}
          aria-label={`${labels.viewDetails}: ${project.title}`}
          className="inline-flex min-h-9 items-center justify-center rounded-full border border-lavender/30 bg-lavender/10 px-4 py-1.5 text-xs font-medium text-violet-200 hover:bg-lavender/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
          {labels.viewDetails}
        </button>
      </div>
    </article>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const labels = (translations[language] || translations.pt).projects;
  const [selectedProjectKey, setSelectedProjectKey] = useState(null);
  const openerRef = useRef(null);

  // Keep only identity in state; visible copy follows the current language.
  const projectsList = myProjects.map((metadata) => ({
    ...metadata,
    ...labels.items[metadata.key],
    image: assetUrl(metadata.image),
    badge: metadata.badgeKey ? labels.badges[metadata.badgeKey] : null,
  }));
  const selectedProject = projectsList.find((project) => project.key === selectedProjectKey);

  function openProject(key, opener) {
    openerRef.current = opener;
    setSelectedProjectKey(key);
  }

  return (
    <section id="work" className="c-space py-20">
      <h2 className="text-heading mb-12">{labels.title}</h2>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectsList.map((project) => (
          <li key={project.key} className="row-span-5 grid min-w-0 grid-rows-subgrid">
            <ProjectCard project={project} labels={labels} onOpen={openProject} />
          </li>
        ))}
      </ul>
      {selectedProject ? (
        <ProjectDetails key={selectedProject.key} project={selectedProject}
          closeModal={() => setSelectedProjectKey(null)} openerRef={openerRef} />
      ) : null}
    </section>
  );
}
