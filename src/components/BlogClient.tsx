"use client";

import { m } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import { blogPosts as articles } from "@/lib/blog-posts";
import { useHasMounted } from "@/lib/useHasMounted";

const tagColors: Record<string, string> = {
  Tutoriel: "rgba(14, 165, 233, 0.1)",
  "Étude de cas": "rgba(16, 185, 129, 0.1)",
  Comparatif: "rgba(99, 102, 241, 0.1)",
};
const tagBorders: Record<string, string> = {
  Tutoriel: "rgba(14, 165, 233, 0.25)",
  "Étude de cas": "rgba(16, 185, 129, 0.25)",
  Comparatif: "rgba(99, 102, 241, 0.25)",
};
const tagText: Record<string, string> = {
  Tutoriel: "#0ea5e9",
  "Étude de cas": "#10b981",
  Comparatif: "#818cf8",
};

export default function BlogClient() {
  const hasMounted = useHasMounted();
  return (
    <div className="page-wrapper container">
      <m.div
        className="blog-header"
        initial={hasMounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label text-gradient">Ressources gratuites</span>
        <h1 className="blog-title font-primary">
          Automatisation IA<br />pour l'Immobilier
        </h1>
        <p className="blog-subtitle">
          Guides pratiques, études de cas et stratégies concrètes pour automatiser
          vos opérations et récupérer 10 à 20 heures par semaine.
        </p>
      </m.div>

      <div className="blog-grid">
        {articles.map((article, idx) => (
          <m.div
            key={article.slug}
            initial={hasMounted ? { opacity: 0, y: 30 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <TiltCard className={`blog-card ${article.comingSoon ? "blog-card-soon" : ""}`}>
              <div className="blog-card-meta">
                <span
                  className="blog-tag"
                  style={{
                    background: tagColors[article.tag],
                    border: `1px solid ${tagBorders[article.tag]}`,
                    color: tagText[article.tag],
                  }}
                >
                  <Tag size={11} />
                  {article.tag}
                </span>
                <span className="blog-read-time">
                  <Clock size={12} />
                  {article.readTime}
                </span>
              </div>

              <h2 className="blog-card-title">{article.title}</h2>
              <p className="blog-card-excerpt">{article.excerpt}</p>

              <div className="blog-card-footer">
                <span className="blog-date">{article.date}</span>
                {article.comingSoon ? (
                  <span className="blog-soon-badge">Bientôt disponible</span>
                ) : (
                  <Link
                    href={`/blog/${article.slug}`}
                    className="blog-read-link"
                    aria-label={`Lire : ${article.title}`}
                  >
                    <span>Lire l'article</span>
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </TiltCard>
          </m.div>
        ))}
      </div>

      <m.div
        className="blog-cta"
        initial={hasMounted ? { opacity: 0, y: 20 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="blog-cta-text">
          Vous souhaitez mettre en place ces automatisations dans votre agence ?
        </p>
        <Link href="/contact" className="btn btn-primary shine-hover">
          <span>Réserver l'audit gratuit · 30 min</span>
          <ArrowRight size={16} />
        </Link>
      </m.div>


    </div>
  );
}
