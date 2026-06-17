import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
        fallback={
          <div className="font-mono text-[11px] tracking-[0.15em] text-text-dim uppercase">
            loading…
          </div>
        }
      >
      <App />
    </Suspense>
  </StrictMode>
);
