import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { easing } from "maath";
import { useMediaQuery } from "react-responsive";
import { Astronaut } from "./Astronaut";
import Loader from "./Loader";

function Rig({ active }) {
  useFrame((state, delta) => {
    if (active) easing.damp3(state.camera.position, [state.pointer.x / 10, 1 + state.pointer.y / 10, 3], 0.5, delta);
  });
  return null;
}
export default function HeroScene({ active }) {
  const mobile = useMediaQuery({ maxWidth: 853 });
  return (
    <>
    <Canvas camera={{ position: [0, 1, 3] }} frameloop={active ? "always" : "demand"} fallback={null} eventSource={document.getElementById("home")} eventPrefix="client">
      <Suspense fallback={null}>
        <Float enabled={active}>
          <Astronaut active={active} scale={mobile ? 0.23 : 0.3} position={mobile ? [0, -1.5, 0] : [1.3, -1, 0]} />
        </Float>
      </Suspense>
      <Rig active={active} />
    </Canvas>
    <Loader />
    </>
  );
}
