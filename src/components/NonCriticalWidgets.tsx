"use client";

import ThreeBackground from "@/components/ThreeBackground";
import CursorGlow from "@/components/CursorGlow";
import ChatWidget from "@/components/ChatWidget";
import StickyConversionBar from "@/components/StickyConversionBar";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";
import ExitIntent from "@/components/ExitIntent";

// Everything here is either purely decorative or hidden behind a delayed
// trigger (scroll threshold, timer, exit-intent) — none of it is needed
// for first paint. Bundled together as plain imports so the single
// ssr:false dynamic() boundary in DecorativeEffects.tsx produces ONE lazy
// chunk/request instead of one per component — fewer round trips matters
// more than a few KB on a real, high-latency mobile connection.
export default function NonCriticalWidgets() {
  return (
    <>
      <ThreeBackground />
      <CursorGlow />
      <ChatWidget />
      <StickyConversionBar />
      <BackToTop />
      <CookieBanner />
      <ExitIntent />
    </>
  );
}
