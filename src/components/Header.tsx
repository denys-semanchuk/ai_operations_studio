"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Cpu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Offres", href: "/offres" },
    { name: "Simulateur ROI", href: "/roi" },
    { name: "Démo Live", href: "/demo" },
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
                  <motion.div
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
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.25rem 2rem;
          z-index: 1000;
          display: flex;
          justify-content: center;
        }
        .header-wrapper {
          width: 100%;
          max-width: 1200px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 2rem;
          border-radius: 20px;
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .logo-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.01em;
        }
        .logo-subtext {
          font-weight: 400;
          color: var(--secondary);
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-link {
          position: relative;
          color: var(--text-muted);
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          transition: color 0.3s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: white;
        }
        .active-indicator {
          position: absolute;
          bottom: -4px;
          left: 0.75rem;
          right: 0.75rem;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 4px;
        }
        .cta-container {
          display: block;
        }
        .btn-cta {
          padding: 0.6rem 1.25rem;
          font-size: 0.9rem;
          border-radius: 10px;
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .mobile-menu {
          position: absolute;
          top: 90px;
          left: 2rem;
          right: 2rem;
          border-radius: 20px;
          padding: 1.5rem;
          z-index: 999;
          display: none;
        }
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .mobile-nav-link {
          color: var(--text-muted);
          font-size: 1.05rem;
          font-weight: 500;
          padding: 0.25rem 0;
          transition: color 0.3s ease;
        }
        .mobile-nav-link.active {
          color: var(--secondary);
        }
        .mobile-cta {
          margin-top: 0.5rem;
          width: 100%;
        }

        @media (max-width: 900px) {
          .desktop-nav, .cta-container {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
