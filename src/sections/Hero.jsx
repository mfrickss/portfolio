import React from "react";
import HeroText from "../components/HeroText";
import ParallexBackground from "../components/ParallexBackground";
import { Canvas } from "@react-three/fiber";
import { Astronaut } from "../components/Astronaut";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
      <HeroText />
      <ParallexBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vh", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Astronaut
            scale={isMobile && 0.23}
            position={isMobile && [0, -1.5, 0]}
          />
          <OrbitControls />
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
