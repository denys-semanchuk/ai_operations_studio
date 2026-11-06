import Image from "next/image";
import { loger9 } from "@/lib/realisations";
import s from "./realisations.module.css";

// Aperçu simplifié de la page d'accueil de loger9.fr : même logo, même titre,
// même photo, même navigation que le site en ligne (relevés le 06/11/2026).
// C'est un dessin, pas une capture : la légende le dit, et le lien « Voir
// loger9.fr » mène au vrai site.
function LogoMark() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M6 31c5-2.6 9.5-2.6 16-2.6s11 0 16 2.6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22 28.4V13.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="11.5" y="12" width="7.2" height="16.4" rx="1.4" stroke="currentColor" strokeWidth="2.4" />
      <rect x="25.3" y="7.5" width="7.2" height="20.9" rx="1.4" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export default function Loger9Mockup({ priority = false, captionClassName }: { priority?: boolean; captionClassName?: string }) {
  return (
    <figure className={s.figure}>
      <div className={s.browser}>
        <div className={s.bar} aria-hidden="true">
          <span className={s.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={s.url}>{loger9.urlLabel}</span>
        </div>
        <div className={s.screen} aria-hidden="true">
          <div className={s.siteHead}>
            <span className={s.brand}>
              <LogoMark />
              <span>
                <span className={s.brandName}>
                  Loger<i> 9</i>
                </span>
                <span className={s.tagline}>L&apos;immobilier du Neuf</span>
              </span>
            </span>
            <span className={s.siteNav}>
              <span>Logements</span>
              <span>Financement</span>
              <span>Guides du neuf</span>
              <span>L&apos;agence</span>
            </span>
            <span className={s.siteBtn}>Prendre rendez-vous</span>
          </div>
          <div className={s.siteHero}>
            <Image
              src={loger9.image.src}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 960px) 92vw, 560px"
            />
            <div className={s.siteHeroCopy}>
              <span className={s.siteH1}>Votre bien neuf partout en France</span>
              <span className={s.siteSearch}>
                Ville ou code postal <b>Rechercher</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={captionClassName ?? s.caption}>
        Aperçu simplifié de la page d&apos;accueil de {loger9.urlLabel}.
      </figcaption>
    </figure>
  );
}
