"use client";

import Link from "next/link";
import { Cpu, Mail, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand-section">
          <div className="footer-logo">
            <Cpu className="logo-icon text-gradient" size={24} />
            <span className="logo-text font-primary">AI Operations <span className="logo-subtext">Studio</span></span>
          </div>
          <p className="footer-tagline">
            Conception, intégration et optimisation de systèmes d'Intelligence Artificielle sur-mesure pour les agences immobilières.
          </p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/denys-semanchuk/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h4 className="footer-title">Plan du site</h4>
            <ul className="footer-links">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/offres">Nos Offres</Link></li>
              <li><Link href="/roi">Calculateur ROI</Link></li>
              <li><Link href="/demo">Démo Live</Link></li>
              <li><Link href="/a-propos">À propos</Link></li>
              <li><Link href="/contact">Contact & Audit</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-title">Services Clés</h4>
            <ul className="footer-links-info">
              <li>IA FAQ & Auto-replies</li>
              <li>Combo Web + IA Agent</li>
              <li>Qualification de Leads Automatique</li>
              <li>Automation Calendrier & Booking</li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-title">Contact & Infos</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="contact-icon text-gradient" />
                <span>Bezons (95870), Val-d'Oise, France</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon text-gradient" />
                <a href="mailto:denys@aioperations.studio">denys@aioperations.studio</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-wrapper">
          <p className="copyright">
            © {currentYear} AI Operations Studio. Tous droits réservés.
          </p>
          <div className="legal-links">
            <span>Micro-entreprise — Franchise en base de TVA</span>
            <span className="separator">•</span>
            <span>Porteur de projet: Denys Semanchuk</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .footer {
          background: rgba(4, 6, 15, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 10;
          padding-top: 5rem;
          padding-bottom: 2rem;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 3fr;
          gap: 4rem;
          margin-bottom: 4rem;
        }
        .footer-brand-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }
        .logo-subtext {
          font-weight: 400;
          color: var(--secondary);
        }
        .footer-tagline {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }
        .social-link:hover {
          color: white;
          border-color: var(--secondary);
          background: rgba(14, 165, 233, 0.1);
          transform: translateY(-2px);
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .footer-title {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links a {
          color: var(--text-muted);
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }
        .footer-links a:hover {
          color: var(--secondary);
        }
        .footer-links-info {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--text-muted);
          font-size: 0.95rem;
        }
        .footer-contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          line-height: 1.4;
        }
        .contact-icon {
          margin-top: 0.15rem;
          flex-shrink: 0;
        }
        .footer-contact-list a:hover {
          color: var(--secondary);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 2rem;
        }
        .footer-bottom-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-dim);
        }
        .legal-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .separator {
          color: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 900px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }
        @media (max-width: 600px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom-wrapper {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .legal-links {
            flex-direction: column;
            gap: 0.5rem;
          }
          .separator {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
}
