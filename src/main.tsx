import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { createAppRouter } from "./router";

import "@/styles/globals.css";

const router = createAppRouter();
const rootEl = document.getElementById("root")!;
const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// Production pages are prerendered (scripts/prerender.mjs): load the route
// first so the first client render matches the HTML, then hydrate it.
if (rootEl.hasChildNodes()) {
  router.load().then(() => {
    // <HeadContent /> re-creates the head tags; drop the static copies so
    // nothing is duplicated (crawlers already read them from the HTML)
    document.head
      .querySelectorAll("[data-prerender]")
      .forEach((el) => el.remove());
    // Marks the router as SSR-hydrated (as TanStack Start does) so it renders
    // the same tree as the server, without the client-only root <Suspense>
    router.ssr = { manifest: undefined };
    hydrateRoot(rootEl, app);
  });
} else {
  createRoot(rootEl).render(app);
}
