"use client";

import { useEffect, useState } from "react";

/**
 * Returns false on the server and on the very first client render, then
 * true after mount. Used to skip framer-motion's `initial` state (which
 * SSRs as an invisible opacity:0/transform) on first paint, so above-the-
 * fold content is visible immediately instead of waiting on hydration.
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  // Intentional: the one extra render after mount is the whole point here
  // (server/first-paint state -> client-hydrated state).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}
