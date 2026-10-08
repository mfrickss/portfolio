import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import HeroText from "../components/HeroText";
import ParallexBackground from "../components/ParallexBackground";
import ErrorBoundary from "../components/ErrorBoundary";
import { usePageVisible } from "../hooks/usePageVisible";

const HeroScene = lazy(() => import("../components/HeroScene"));
export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const pageVisible = usePageVisible();
  const [ready, setReady] = useState(false);
  const [sceneRequested, setSceneRequested] = useState(false);
  useEffect(() => {
    if (ready && inView && pageVisible) setSceneRequested(true);
  }, [ready, inView, pageVisible]);
  useEffect(() => {
    // Paint the content before downloading the decorative 3D runtime.
    if ("requestIdleCallback" in window) {
      const task = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(task);
    }
    const task = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(task);
  }, []);
  const active = inView && pageVisible;
  return (
    <section ref={ref} id="home" className="relative left-1/2 -translate-x-1/2 flex h-screen w-screen items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallexBackground />
      <figure aria-hidden="true" className="absolute inset-0 h-screen w-screen">
        {sceneRequested ? <ErrorBoundary fallback={null}><Suspense fallback={null}><HeroScene active={active} /></Suspense></ErrorBoundary> : null}
      </figure>
    </section>
  );
}
