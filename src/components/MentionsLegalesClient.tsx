"use client";

export default function MentionsLegalesClient() {
  return (
    <div className="page-wrapper container">
      <div className="ml-wrapper">
        <h1 className="ml-title font-primary">Mentions Légales</h1>
        <p className="ml-updated">Dernière mise à jour : juin 2025</p>

        <section className="ml-section">
          <h2>1. Éditeur du site</h2>
          <p>Le site <strong>aioperations.studio</strong> est édité par :</p>
          <ul>
            <li><strong>Dénomination :</strong> AI Operations Studio</li>
            <li><strong>Forme juridique :</strong> Micro-entreprise — Franchise en base de TVA (article 293 B du CGI)</li>
            <li><strong>N° SIRET :</strong> 102 722 956 00012</li>
            <li><strong>Siège social :</strong> Bezons, 95870 Val-d'Oise, France</li>
            <li><strong>Email :</strong> <a href="mailto:denys@aioperations.studio">denys@aioperations.studio</a></li>
          </ul>
        </section>

        <section className="ml-section">
          <h2>2. Directeur de la publication</h2>
          <p>Denys Semanchuk, en qualité de gérant d'AI Operations Studio.</p>
        </section>

        <section className="ml-section">
          <h2>3. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Société :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
            <li><strong>Site web :</strong> vercel.com</li>
          </ul>
        </section>

        <section className="ml-section">
          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant ce site (textes, graphiques, logotypes, icônes, images, clips audio et vidéo)
            est la propriété exclusive d'AI Operations Studio ou fait l'objet d'une autorisation d'utilisation.
            Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, de ces éléments
            est interdite sans l'accord écrit préalable d'AI Operations Studio.
          </p>
        </section>

        <section className="ml-section">
          <h2>5. Données personnelles & Cookies</h2>
          <p>
            Le site collecte uniquement les données que vous transmettez volontairement via le formulaire de contact
            (nom, email, téléphone, message). Ces données sont utilisées exclusivement pour répondre à vos demandes
            et ne sont pas cédées à des tiers.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés,
            vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant :
            <a href="mailto:denys@aioperations.studio"> denys@aioperations.studio</a>.
          </p>
          <p>
            Le site utilise des cookies techniques strictement nécessaires à son fonctionnement.
            Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement explicite.
          </p>
        </section>

        <section className="ml-section">
          <h2>6. Limitation de responsabilité</h2>
          <p>
            AI Operations Studio s'efforce de fournir des informations exactes et à jour sur ce site.
            Toutefois, des erreurs ou omissions peuvent survenir. AI Operations Studio ne peut garantir
            l'exactitude, la complétude ou l'actualité des informations diffusées et décline toute responsabilité
            pour tout dommage résultant de l'utilisation de ces informations.
          </p>
        </section>

        <section className="ml-section">
          <h2>7. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français.
            En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>

      <style jsx global>{`
        .ml-wrapper {
          max-width: 780px;
          margin: 0 auto;
        }
        .ml-title {
          font-size: 2.5rem;
          color: white;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .ml-updated {
          font-size: 0.85rem;
          color: var(--text-dim);
          margin-bottom: 3.5rem;
        }
        .ml-section {
          margin-bottom: 2.75rem;
          padding-bottom: 2.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .ml-section:last-child {
          border-bottom: none;
        }
        .ml-section h2 {
          font-size: 1.15rem;
          color: var(--secondary);
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .ml-section p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 0.85rem;
        }
        .ml-section p:last-child {
          margin-bottom: 0;
        }
        .ml-section ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        .ml-section li {
          font-size: 0.95rem;
          color: var(--text-muted);
          padding-left: 1rem;
          border-left: 2px solid rgba(14, 165, 233, 0.2);
          line-height: 1.6;
        }
        .ml-section a {
          color: var(--secondary);
          text-decoration: underline;
          text-decoration-color: rgba(14, 165, 233, 0.3);
        }
        .ml-section a:hover {
          text-decoration-color: var(--secondary);
        }
      `}</style>
    </div>
  );
}
