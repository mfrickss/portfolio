import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { SmoothCursor } from "./components/Cursor";
import { LanguageProvider } from "./contexts/LanguageContext";
import Projects from "./sections/Projects";

const App = () => {
  return (
    <LanguageProvider>
      <div className="container mx-auto max-w-8xl">
        <SmoothCursor />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <section className="min-h-screen" />
        <section className="min-h-screen" />

        {/*{experience}
        {testimonial}
        {contact}
        {footer} */}
      </div>
    </LanguageProvider>
  );
};

export default App;
