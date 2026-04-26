import Link from "next/link";
import { Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link href="/" className="logo">
              <LogoMark />
              <span>
                Streamlix<span style={{ color: "var(--blue)" }}>IPTV</span>
              </span>
            </Link>
            <p>Premium IPTV for fans who don&apos;t tolerate buffering. Streaming with StreamlixIPTV since 2019, and still scaling.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter" className="social-btn"><Twitter size={16} /></a>
              <a href="#" aria-label="Instagram" className="social-btn"><Instagram size={16} /></a>
              <a href="#" aria-label="YouTube" className="social-btn"><Youtube size={16} /></a>
              <a href="#" aria-label="Facebook" className="social-btn"><Facebook size={16} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/installation-guide">Installation Guide</Link></li>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#devices">Devices</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/installation-guide">Setup guides</Link></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Affiliate</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 StreamlixIPTV. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
