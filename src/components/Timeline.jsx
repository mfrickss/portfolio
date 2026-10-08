import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";

export const Timeline = ({ data }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setHeight(element.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space mb-20 relative" ref={containerRef}>
      <h2 className="text-heading">{t.experiences.title}</h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute -left-[15px] w-10 rounded-full bg-midnight flex items-center justify-center">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </div>
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 text-neutral-300">
                <span className="text-sm font-semibold tracking-wide text-purple-400 font-mono">{item.date}</span>
                <h3 className="text-2xl font-bold text-white">{item.job}</h3>
                <h4 className="text-base font-medium text-neutral-400">{item.title}</h4>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="block mb-4 text-left md:hidden">
                <span className="text-sm font-semibold tracking-wide text-purple-400 font-mono">
                  {item.date}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{item.job}</h3>
                <h4 className="text-base font-medium text-neutral-400">{item.title}</h4>
              </div>
              <ul className="space-y-3 list-none">
                {item.contents.map((content, contentIndex) => (
                  <li
                    key={contentIndex}
                    className="flex items-start text-sm md:text-base leading-relaxed text-neutral-300"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 mr-3 shrink-0" />
                    <span>{content}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%]  via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
