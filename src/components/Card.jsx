import { assetUrl } from "../lib/assets";
import { motion, useMotionValue } from "motion/react";
import { useLanguage } from "../contexts/language";

export default function Card({ style, text, image, alt = "", containerRef, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { language } = useLanguage();
  const instruction = language === "pt" ? "Use as setas para mover, Home para restaurar." : "Use arrow keys to move, Home to reset.";
  function move(event) {
    if (event.key === "Home") { event.preventDefault(); x.set(0); y.set(0); return; }
    const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
    if (!direction) return;
    event.preventDefault();
    const bounds = containerRef.current.getBoundingClientRect();
    const card = event.currentTarget.getBoundingClientRect();
    const step = event.shiftKey ? 20 : 10;
    x.set(x.get() + Math.max(bounds.left - card.left, Math.min(bounds.right - card.right, direction[0] * step)));
    y.set(y.get() + Math.max(bounds.top - card.top, Math.min(bounds.bottom - card.bottom, direction[1] * step)));
  }
  const interaction = {
    style: { ...style, x, y }, tabIndex: 0, onKeyDown: move, title: instruction,
    whileHover: { scale: 1.05 },
    drag: true, dragConstraints: containerRef, dragMomentum: true,
  };
  if (image && !text) return <motion.img {...interaction} className={`absolute w-15 cursor-grab select-none transform-gpu rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender ${className}`}
    src={assetUrl(image)} loading="lazy" decoding="async" alt={alt} dragElastic={0.1} />;
  return <motion.div {...interaction} role="group" aria-label={`${text}. ${instruction}`} className={`absolute px-3 py-3 text-lg sm:text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm min-w-[11rem] w-auto max-w-[18rem] cursor-grab whitespace-nowrap shadow-lg select-none transform-gpu focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender ${className}`} dragElastic={1}>{text}</motion.div>;
}
