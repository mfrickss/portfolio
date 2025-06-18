import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import { SmoothCursor } from "./components/Cursor";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <SmoothCursor />
      <Navbar />
      <Hero />
      <About />
      <section className="min-h-screen" />
      <section className="min-h-screen" />
      <section className="min-h-screen" />
      {/* {projects}
      {experience}
      {testimonial}
      {contact}
      {footer} */}
    </div>
  );
};

export default App;
