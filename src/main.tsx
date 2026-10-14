import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { resolveProfile } from "./profiles";
import "./styles.css";

// Build-time HTML keeps the portfolio readable without JavaScript. Mount with
// the dedicated page profile; previous query links remain supported.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      initialProfile={resolveProfile(
        window.location.search,
        window.location.pathname,
        import.meta.env.BASE_URL,
      )}
      assetBase={import.meta.env.BASE_URL}
    />
  </StrictMode>,
);
