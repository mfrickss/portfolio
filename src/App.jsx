import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { SmoothCursor } from "./components/Cursor";
import { LanguageProvider } from "./contexts/LanguageContext";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useEffect, useState } from "react";

const App = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setShowCursor(window.innerWidth > 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <LanguageProvider>
      <div className="container mx-auto max-w-8xl">
        {showCursor && <SmoothCursor />}
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
