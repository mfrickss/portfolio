import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary";

const fallback = (
  <main className="c-space min-h-screen grid place-content-center gap-4 text-center">
    <h1 className="text-heading">Não foi possível carregar a página.</h1>
    <p>Você pode recarregar ou entrar em contato por email.</p>
    <button type="button" onClick={() => window.location.reload()} className="rounded-lg bg-royal p-3">Recarregar</button>
    <a href="mailto:ricardocamargodev@gmail.com">ricardocamargodev@gmail.com</a>
  </main>
);
createRoot(document.getElementById("root")).render(
  <StrictMode><ErrorBoundary fallback={fallback}><App /></ErrorBoundary></StrictMode>,
);
