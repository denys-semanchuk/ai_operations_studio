"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// framer-motion's `motion` component eagerly bundles every animation,
// gesture and layout engine it supports. Everything in this codebase uses
// the lightweight `m` component instead, scoped to this provider, which
// cuts framer-motion's contribution to the bundle roughly in half.
// `domAnimation` covers every feature actually in use: exit animations
// (AnimatePresence), drag-free gestures like whileHover/whileTap (BackToTop,
// ChatWidget), and scroll-linked values (ScrollProgress, ParallaxItem).
// The one feature that needed the heavier `domMax` bundle — Header's
// `layoutId` shared-layout indicator — was replaced with a plain CSS
// transition (see Header.tsx), so nothing here depends on layout animations
// anymore.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
