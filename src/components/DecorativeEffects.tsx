"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMatchMedia } from "@/lib/useMatchMedia";

// Single ssr:false boundary for every non-critical widget (see
// NonCriticalWidgets.tsx) — one lazy chunk/request instead of many.
// `ssr:false` dynamic() must live in a Client Component, hence this wrapper.
const NonCriticalWidgets = dynamic(() => import("@/components/NonCriticalWidgets"), { ssr: false });

// Mouse-only widgets (CursorGlow, ExitIntent) — separate chunk, only ever
// rendered (and therefore only ever fetched) on devices with a fine pointer.
const DesktopOnlyWidgets = dynamic(() => import("@/components/DesktopOnlyWidgets"), { ssr: false });

export default function DecorativeEffects() {
  const [ready, setReady] = useState(false);
  const isDesktopPointer = useMatchMedia("(pointer: fine)");

  useEffect(() => {
    // Defer fetching/mounting every non-critical widget until the browser is
    // idle (falling back to a short timeout on Safari, which lacks
    // requestIdleCallback) so none of it competes with the critical
    // rendering path's bandwidth/CPU during first paint.
    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    const activate = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(activate);
    } else {
      timeoutHandle = window.setTimeout(activate, 200);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <NonCriticalWidgets />
      {isDesktopPointer && <DesktopOnlyWidgets />}
    </>
  );
}
