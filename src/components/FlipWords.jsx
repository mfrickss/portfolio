import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { usePageVisible } from "../hooks/usePageVisible";
import { twMerge } from "tailwind-merge";

export const FlipWords = ({ words, duration = 3000, className }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const visible = usePageVisible();
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!words.includes(currentWord)) {
      setCurrentWord(words[0]);
    }
  }, [words, currentWord]);

  const startAnimation = useCallback(() => {
    const currentIndex = words.indexOf(currentWord);
    const nextIndex = (currentIndex + 1) % words.length;
    const word = words[nextIndex] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating && inView && visible) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation, inView, visible]);

  return (
    <span ref={ref} className="inline-block relative min-h-[1.2em] sm:min-h-[1.3em] max-w-full overflow-visible align-top">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setIsAnimating(false)}
      >
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={twMerge("inline-block break-words text-balance max-w-full", className)}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
