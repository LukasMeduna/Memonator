import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
//import "./styles.css";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <header>
      <h1>Memonator</h1>
      <summary>When you need to learn new words quickly.</summary>
      <hr />
    </header>
    <App />
  </StrictMode>
);
