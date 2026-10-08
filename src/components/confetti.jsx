import { twMerge } from "tailwind-merge";

export function ConfettiButton({ options, children, onClick, className, ...props }) {
  async function handleClick(event) {
    try {
      // Capture the origin before the click handler can render again.
      const rect = event.currentTarget.getBoundingClientRect();
      const origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };
      const success = await onClick?.(event);
      if (success === false) return;
      const { default: confetti } = await import("canvas-confetti");
      await confetti({ ...options, origin, disableForReducedMotion: false });
    } catch (error) {
      console.error("Confetti button error:", error);
    }
  }

  return (
    <button {...props} onClick={handleClick}
      className={twMerge(
        "inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender disabled:pointer-events-none disabled:opacity-50",
        className,
      )}>
      {children}
    </button>
  );
}
