import React from "react";
import ReactDOM from "react-dom/client";

// Componente raíz
import App from "./App.jsx";

// Importar Tailwind
import "./index.css";

// Render principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
