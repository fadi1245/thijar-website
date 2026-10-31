import { useCallback, useSyncExternalStore } from "react";

/**
 * Live `matchMedia` result. Always `false` during prerendering and hydration
 * (server snapshot), then updates to the real value on the client.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
