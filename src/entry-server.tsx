// Build-time only: scripts/prerender.mjs calls render() for each route
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";

import { createAppRouter } from "./router";

export async function render(url: string) {
  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [url] }),
    isServer: true,
    // On the server this injects an inline <script> the client never renders,
    // which breaks hydration. The client router still restores scroll.
    scrollRestoration: false,
  });
  await router.load();

  const html = renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
  // An unknown URL matches only the root route (rendered with NotFound)
  const { matches } = router.state;
  const notFound =
    matches.length <= 1 || matches.some((m) => m.status === "notFound");
  return { html, statusCode: notFound ? 404 : 200 };
}
