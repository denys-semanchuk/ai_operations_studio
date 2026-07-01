"use client";

import { useEffect } from "react";

const CLARITY_PROJECT_ID = "xenny85rcx";

type ClarityFn = { (...args: unknown[]): void; q?: unknown[] };

function loadClarity() {
  const win = window as unknown as { clarity?: ClarityFn };
  if (win.clarity) return;

  const clarity: ClarityFn = (...args) => {
    clarity.q = clarity.q || [];
    clarity.q.push(args);
  };
  win.clarity = clarity;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
}

export default function Analytics() {
  useEffect(() => {
    if (localStorage.getItem("cookie-consent") === "accepted") {
      loadClarity();
    }

    const handleConsent = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "accepted") loadClarity();
    };
    window.addEventListener("cookie-consent-changed", handleConsent);
    return () => window.removeEventListener("cookie-consent-changed", handleConsent);
  }, []);

  return null;
}
