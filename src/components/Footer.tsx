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
            <Link href="/mentions-legales" className="legal-link">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
