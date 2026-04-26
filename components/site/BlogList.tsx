"use client";

import Link from "next/link";
import { useState } from "react";
import type { Post } from "@/lib/posts";

const cats = ["All", "World Cup", "Champions League", "Football", "Setup Guide", "Culture", "Euro"];

export default function BlogList({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? posts : posts.filter((p) => p.cat === cat);
  const [feature, ...rest] = filtered;
  const sidePosts = rest.slice(0, 3);
  const gridPosts = rest.slice(3);

  return (
    <div className="container">
      <div className="blog-categories reveal">
        {cats.map((c) => (
          <button key={c} className={`cat-pill ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      {feature && (
        <div className="blog-featured reveal">
          <Link className="post-card-large" href={`/blog/${feature.slug}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={feature.cover} alt={feature.title} />
            <div className="content">
              <div className="post-meta" style={{ marginBottom: 12 }}>
                <span className="cat">{feature.cat}</span>
                <span className="dot" />
                <span>{feature.date}</span>
                <span className="dot" />
                <span>{feature.read}</span>
              </div>
              <h2>{feature.title}</h2>
              <p>{feature.excerpt}</p>
            </div>
          </Link>
          <div className="blog-featured-side">
            {sidePosts.map((p) => (
              <Link key={p.slug} className="post-card-side" href={`/blog/${p.slug}`}>
                <div className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt={p.title} />
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <div className="meta">
                    <span style={{ color: "var(--blue)", fontWeight: 600 }}>{p.cat}</span> · {p.read}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {gridPosts.length > 0 && (
        <div className="blog-grid reveal-stagger" style={{ paddingBottom: 80 }}>
          {gridPosts.map((p) => (
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
      )}
    </div>
  );
}
