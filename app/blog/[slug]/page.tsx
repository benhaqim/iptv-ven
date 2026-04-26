import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { POSTS, type PostBlock } from "@/lib/posts";
import CTABanner from "@/components/site/CTABanner";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return buildMetadata({ title: "Article", path: `/blog/${params.slug}` });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
    imageAlt: post.title,
    type: "article",
    publishedTime: new Date(post.date).toISOString(),
    authors: [post.author],
    tags: post.tags,
  });
}

function renderBlock(b: PostBlock, i: number) {
  if (b.type === "p") return <p key={i}>{b.text}</p>;
  if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
  if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
  if (b.type === "blockquote") return <blockquote key={i}>{b.text}</blockquote>;
  if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
  return null;
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.cover}`,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    keywords: post.tags.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="single-hero">
        <div className="single-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt="" />
        </div>
        <div className="container">
          <Link href="/blog" className="single-back"><ArrowLeft size={16} /> All articles</Link>
          <div className="single-meta">
            <span className="cat">{post.cat}</span>
            <span style={{ width: 3, height: 3, background: "var(--text-mute)", borderRadius: "50%" }} />
            <span>{post.date}</span>
            <span style={{ width: 3, height: 3, background: "var(--text-mute)", borderRadius: "50%" }} />
            <span>{post.read}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <div className="author-row">
            <div className="avatar">{post.author.charAt(0)}</div>
            <div>
              <div className="name">{post.author}</div>
              <div className="role">{post.role}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="single-cover reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} />
        </div>
      </div>

      <div className="single-body">
        {post.body.map(renderBlock)}
        <div className="tags-row">
          {post.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
        </div>
      </div>

      <div className="related">
        <h3>Keep reading</h3>
        <div className="related-grid">
          {related.map((p) => (
            <Link key={p.slug} className="post-card" href={`/blog/${p.slug}`}>
              <div className="thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.cover} alt={p.title} />
              </div>
              <div className="body">
                <h3>{p.title}</h3>
                <p className="excerpt">{p.excerpt}</p>
                <div className="meta">
                  <span className="cat">{p.cat}</span>
                  <span style={{ width: 3, height: 3, background: "var(--text-mute)", borderRadius: "50%" }} />
                  <span>{p.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CTABanner />
    </article>
  );
}
