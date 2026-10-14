import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { resolveProfile } from "./profiles";
import "./styles.css";

// Build-time HTML keeps the portfolio readable without JavaScript. Mount with
// the requested profile so shared query links also work on static hosting.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      initialProfile={resolveProfile(window.location.search)}
      assetBase={import.meta.env.BASE_URL}
    />
  </StrictMode>,
);
