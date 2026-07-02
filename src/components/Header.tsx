"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Cpu, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Offres", href: "/offres" },
    { name: "Simulateur ROI", href: "/roi" },
    { name: "Démo Live", href: "/demo" },
    { name: "Blog", href: "/blog" },
    { name: "À propos", href: "/a-propos" },
  ];

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
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className={`nav-link ${isActive ? "active" : ""}`}>
                {link.name}
                {isActive && (
                  <m.div
                    layoutId="activeIndicator"
                    className="active-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
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
