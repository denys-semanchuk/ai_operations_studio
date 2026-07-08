import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.filter((p) => !p.comingSoon).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | AI Operations Studio`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, type: "article" },
    twitter: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "Denys Semanchuk" },
    publisher: { "@type": "Organization", name: "AI Operations Studio" },
    mainEntityOfPage: `https://www.ai-operations.studio/blog/${post.slug}`,
  };

  return (
    <div className="page-wrapper container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <div className="article-wrapper">
        <Link href="/blog" className="article-back">
          <ArrowLeft size={14} />
          <span>Retour au blog</span>
        </Link>

        <div className="article-meta">
          <span className="article-tag">
            <Tag size={11} />
            {post.tag}
          </span>
          <span className="article-read-time">
            <Clock size={12} />
            {post.readTime}
          </span>
          <span className="article-date">{post.date}</span>
        </div>

        <h1 className="article-title font-primary">{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>

        <div className="article-body">
          {post.body?.map((block, idx) =>
            block.startsWith("## ") ? (
              <h2 key={idx}>{block.slice(3)}</h2>
            ) : (
              <p key={idx}>{block}</p>
            )
          )}
        </div>

        <div className="article-cta">
          <p className="article-cta-text">
            Vous souhaitez mettre en place ce type d&apos;automatisation dans votre agence ?
          </p>
          <Link href="/contact" className="btn btn-primary shine-hover">
            <span>Réserver l&apos;audit gratuit · 30 min</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
