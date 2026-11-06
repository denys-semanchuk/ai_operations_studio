import { Metadata } from "next";
import Link from "next/link";
import { loger9 } from "@/lib/realisations";
import Loger9Mockup from "@/components/realisations/Loger9Mockup";
import s from "@/components/realisations/realisations.module.css";

const title = "Loger 9 : site d'agence immobilière en ligne en deux semaines";
const description =
  "Étude de cas : nouveau site pour Loger 9, agence immobilière à Bagnolet. Annonces importées sans ressaisie, prise de rendez-vous sur chaque page, note PageSpeed mobile de 99/100.";
const path = `/realisations/${loger9.slug}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "article" },
  twitter: { title, description },
};

const FAITS = [
  {
    titre: "Catalogue des biens",
    texte:
      "Les annonces sont importées depuis la plateforme de diffusion de l'agence : photos, prix, descriptions. Rien à ressaisir. Tri par date ou par commune.",
  },
  {
    titre: "Prise de rendez-vous",
    texte:
      "Un bouton sur chaque page. La demande part par e-mail au conseiller et le visiteur reçoit une confirmation. Un bouton WhatsApp en plus.",
  },
  {
    titre: "Calculateur de budget",
    texte:
      "Le visiteur estime sa capacité d'emprunt, puis prend rendez-vous. L'agence règle elle-même les taux et les frais.",
  },
  {
    titre: "Contenu géré par l'agence",
    texte:
      "Biens, guides et témoignages se modifient depuis un espace d'administration. Le site se met à jour en quelques secondes.",
  },
  {
    titre: "Guides pour les acheteurs",
    texte: "PTZ, TVA réduite, frais de notaire, VEFA : des guides vérifiés sur les textes officiels.",
  },
  {
    titre: "Référencement",
    texte:
      "Pages par ville et par département, plan du site, Search Console. Les adresses de l'ancien site renvoient vers les nouvelles.",
  },
];

const ETAPES = [
  { date: "27 août 2026", texte: "Accord de l'agence, début du projet." },
  { date: "6 septembre", texte: "Site terminé. Les guides sont relus et validés par l'agence." },
  { date: "10 septembre", texte: "Mise en ligne sur loger9.fr. Les anciennes adresses sont redirigées." },
  { date: "Octobre", texte: "Optimisation : note PageSpeed mobile de 99/100, site déclaré à Google (Search Console)." },
];

const STACK = ["Next.js", "Sanity", "Vercel", "Resend"];

export default function Loger9Page() {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <nav className={s.crumbs} aria-label="Fil d'Ariane">
          <Link href="/realisations">Réalisations</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{loger9.client}</span>
        </nav>

        <section className={s.hero} aria-labelledby="h-cas">
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span className={s.pin} aria-hidden="true" />
              {loger9.lieu}
            </p>
            <h1 className={s.h1} id="h-cas">
              {loger9.client}&nbsp;: {loger9.titre.charAt(0).toLowerCase() + loger9.titre.slice(1)}
            </h1>
            <p className={s.lede}>{loger9.resume}</p>
            <div className={s.heroCta}>
              <a className={`${s.btn} ${s.btnLight}`} href={loger9.url} target="_blank" rel="noopener noreferrer">
                Voir {loger9.urlLabel}
              </a>
              <Link className={`${s.btn} ${s.btnGhost}`} href="/contact">
                Le même pour votre agence
              </Link>
            </div>
          </div>
          <Loger9Mockup priority />
        </section>

        <ul className={s.stats}>
          {loger9.stats.map((st) => (
            <li key={st.label}>
              <b>{st.value}</b>
              <span>{st.label}</span>
            </li>
          ))}
        </ul>
        <p className={s.source}>Notes PageSpeed Insights mesurées sur mobile en octobre 2026.</p>

        <section className={s.sec} aria-labelledby="h-fait">
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-fait">
              Ce que j&apos;ai mis en place
            </h2>
            <p>Un site à son nom, qui montre ses biens et transforme une visite en rendez-vous.</p>
          </div>
          <ul className={s.grid}>
            {FAITS.map((f) => (
              <li key={f.titre}>
                <b>{f.titre}</b>
                <p>{f.texte}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.sec} aria-labelledby="h-etapes">
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-etapes">
              Le déroulé
            </h2>
          </div>
          <ol className={s.timeline}>
            {ETAPES.map((e) => (
              <li key={e.date}>
                <time>{e.date}</time>
                <p>{e.texte}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.sec} aria-labelledby="h-stack">
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-stack">
              Technique
            </h2>
          </div>
          <ul className={s.chips}>
            {STACK.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className={s.note}>
            Le contenu et le nom de domaine appartiennent à l&apos;agence.
          </p>
        </section>

        <section className={s.cta} aria-labelledby="h-cta">
          <div>
            <h2 className={s.h2} id="h-cta">
              Un site comme celui-ci pour votre agence&nbsp;?
            </h2>
            <p>Audit gratuit : un appel de 20 minutes, puis un point chiffré sur les demandes de votre agence.</p>
          </div>
          <div className={s.ctaBox}>
            <Link className={`${s.btn} ${s.btnLight}`} href="/contact">
              Réserver l&apos;audit gratuit
            </Link>
            <Link className={`${s.btn} ${s.btnGhost}`} href="/systeme">
              Voir l&apos;offre complète
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
