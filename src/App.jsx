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
      <div className="container mx-auto max-w-8xl">
        <Navbar />
        <Hero />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        <Footer />
        {/* <Projects /> */}
      </div>
    </LanguageProvider>
  );
};

export default App;
