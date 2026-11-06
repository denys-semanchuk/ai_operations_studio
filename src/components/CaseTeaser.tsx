import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loger9 } from "@/lib/realisations";
import Loger9Mockup from "@/components/realisations/Loger9Mockup";
import s from "./CaseTeaser.module.css";

// Bloc « Réalisation » de l'accueil : renvoie vers /realisations/loger-9.
// Les chiffres viennent de src/lib/realisations.ts, comme sur la page du cas.
export default function CaseTeaser() {
  return (
    <section className={s.section} aria-labelledby="h-realisation">
      <div className={`${s.panel} glass-card`}>
        <div className={s.copy}>
          <span className="section-label text-gradient">Réalisation</span>
          <h2 className={`${s.title} font-primary`} id="h-realisation">
            {loger9.client}&nbsp;: en ligne en deux semaines
          </h2>
          <p className={s.text}>
            Nouveau site pour une agence immobilière de Bagnolet : annonces importées sans ressaisie, prise de
            rendez-vous sur chaque page, contenu modifiable par l&apos;agence.
          </p>
          <ul className={s.stats}>
            {loger9.stats.slice(0, 3).map((st) => (
              <li key={st.label}>
                <b>{st.value}</b>
                <span>{st.label}</span>
              </li>
            ))}
          </ul>
          <div>
            <Link href={`/realisations/${loger9.slug}`} className="btn btn-primary">
              <span>Voir le cas</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <Loger9Mockup captionClassName={s.caption} />
      </div>
    </section>
  );
}
