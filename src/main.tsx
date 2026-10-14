import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { profileLocation, resolveProfile } from "./profiles";
import "./styles.css";

const initialProfile = resolveProfile(
  window.location.search,
  window.location.pathname,
  import.meta.env.BASE_URL,
);
const location = profileLocation(
  new URL(window.location.href),
  import.meta.env.BASE_URL,
);
if (
  location !==
  `${window.location.pathname}${window.location.search}${window.location.hash}`
)
  window.history.replaceState(window.history.state, "", location);

// Older application links keep their content and adopt the neutral address.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App initialProfile={initialProfile} assetBase={import.meta.env.BASE_URL} />
  </StrictMode>,
);
