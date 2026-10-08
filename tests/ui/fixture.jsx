import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "../../src/contexts/LanguageContext";
import Projects from "../../src/sections/Projects";
import LanguageToggle from "../../src/components/LanguageToggle";
import "../../src/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode><LanguageProvider><main className="container mx-auto"><LanguageToggle /><Projects /></main></LanguageProvider></StrictMode>,
);
