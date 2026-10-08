import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { usePageVisible } from "../hooks/usePageVisible";
import { twMerge } from "tailwind-merge";

export function Meteors({ number = 80, minDelay = 0.2, maxDelay = 1.2, minDuration = 2, maxDuration = 10, angle = 215, className }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const visible = usePageVisible();
  const [styles, setStyles] = useState([]);
  useEffect(() => {
    setStyles(Array.from({ length: number }, () => {
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      return {
        "--angle": `${-angle}deg`, top: "-50px", left: `${Math.random() * 100}%`,
        // Start at different points of the cycle instead of showing a row of tails.
        animationDelay: `${-(Math.random() * duration + delay)}s`,
        animationDuration: `${duration}s`, animationFillMode: "both",
      };
    }));
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {styles.map((style, index) => <span key={index} style={{ ...style, animationPlayState: inView && visible ? "running" : "paused" }} className={twMerge("absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]", className)}>
        <span className="absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent" />
      </span>)}
    </div>
  );
}
