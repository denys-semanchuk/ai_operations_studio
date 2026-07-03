"use client";

import { useCallback, useSyncExternalStore } from "react";

function getServerSnapshot() {
  return false;
}

// Reads a media query as external browser state via useSyncExternalStore —
// the server snapshot is always `false`, so hydration matches the
// server-rendered HTML exactly; the real value takes over right after
// mount, with no manual effect/setState dance.
export function useMatchMedia(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
