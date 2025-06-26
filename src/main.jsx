import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Adicionar tratamento de erro para debug
window.addEventListener("error", function (e) {
  console.error("Erro capturado:", e.error);
});

window.addEventListener("unhandledrejection", function (e) {
  console.error("Promise rejeitada:", e.reason);
});

const rootElement = document.getElementById("root");

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Erro ao renderizar a aplicação:", error);
    rootElement.innerHTML =
      "<h1>Erro ao carregar a aplicação</h1><p>Verifique o console para mais detalhes.</p>";
  }
} else {
  console.error("Elemento root não encontrado");
}
