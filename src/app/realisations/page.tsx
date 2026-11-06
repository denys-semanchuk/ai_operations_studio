import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { realisations } from "@/lib/realisations";
import s from "@/components/realisations/realisations.module.css";

const title = "Réalisations : sites et systèmes pour agences immobilières";
const description =
  "Projets livrés par AI Operations Studio pour des agences immobilières : ce qui a été fait, en combien de temps, avec quels résultats.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/realisations" },
  openGraph: { title, description, url: "/realisations" },
  twitter: { title, description },
};

export default function RealisationsPage() {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <div className={s.secHead}>
          <h1 className={s.h2}>Réalisations</h1>
          <p>Des projets livrés pour des agences immobilières. Chaque chiffre vient du projet.</p>
        </div>
        <ul className={s.cards}>
          {realisations.map((r) => (
            <li key={r.slug}>
              <article className={s.card}>
                <div className={s.cardImg}>
                  <Image src={r.image.src} alt="" fill sizes="(max-width: 860px) 92vw, 580px" />
                </div>
                <div className={s.cardBody}>
                  <p className={s.cardMeta}>
                    {r.client} · {r.lieu}
                  </p>
                  <h2 className={s.cardTitle}>
                    <Link href={`/realisations/${r.slug}`}>{r.titre}</Link>
                  </h2>
                  <ul className={s.cardPoints}>
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <span className={s.cardMore} aria-hidden="true">
                    Lire le cas →
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
