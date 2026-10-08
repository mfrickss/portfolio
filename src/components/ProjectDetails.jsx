import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";
import ProjectImage from "./ProjectImage";

const actionClass = "inline-flex min-h-9 items-center justify-center rounded-full border border-lavender/30 bg-lavender/10 px-4 py-1.5 text-xs font-medium text-violet-200 hover:bg-lavender/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender";

export default function ProjectDetails({ project, closeModal, openerRef }) {
  const { language } = useLanguage();
  const labels = (translations[language] || translations.pt).projects;
  const [showArchitecture, setShowArchitecture] = useState(false);
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const backdropPressRef = useRef(false);
  const titleId = useId();
  const architectureId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    titleRef.current.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [openerRef]);

  function isOutside(event) {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  }

  function containTab(event) {
    if (event.key !== "Tab") return;
    const controls = Array.from(dialogRef.current.querySelectorAll("button, a[href], [tabindex='0']"))
      .filter((element) => element.getClientRects().length > 0 && !element.disabled);
    const first = controls[0];
    const last = controls[controls.length - 1];
    // Native modality makes the background inert; wrap focus at content edges.
    if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <dialog ref={dialogRef} aria-labelledby={titleId}
      className="project-dialog fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-midnight p-0 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      onCancel={(event) => { event.preventDefault(); closeModal(); }} onKeyDown={containTab}
      onPointerDown={(event) => { backdropPressRef.current = isOutside(event); }}
      onClick={(event) => {
        if (backdropPressRef.current && isOutside(event)) closeModal();
        backdropPressRef.current = false;
      }}>
      <div className="pointer-events-none sticky top-3 z-10 flex h-0 justify-end pr-3">
        <button type="button" onClick={closeModal} aria-label={labels.close}
          className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-midnight/95 text-neutral-300 hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
          <span aria-hidden="true" className="text-2xl leading-none">×</span>
        </button>
      </div>
      <div className="space-y-7 p-5 sm:p-8">
        <header className="space-y-3 pr-10">
          {project.badge ? <span className="inline-block rounded-full border border-lavender/40 bg-lavender/10 px-3 py-1 text-xs text-violet-200">{project.badge}</span> : null}
          <h3 ref={titleRef} id={titleId} tabIndex={-1} className="rounded text-2xl font-bold text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender sm:text-3xl">{project.title}</h3>
        </header>
        <ProjectImage src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight}
          unavailableLabel={labels.imageUnavailable} className="h-auto max-h-[65dvh] w-full rounded-xl bg-black/40 object-contain" />
        <div className="space-y-5 text-sm leading-relaxed text-pretty text-neutral-300 sm:text-base">
          <p className="max-w-[75ch]">{project.overview}</p>
          <ul aria-label={labels.technicalHighlights} className="max-w-[75ch] list-disc space-y-2.5 pl-5 marker:text-violet-300">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
        <section className="space-y-3">
          <h4 className="text-sm font-semibold text-white">{labels.technologies}</h4>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag.id} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
                {tag.name}
              </li>
            ))}
          </ul>
        </section>
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
          {project.isCaseStudy ? (
            <button type="button" aria-expanded={showArchitecture} aria-controls={architectureId}
              onClick={() => setShowArchitecture((previous) => !previous)} className={actionClass}>
              {showArchitecture ? labels.hideArchitecture : labels.viewArchitecture}
            </button>
          ) : null}
          {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>{labels.viewGithub}</a> : null}
          {project.deployUrl ? <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className={actionClass}>{labels.viewDeploy}</a> : null}
        </div>
        {project.isCaseStudy ? (
          <section id={architectureId} hidden={!showArchitecture} className="space-y-5 rounded-xl border border-lavender/30 bg-lavender/5 p-4">
            <h4 className="font-semibold text-violet-200">{labels.viewArchitecture}</h4>
            <ol className="grid gap-3 md:grid-cols-3">
              {project.architecture.steps.map((step, index) => (
                <li key={step.title} className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <h5 className="mb-2 text-sm font-semibold">{index + 1}. {step.title}</h5>
                  <p className="text-sm leading-relaxed text-neutral-300">{step.description}</p>
                </li>
              ))}
            </ol>
            <p className="text-sm leading-relaxed text-neutral-300">{project.architecture.failureHandling}</p>
            <h5 className="text-sm font-semibold text-violet-200">{labels.confidentiality}</h5>
            <p className="text-sm leading-relaxed text-neutral-300">{project.architecture.security}</p>
          </section>
        ) : null}
      </div>
    </dialog>
  );
}
