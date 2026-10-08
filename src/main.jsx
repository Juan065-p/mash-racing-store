import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/styles.css";
import "./styles/extras.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// El HTML de producción viene prerenderizado: se hidrata. En `vite dev` el root solo tiene un comentario.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
