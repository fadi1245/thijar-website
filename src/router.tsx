import { createRouter, type RouterHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound, RouteError } from "@/components/layout/RouteStatus";

/** A fresh router per call: the client creates one, the prerender script one per page */
export function createAppRouter(
  options: { history?: RouterHistory; isServer?: boolean; scrollRestoration?: boolean } = {}
) {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: RouteError,
    ...options,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
