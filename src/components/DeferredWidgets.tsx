"use client";

import dynamic from "next/dynamic";

// These widgets all stay hidden until a delayed trigger fires (scroll past
// a threshold, an exit-intent, a timer) — none of them are needed for
// first paint or primary nav/hero interactivity, so their JS is loaded off
// the critical path instead of bloating the initial bundle every route pays.
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });
const StickyConversionBar = dynamic(() => import("@/components/StickyConversionBar"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/BackToTop"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });
const ExitIntent = dynamic(() => import("@/components/ExitIntent"), { ssr: false });

export default function DeferredWidgets() {
  return (
    <>
      <ChatWidget />
      <StickyConversionBar />
      <BackToTop />
      <CookieBanner />
      <ExitIntent />
    </>
  );
}
