import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { SmoothCursor } from "./components/Cursor";
import { LanguageProvider } from "./contexts/LanguageContext";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";

const App = () => {
  return (
    <LanguageProvider>
      <div className="container mx-auto max-w-8xl">
        <SmoothCursor />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experiences />
        <section className="min-h-screen" />
        <section className="min-h-screen" />

        {/* testimonial*/}
        {/* contact*/}
        {/* footer} */}
      </div>
    </LanguageProvider>
  );
};

export default App;
