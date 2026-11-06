"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useMatchMedia } from "@/lib/useMatchMedia";
import s from "./SystemeClient.module.css";

const EMAIL = "denys@ai-operations.studio";
const SETUP_PRICE = 2000;

function Check({ accent = false }: { accent?: boolean }) {
  return (
    <span className={`${s.check} ${accent ? s.checkAccent : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

/* ---------------- Hero lead card ---------------- */

const TRAIL = [
  { t: "21:47", title: "Demande reçue", sub: "Formulaire d'estimation du site" },
  {
    t: "21:49",
    title: "Réponse envoyée sur WhatsApp",
    bubble: "Bonjour Madame Martin, merci pour votre demande. Jeudi 10 h ou vendredi 14 h pour l'estimation ?",
  },
  { t: "21:49", title: "Classée : vendeur", sub: "Projet de vente sous 3 mois" },
  { t: "21:56", title: "Rendez-vous d'estimation pris", sub: "Jeudi 10 h, dans l'agenda de Julien" },
  { t: "J+1", title: "Relance automatique", sub: "Rappel du rendez-vous la veille" },
];

function LeadCard() {
  // null = parcours terminé (état rendu côté serveur et sans JS)
  const [active, setActive] = useState<number | null>(null);
  const [thumpKey, setThumpKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(null);
      return;
    }
    setActive(-1);
    TRAIL.forEach((_, i) => {
      timers.current.push(setTimeout(() => setActive(i), 450 + i * 620));
    });
    timers.current.push(
      setTimeout(() => {
        setActive(null);
        setThumpKey((k) => k + 1);
      }, 450 + TRAIL.length * 620 + 250)
    );
  }, []);

  useEffect(() => {
    const t = setTimeout(play, 0);
    const list = timers.current;
    return () => {
      clearTimeout(t);
      list.forEach(clearTimeout);
    };
  }, [play]);

  const stateOf = (i: number) => {
    if (active === null) return undefined;
    if (i < active) return undefined;
    if (i === active) return "now";
    return "wait";
  };

  return (
    <article className={s.lead} aria-label="Exemple : une demande traitée par le système">
      <div>
        <div className={s.leadTop}>
          <span className={s.lchip}>Demande d&apos;estimation</span>
          <span className={`${s.lchip} ${s.lchipSoft}`}>Exemple</span>
        </div>
        <h3 className={s.leadTitle}>Appartement 3 pièces, Argenteuil</h3>
        <p className={s.who}>Mme Martin, propriétaire, veut vendre</p>
      </div>
      <ol className={s.trail}>
        {TRAIL.map((e, i) => (
          <li key={i} data-s={stateOf(i)}>
            <time>{e.t}</time>
            <span className={s.rail}>
              <span className={s.dot} />
            </span>
            <div className={s.ev}>
              <b>{e.title}</b>
              {e.bubble ? <span className={s.bubble}>{e.bubble}</span> : <span>{e.sub}</span>}
            </div>
          </li>
        ))}
      </ol>
      <div className={s.leadFoot}>
        <div>
          <p className={s.speed}>
            Temps de réponse : <b>2 min</b>
          </p>
          <button className={s.replay} type="button" onClick={play}>
            Revoir le parcours
          </button>
        </div>
        <span
          key={thumpKey}
          className={`${s.stamp} ${active !== null ? s.stampDim : ""} ${thumpKey > 0 ? s.thump : ""}`}
        >
          Mandat signé
        </span>
      </div>
    </article>
  );
}

/* ---------------- Calculator ---------------- */

const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

function Calculator() {
  const [leads, setLeads] = useState(60);
  const [lost, setLost] = useState(25);
  const [conv, setConv] = useState(8);
  const [fee, setFee] = useState(9000);

  const perMonth = leads * (lost / 100) * (conv / 100);
  const perYear = perMonth * 12;
  const money = Math.round((perYear * fee) / 100) * 100;
  const share = Math.round((SETUP_PRICE / fee) * 100);

  let monthTxt: string;
  if (perMonth === 0) monthTxt = "Aucune demande perdue : votre agence répond déjà à tout.";
  else if (perMonth < 1) monthTxt = `Soit environ un mandat tous les ${nf.format(Math.max(1, Math.round(1 / perMonth)))} mois.`;
  else monthTxt = `Soit environ ${nf1.format(perMonth)} mandat${perMonth >= 2 ? "s" : ""} par mois.`;
  const setupTxt =
    share <= 100
      ? ` La mise en place démarre à 2 000 €, soit ${share} % des honoraires d’une seule vente.`
      : " La mise en place démarre à 2 000 €.";

  const fields = [
    { id: "r-leads", label: "Demandes reçues par mois", hint: "Site, portails, formulaires d'estimation", min: 10, max: 300, step: 5, value: leads, set: setLeads, out: nf.format(leads) },
    { id: "r-lost", label: "Restées sans suite ou traitées trop tard", min: 0, max: 60, step: 1, value: lost, set: setLost, out: `${lost} %` },
    { id: "r-conv", label: "Demandes qui deviennent un mandat", min: 1, max: 30, step: 1, value: conv, set: setConv, out: `${conv} %` },
    { id: "r-fee", label: "Honoraires moyens par vente", min: 2000, max: 25000, step: 500, value: fee, set: setFee, out: `${nf.format(fee)} €` },
  ];

  return (
    <section className={s.sec} id="pertes" aria-labelledby="h-pertes">
      <div className={`${s.wrap} ${s.calc}`}>
        <div>
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-pertes">
              Combien de mandats vous échappent&nbsp;?
            </h2>
            <p>
              Une demande d&apos;estimation arrive un dimanche soir. Si personne ne répond avant lundi midi, le vendeur a
              peut-être déjà appelé une autre agence. Réglez les curseurs sur vos chiffres.
            </p>
          </div>
          <div className={s.sliders}>
            {fields.map((f) => (
              <div className={s.field} key={f.id}>
                <div className={s.fieldTop}>
                  <label htmlFor={f.id}>{f.label}</label>
                  <output htmlFor={f.id}>{f.out}</output>
                </div>
                <input
                  className={s.range}
                  type="range"
                  id={f.id}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={f.value}
                  onChange={(e) => f.set(Number(e.target.value))}
                />
                {f.hint && <small>{f.hint}</small>}
              </div>
            ))}
          </div>
        </div>

        <aside className={s.result} aria-live="polite" aria-label="Résultat de l'estimation">
          <div className={s.bigPair}>
            <div className={s.big}>
              <b>{perYear < 10 ? nf1.format(perYear) : nf.format(Math.round(perYear))}</b>
              <span>mandats manqués par an</span>
            </div>
            <div className={`${s.big} ${s.money}`}>
              <b>{nf.format(money)}&nbsp;€</b>
              <span>d&apos;honoraires en jeu par an</span>
            </div>
          </div>
          <p className={s.math}>
            {monthTxt}
            {setupTxt}
          </p>
          <p className={s.note}>
            Estimation à partir de vos réglages. L&apos;audit gratuit la remplace par les vrais chiffres de votre agence.
          </p>
          <a className={`${s.btn} ${s.btnAccent}`} href="#audit">
            Vérifier avec l&apos;audit gratuit
          </a>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- System steps ---------------- */

const STEPS = [
  { title: "Un site qui attire les vendeurs", desc: "Rapide, pensé pour Google. Vos annonces s'importent toutes seules." },
  { title: "Toutes les demandes au même endroit", desc: "Site, portails, formulaires : plus rien ne se perd dans une boîte mail." },
  { title: "Réponse en quelques minutes", desc: "Par SMS, WhatsApp ou e-mail, même le soir et le week-end." },
  { title: "Tri automatique", desc: "Vendeur, acheteur ou simple curieux : vos agents savent qui rappeler en premier." },
  { title: "Rendez-vous d'estimation pris", desc: "Le vendeur choisit un créneau, il s'inscrit dans l'agenda de l'agent." },
  { title: "Relances jusqu'au mandat", desc: "Les relances partent toutes seules. Aucun vendeur n'est oublié." },
];

function Mock({ step }: { step: number }) {
  if (step === 0)
    return (
      <div className={s.mock}>
        <div className={s.mockBar}>
          <span className={s.url}>votre-agence.fr</span>
          <span className={s.tiny}>Exemple</span>
        </div>
        <div className={s.mockBody}>
          <div className={s.siteHero}>
            <strong>Combien vaut votre bien à Argenteuil&nbsp;?</strong>
            <span className={s.tiny}>Estimation gratuite par un agent du quartier</span>
            <span className={s.fakeBtn}>Estimer mon bien</span>
          </div>
          {[
            ["Maison 5 pièces", "Bezons, 112 m²", "389 000 €"],
            ["Appartement 2 pièces", "Argenteuil, 46 m²", "198 000 €"],
            ["Studio", "Colombes, 24 m²", "139 000 €"],
          ].map(([a, b, c]) => (
            <div className={s.listing} key={a}>
              <span className={s.ph} />
              <div>
                <b>{a}</b>
                <span>{b}</span>
              </div>
              <em>{c}</em>
            </div>
          ))}
          <p className={s.tiny}>Annonces importées automatiquement depuis votre logiciel</p>
        </div>
      </div>
    );
  if (step === 1)
    return (
      <div className={s.mock}>
        <div className={s.mockBar}>
          <b>Demandes</b>
          <span className={s.tiny}>4 nouvelles aujourd&apos;hui</span>
        </div>
        <div className={s.mockBody}>
          {[
            ["Site", "Mme Martin", "Estimation, 3 pièces Argenteuil", "21:47", true],
            ["Portail", "M. Diallo", "Visite, 2 pièces Argenteuil", "20:12", false],
            ["Site", "Mme Roche", "Estimation, maison Bezons", "18:30", false],
            ["Portail", "M. Petit", "Question sur le prix, studio Colombes", "17:05", false],
          ].map(([src, name, what, time, isNew]) => (
            <div className={`${s.row} ${isNew ? s.rowNew : ""}`} key={String(name)}>
              <span className={`${s.src} ${src === "Portail" ? s.portal : ""}`}>{src}</span>
              <div>
                <b>{name}</b>
                <span>{what}</span>
              </div>
              <time>{time}</time>
            </div>
          ))}
          <p className={s.tiny}>Chaque demande a un statut : nouvelle, répondue, rendez-vous, mandat.</p>
        </div>
      </div>
    );
  if (step === 2)
    return (
      <div className={s.mock}>
        <div className={s.mockBar}>
          <b>Réponse automatique</b>
          <span className={s.tiny}>Exemple</span>
        </div>
        <div className={s.mockBody}>
          <div className={s.chat}>
            <div className={`${s.msg} ${s.msgIn}`}>
              Bonjour, je souhaite faire estimer mon appartement à Argenteuil.<small>21:47</small>
            </div>
            <div className={`${s.msg} ${s.msgOut}`}>
              Bonjour Madame Martin, merci pour votre demande. Un agent peut passer jeudi à 10 h ou vendredi à 14 h. Quel
              créneau vous convient&nbsp;?<small>21:49, envoyé automatiquement</small>
            </div>
            <div className={`${s.msg} ${s.msgIn}`}>
              Jeudi 10 h, parfait.<small>21:55</small>
            </div>
          </div>
          <div className={s.channels}>
            <span className={s.chip}>SMS</span>
            <span className={s.chip}>WhatsApp</span>
            <span className={s.chip}>E-mail</span>
          </div>
        </div>
      </div>
    );
  if (step === 3)
    return (
      <div className={s.mock}>
        <div className={s.mockBar}>
          <b>Tri des demandes</b>
          <span className={s.tiny}>Exemple sur un mois</span>
        </div>
        <div className={s.mockBody}>
          <div className={s.cols}>
            <div className={`${s.col} ${s.colHot}`}>
              <div className={s.colH}>
                Vendeurs <i>12</i>
              </div>
              <span className={s.cardMini}>Mme Martin, 3 p.</span>
              <span className={s.cardMini}>Mme Roche, maison</span>
              <span className={s.cardMini}>M. Leroy, 4 p.</span>
            </div>
            <div className={s.col}>
              <div className={s.colH}>
                Acheteurs <i>31</i>
              </div>
              <span className={s.cardMini}>M. Diallo, 2 p.</span>
              <span className={s.cardMini}>Mme Nguyen, maison</span>
            </div>
            <div className={s.col}>
              <div className={s.colH}>
                Simples curieux <i>17</i>
              </div>
              <span className={s.cardMini}>M. Petit, prix</span>
            </div>
          </div>
          <p className={s.tiny}>Les vendeurs passent en premier : ce sont eux qui donnent les mandats.</p>
        </div>
      </div>
    );
  if (step === 4) {
    const grid: [string, ("" | "busy" | "slot")[]][] = [
      ["9 h", ["busy", "", "busy", "", ""]],
      ["10 h", ["", "busy", "", "slot", ""]],
      ["11 h", ["busy", "", "", "", "busy"]],
      ["14 h", ["", "", "busy", "busy", ""]],
      ["15 h", ["busy", "", "", "", ""]],
    ];
    return (
      <div className={s.mock}>
        <div className={s.mockBar}>
          <b>Agenda de Julien</b>
          <span className={s.tiny}>Semaine 46</span>
        </div>
        <div className={s.mockBody}>
          <div className={s.week} aria-hidden="true">
            <span />
            {["Lun", "Mar", "Mer", "Jeu", "Ven"].map((d) => (
              <span className={s.h} key={d}>
                {d}
              </span>
            ))}
            {grid.map(([t, cells]) => [
              <span className={s.t} key={t}>
                {t}
              </span>,
              ...cells.map((c, k) => (
                <span key={`${t}-${k}`} className={`${s.c} ${c === "busy" ? s.busy : ""} ${c === "slot" ? s.slot : ""}`}>
                  {c === "slot" ? "Estimation Mme Martin" : null}
                </span>
              )),
            ])}
          </div>
          <div className={s.confirm}>
            <Check />
            Confirmation envoyée à Mme Martin et à Julien
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={s.mock}>
      <div className={s.mockBar}>
        <b>Relances</b>
        <span className={s.tiny}>Exemple</span>
      </div>
      <div className={s.mockBody}>
        <ol className={s.seq}>
          <li>
            <span className={s.j}>J+1</span>
            <div>
              <b>Rappel du rendez-vous</b>
              <span>SMS</span>
            </div>
            <span className={s.state}>Envoyé</span>
          </li>
          <li>
            <span className={s.j}>J+3</span>
            <div>
              <b>Suivi après l&apos;estimation</b>
              <span>E-mail</span>
            </div>
            <span className={s.state}>Envoyé</span>
          </li>
          <li>
            <span className={s.j}>J+7</span>
            <div>
              <b>Nouvelle relance</b>
              <span>WhatsApp</span>
            </div>
            <span className={`${s.state} ${s.next}`}>Programmé</span>
          </li>
          <li className={s.win}>
            <span className={s.j}>J+9</span>
            <div>
              <b>Mandat signé</b>
              <span>Le vendeur a choisi votre agence</span>
            </div>
            <span className={s.state}>Signé</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function SystemSteps() {
  const [step, setStep] = useState(0);
  const isMobile = useMatchMedia("(max-width: 860px)");
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % STEPS.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + STEPS.length) % STEPS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = STEPS.length - 1;
    if (n !== null) {
      e.preventDefault();
      setStep(n);
      btns.current[n]?.focus();
    }
  };

  return (
    <section className={s.sec} id="systeme" aria-labelledby="h-sys">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <h2 className={s.h2} id="h-sys">
            Le système Lead → Mandat
          </h2>
          <p>Six étapes, de la première demande au mandat signé. Choisissez une étape pour voir l&apos;écran correspondant.</p>
        </div>

        <div className={s.sys}>
          <ol className={s.steps} role="tablist" aria-label="Étapes du système" aria-orientation="vertical">
            {STEPS.map((st, i) => (
              <li key={i}>
                <button
                  ref={(el) => {
                    btns.current[i] = el;
                  }}
                  className={s.stepBtn}
                  role="tab"
                  id={`sys-tab-${i}`}
                  aria-selected={step === i}
                  aria-controls="sys-screen"
                  tabIndex={step === i ? 0 : -1}
                  onClick={() => setStep(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className={s.n}>{i + 1}</span>
                  <span>
                    <b>{st.title}</b>
                    <span className={s.d}>{st.desc}</span>
                  </span>
                </button>
                {isMobile && step === i && (
                  <div className={s.screenInline} id="sys-screen" role="tabpanel" aria-labelledby={`sys-tab-${i}`}>
                    <Mock step={i} />
                  </div>
                )}
              </li>
            ))}
          </ol>

          {!isMobile && (
            <div className={s.screen} id="sys-screen" role="tabpanel" aria-labelledby={`sys-tab-${step}`}>
              <Mock step={step} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

export default function SystemeClient() {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  const copyMail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied("ok");
      setTimeout(() => setCopied("idle"), 1800);
    } catch {
      setCopied("fail");
    }
  };

  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <div className={s.hero}>
          <div className={s.heroCopy}>
            <p className={s.audience}>
              <span className={s.pin} aria-hidden="true" />
              Agences immobilières d&apos;Île-de-France, de 3 à 15 agents
            </p>
            <h1 className={s.h1}>Vos demandes deviennent des mandats.</h1>
            <p className={s.lede}>
              Chaque prospect reçoit une réponse en quelques minutes, il est relancé automatiquement, et vous voyez tout
              au même endroit.
            </p>
            <div className={s.heroCta}>
              <a className={`${s.btn} ${s.btnLight}`} href="#audit">
                Demander l&apos;audit gratuit
              </a>
              <a className={`${s.btn} ${s.btnGhost}`} href="#systeme">
                Voir le système
              </a>
            </div>
          </div>
          <LeadCard />
        </div>
      </div>

      <Calculator />
      <SystemSteps />

      <section className={s.sec} id="offres-systeme" aria-labelledby="h-offres">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-offres">
              Les offres
            </h2>
            <p>Je mets le système en place une fois. Ensuite, il tourne et je l&apos;améliore chaque mois.</p>
          </div>
          <div className={s.plans}>
            <article className={`${s.plan} ${s.planFirst}`}>
              <p className={s.when}>
                <span className={s.bul} aria-hidden="true" />
                Mise en place
              </p>
              <h3 className={s.planTitle}>Système Lead → Mandat</h3>
              <p className={s.price}>
                <span>à partir de</span>
                <b>2&nbsp;000&nbsp;€</b>
                <span>une fois</span>
              </p>
              <ul className={s.incl}>
                {[
                  "Site agence rapide, pensé pour Google, annonces importées automatiquement",
                  "Toutes les demandes (site, portails) au même endroit",
                  "Réponse automatique en quelques minutes par SMS, WhatsApp ou e-mail",
                  "Tri : vendeur, acheteur, simple curieux",
                  "Rendez-vous d'estimation pris dans l'agenda de l'agent",
                  "Relances automatiques jusqu'au mandat",
                ].map((t) => (
                  <li key={t}>
                    <Check accent />
                    {t}
                  </li>
                ))}
              </ul>
            </article>

            <div className={s.then} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 12h15" />
                <path d="M14 6l6 6-6 6" />
              </svg>
              puis chaque mois
            </div>

            <article className={s.plan}>
              <p className={s.when}>
                <span className={s.bul} aria-hidden="true" />
                Chaque mois
              </p>
              <h3 className={s.planTitle}>Accompagnement mensuel</h3>
              <p className={s.price}>
                <span>à partir de</span>
                <b>800&nbsp;€</b>
                <span>par mois</span>
              </p>
              <ul className={s.incl}>
                {[
                  "Le système tourne et je l'améliore chaque mois",
                  "Nouvelles automatisations selon vos besoins",
                  "Référencement local : Google Business Profile, pages par ville",
                  "Un rapport chaque mois",
                ].map((t) => (
                  <li key={t}>
                    <Check accent />
                    {t}
                  </li>
                ))}
              </ul>
              <figure className={s.report}>
                <figcaption>Le rapport mensuel (exemple, chiffres fictifs)</figcaption>
                <div className={s.kpis}>
                  {[
                    ["64", "demandes"],
                    ["19", "rendez-vous"],
                    ["6", "mandats"],
                    ["3 min", "temps de réponse"],
                  ].map(([v, l]) => (
                    <div className={s.kpi} key={l}>
                      <b>{v}</b>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </figure>
            </article>
          </div>
          <p className={s.vat}>TVA non applicable, art. 293 B du CGI. Le prix affiché est le prix payé.</p>
        </div>
      </section>

      <section className={s.sec} id="methode" aria-labelledby="h-methode">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-methode">
              Comment on démarre
            </h2>
            <p>Je commence par un audit gratuit : combien de demandes votre agence perd aujourd&apos;hui.</p>
          </div>
          <ol className={s.method}>
            <li>
              <span className={s.num}>1</span>
              <b>Un appel de 20 minutes</b>
              <p>Pour comprendre votre agence : d&apos;où viennent vos demandes, qui y répond, et en combien de temps.</p>
            </li>
            <li>
              <span className={s.num}>2</span>
              <b>Un audit offert</b>
              <p>Temps de réponse, demandes restées sans suite, mandats manqués. Vous recevez des chiffres concrets.</p>
            </li>
            <li>
              <span className={s.num}>3</span>
              <b>La mise en place</b>
              <p>Si le chiffre vous parle, je mets le système en place, puis je l&apos;accompagne chaque mois.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className={s.sec} id="exemple" aria-labelledby="h-exemple">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-exemple">
              Exemple&nbsp;: Loger&nbsp;9, Bagnolet
            </h2>
          </div>
          <div className={s.case}>
            <div className={s.caseBig}>
              <b>48</b>
              <span>annonces importées sans ressaisie</span>
            </div>
            <ul className={s.facts}>
              <li>
                <Check />
                Les annonces de l&apos;agence arrivent sur le site sans saisie manuelle
              </li>
              <li>
                <Check />
                Prise de rendez-vous sur chaque page, demande envoyée par e-mail au conseiller, bouton WhatsApp en plus
              </li>
              <li>
                <Check />
                Site en ligne en deux semaines, note PageSpeed mobile de 99/100
              </li>
            </ul>
          </div>
          <p className={s.caseMore}>
            <Link href="/realisations/loger-9">Voir le cas complet →</Link>
          </p>
        </div>
      </section>

      <section className={s.sec} id="questions" aria-labelledby="h-faq">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <h2 className={s.h2} id="h-faq">
              Questions fréquentes
            </h2>
          </div>
          <dl className={s.faq}>
            {[
              ["À qui s'adresse ce système ?", "Aux agences immobilières d'Île-de-France, de 3 à 15 agents, qui reçoivent des demandes par leur site et les portails."],
              ["Que contient l'audit gratuit ?", "Un appel de 20 minutes, puis un point chiffré : votre temps de réponse, les demandes restées sans suite et les mandats manqués."],
              ["D'où viennent les demandes ?", "De votre site et des portails. Elles arrivent toutes au même endroit, avec un statut pour chacune."],
              ["Que se passe-t-il chaque mois ?", "Le système tourne et je l'améliore : nouvelles automatisations, référencement local et un rapport avec vos demandes, rendez-vous, mandats et temps de réponse."],
              ["Les prix incluent-ils la TVA ?", "TVA non applicable, art. 293 B du CGI : le prix affiché est le prix payé."],
              ["Qui s'occupe de mon agence ?", "Moi, Denys Semanchuk, fondateur d'AI Operations Studio, basé à Bezons (Val-d'Oise). Un seul interlocuteur du premier appel au suivi mensuel."],
            ].map(([q, a]) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className={s.wrap}>
        <section className={s.audit} id="audit" aria-labelledby="h-audit">
          <div>
            <h2 className={s.h2} id="h-audit">
              Combien de demandes votre agence perd-elle aujourd&apos;hui&nbsp;?
            </h2>
            <p className={s.lede}>Audit offert : un appel de 20 minutes, puis un résultat chiffré pour votre agence.</p>
          </div>
          <div className={s.auditBox}>
            <Link className={`${s.btn} ${s.btnLight}`} href="/contact">
              Réserver l&apos;audit gratuit
            </Link>
            <div className={s.mail}>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button className={s.copy} type="button" onClick={copyMail}>
                {copied === "ok" ? "Copié" : copied === "fail" ? "Sélectionnez l’adresse" : "Copier"}
              </button>
            </div>
            <p className={s.auditSmall}>
              Ou sur{" "}
              <a href="https://www.linkedin.com/in/denys-semanchuk/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
