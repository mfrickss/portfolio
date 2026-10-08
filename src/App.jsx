import { MotionConfig } from "motion/react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { LanguageProvider } from "./contexts/LanguageContext";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="never">
      <div className="container mx-auto max-w-8xl">
        <a href="#main-content" className="skip-link">Pular para o conteúdo / Skip to content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        </main>
        <Footer />
      </div>
      </MotionConfig>
    </LanguageProvider>
  );
};

export default App;
