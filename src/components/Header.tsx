"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Cpu, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; width: number } | null>(null);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Offres", href: "/offres" },
    { name: "Simulateur ROI", href: "/roi" },
    { name: "Démo Live", href: "/demo" },
    { name: "Blog", href: "/blog" },
    { name: "À propos", href: "/a-propos" },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const activeLink = nav.querySelector<HTMLElement>(".nav-link.active");
      if (!activeLink) {
        setIndicator(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      // Matches the link's own horizontal padding, so the indicator spans
      // the same inset text-content width it always has (previously done
      // via CSS `left/right: 0.75rem` on the link itself).
      const linkStyle = window.getComputedStyle(activeLink);
      const padLeft = parseFloat(linkStyle.paddingLeft) || 0;
      const padRight = parseFloat(linkStyle.paddingRight) || 0;
      setIndicator({
        x: linkRect.left - navRect.left + padLeft,
        width: linkRect.width - padLeft - padRight,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    // Re-measure once web fonts finish loading — text width (and therefore
    // the indicator's position/width) can shift slightly after font swap.
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header className="header-container">
      <div className="header-wrapper glass">
        <Link href="/" className="logo-container">
          <div className="logo-icon-wrapper">
            <Cpu className="logo-icon text-gradient" size={24} />
          </div>
          <span className="logo-text font-primary">
            AI Operations <span className="logo-subtext">Studio</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" ref={navRef}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className={`nav-link ${isActive ? "active" : ""}`}>
                {link.name}
              </Link>
            );
          })}
          {indicator && (
            <span
              className="active-indicator"
              aria-hidden="true"
              style={{ transform: `translateX(${indicator.x}px)`, width: `${indicator.width}px` }}
            />
          )}
        </nav>

        <div className="cta-container">
          <Link href="/contact" className="btn btn-primary btn-cta shine-hover">
            <span>Contact</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir/fermer le menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-nav-menu"
            role="dialog"
            aria-label="Menu de navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu glass"
          >
            <div className="mobile-menu-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary mobile-cta"
              >
                <span>Obtenir une proposition</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>


    </header>
  );
}
