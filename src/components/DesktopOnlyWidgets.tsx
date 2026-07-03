"use client";

import CursorGlow from "@/components/CursorGlow";
import ExitIntent from "@/components/ExitIntent";

// CursorGlow (mousemove-driven custom cursor) and ExitIntent (mouseleave-
// triggered modal) can never activate on a touch device — there's no mouse
// to fire those events. Kept in a separate chunk from NonCriticalWidgets so
// DecorativeEffects.tsx can skip loading it entirely on touch devices,
// instead of shipping dead-on-mobile code inside the shared lazy bundle.
export default function DesktopOnlyWidgets() {
  return (
    <>
      <CursorGlow />
      <ExitIntent />
    </>
  );
}
