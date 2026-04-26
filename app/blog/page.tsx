import { POSTS } from "@/lib/posts";
import BlogList from "@/components/site/BlogList";
import CTABanner from "@/components/site/CTABanner";

export const metadata = { title: "The Stream Room — StreamlixIPTV Blog" };

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
