import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { resolveProfile } from "./profiles";
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./styles.css";

// Build-time HTML keeps the portfolio readable without JavaScript. Mount with
// the requested profile so shared query links also work on static hosting.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App initialProfile={resolveProfile(window.location.search)} />
  </StrictMode>,
);
