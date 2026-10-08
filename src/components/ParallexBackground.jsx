import { motion as Motion, useScroll, useTransform } from "motion/react";

import { assetUrl } from "../lib/assets";

const ParallexBackground = () => {
  const { scrollYProgress } = useScroll();
  const mountain3Y = useTransform(scrollYProgress, [0, 0.5], ["0%", "70%"]);
  const plantesX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-black/40">
      <div className="relative h-screen w-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-screen h-screen -z-50"
          style={{
            backgroundImage: `url("${assetUrl("assets/sky.webp")}")`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        {/* Mountain Layer 3 */}
        <Motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: `url("${assetUrl("assets/mountain-3.webp")}")`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <Motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: `url("${assetUrl("assets/planets.webp")}")`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: plantesX,
          }}
        />
        {/* Mountain Layer 2: */}
        <Motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: `url("${assetUrl("assets/mountain-2.webp")}")`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        {/* Mountain Layer 1 */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url("${assetUrl("assets/mountain-1.webp")}")`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default ParallexBackground;
