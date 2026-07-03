"use client";

import ThreeBackground from "@/components/ThreeBackground";
import ChatWidget from "@/components/ChatWidget";
import StickyConversionBar from "@/components/StickyConversionBar";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";

// Everything here is either purely decorative or hidden behind a delayed
// trigger (scroll threshold, timer) — none of it is needed for first paint,
// and all of it is relevant on both touch and mouse devices. Bundled
// together as plain imports so the single ssr:false dynamic() boundary in
// DecorativeEffects.tsx produces ONE lazy chunk/request instead of one per
// component — fewer round trips matters more than a few KB on a real,
// high-latency mobile connection. Mouse-only widgets (CursorGlow,
// ExitIntent) live in DesktopOnlyWidgets.tsx instead, so touch devices
// never download them at all — see DecorativeEffects.tsx.
export default function NonCriticalWidgets() {
  return (
    <>
      <ThreeBackground />
      <ChatWidget />
      <StickyConversionBar />
      <BackToTop />
      <CookieBanner />
    </>
  );
}
