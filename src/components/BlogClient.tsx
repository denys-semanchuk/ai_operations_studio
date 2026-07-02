"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import TiltCard from "@/components/TiltCard";
import { blogPosts as articles } from "@/lib/blog-posts";

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
  return (
    <div className="page-wrapper container">
      <motion.div
        className="blog-header"
        initial={{ opacity: 0, y: 20 }}
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
      </motion.div>

      <div className="blog-grid">
        {articles.map((article, idx) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 30 }}
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
          </motion.div>
        ))}
      </div>

      <motion.div
        className="blog-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="blog-cta-text">
          Vous souhaitez mettre en place ces automatisations dans votre agence ?
        </p>
        <Link href="/contact" className="btn btn-primary shine-hover">
          <span>Réserver l'audit gratuit · 30 min</span>
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      <style jsx global>{`
        .blog-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .blog-title {
          font-size: 2.75rem;
          color: white;
          margin-top: 0.5rem;
          margin-bottom: 1.25rem;
          letter-spacing: -0.025em;
          line-height: 1.15;
        }
        .blog-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding: 2rem !important;
          height: 100%;
        }
        .blog-card-soon {
          opacity: 0.55;
        }

        .blog-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .blog-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .blog-read-time {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-dim);
        }

        .blog-card-title {
          font-size: 1.2rem;
          color: white;
          line-height: 1.35;
          letter-spacing: -0.01em;
          flex-grow: 1;
        }
        .blog-card-excerpt {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.65;
        }

        .blog-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .blog-date {
          font-size: 0.8rem;
          color: var(--text-dim);
        }
        .blog-read-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--secondary);
          transition: gap 0.2s ease;
        }
        .blog-read-link:hover {
          gap: 0.7rem;
        }
        .blog-soon-badge {
          font-size: 0.78rem;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          padding: 0.2rem 0.6rem;
        }

        .blog-cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 3rem;
          border-radius: 20px;
          border: 1px solid rgba(14, 165, 233, 0.12);
          background: linear-gradient(135deg, rgba(15, 20, 50, 0.4) 0%, rgba(5, 8, 22, 0.4) 100%);
        }
        .blog-cta-text {
          font-size: 1.1rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .blog-header {
            margin-bottom: 2.5rem;
          }
          .blog-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .blog-title {
            font-size: 2rem;
          }
          .blog-subtitle {
            font-size: 1rem;
          }
          .blog-cta {
            padding: 2rem;
            gap: 1.25rem;
          }
          .blog-cta-text {
            font-size: 1rem;
          }
        }
        @media (max-width: 600px) {
          .blog-card-meta {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .blog-card-footer {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
        }
        @media (max-width: 480px) {
          .blog-header {
            margin-bottom: 2rem;
          }
          .blog-title {
            font-size: 1.65rem;
          }
          .blog-subtitle {
            font-size: 0.95rem;
          }
          .blog-card {
            padding: 1.5rem !important;
          }
          .blog-card-title {
            font-size: 1.1rem;
          }
          .blog-cta {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
