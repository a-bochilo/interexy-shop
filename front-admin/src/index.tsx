// ========================== react ==========================
import React from "react";
import ReactDOM from "react-dom/client";

// ========================== styles =========================
import "./index.css";

// ========================== components =====================
import App from "./app";

// ========================== reportWebVitals ================
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
