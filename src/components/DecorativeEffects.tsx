"use client";

import dynamic from "next/dynamic";

// Purely decorative, client-only visual effects — loaded off the critical
// path so they never delay first paint or hydration of real content.
// `ssr:false` dynamic() must live in a Client Component, hence this wrapper.
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });
const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });

export default function DecorativeEffects() {
  return (
    <>
      <ThreeBackground />
      <CursorGlow />
    </>
  );
}
