import type { Metadata } from "next";
import { POSTS } from "@/lib/posts";
import BlogList from "@/components/site/BlogList";
import CTABanner from "@/components/site/CTABanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The Stream Room — Blog",
  description: "Setup tutorials, match previews and deep dives on the world's biggest tournaments. From the Streamlix editors to your screen.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="container">
          <span className="eyebrow"><span className="dot" />Insights · Guides · Match analysis</span>
          <h1 style={{ margin: "24px 0" }}>The <span className="accent">Stream Room</span></h1>
          <p>Setup tutorials, match previews, deep dives on the world&apos;s biggest tournaments — from our editors to your screen.</p>
        </div>
      </section>
      <BlogList posts={POSTS} />
      <CTABanner />
    </>
  );
}
