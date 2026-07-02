"use client";

import dynamic from "next/dynamic";

// Single ssr:false boundary for every non-critical widget (see
// NonCriticalWidgets.tsx) — one lazy chunk/request instead of many.
// `ssr:false` dynamic() must live in a Client Component, hence this wrapper.
const NonCriticalWidgets = dynamic(() => import("@/components/NonCriticalWidgets"), { ssr: false });

export default function DecorativeEffects() {
  return <NonCriticalWidgets />;
}
