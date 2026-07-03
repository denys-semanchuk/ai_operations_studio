"use client";

import { useMatchMedia } from "@/lib/useMatchMedia";

// Mouse-only effects (tilt, magnetic pull, cursor glow) can never trigger on
// a touch device — there's no mousemove/mouseenter to fire. Callers can use
// this to skip mounting motion/spring machinery for an effect that was
// never visible there in the first place.
export function useIsTouchDevice(): boolean {
  return useMatchMedia("(pointer: coarse)");
}
