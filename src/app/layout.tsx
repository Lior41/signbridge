import type { Metadata } from "next";
import Link from "next/link";
import { Hand, ArrowUpRight } from "lucide-react";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "SIGNBRIDGE — A thoughtful step towards understanding.",
    template: "%s · SIGNBRIDGE",
  },
  description:
    "An experimental ASL communication interface with local video preview, explicit uncertainty and transparent model readiness.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="header">
          <Link className="brand" href="/">
            <Hand size={24} />
            signbridge<span>LAB</span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/studio">Communication studio</Link>
            <Link href="/library">Vocabulary & replies</Link>
            <Link href="/how-it-works">Our approach</Link>
          </nav>
          <Link className="nav-cta" href="/studio">
            Explore the prototype <ArrowUpRight size={15} />
          </Link>
        </header>
        <main id="main">{children}</main>
        <footer>
          <Link className="brand" href="/">
            <Hand size={21} />
            signbridge
          </Link>
          <p>Understanding begins with listening. And looking.</p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/readiness">Research status</Link>
          </div>
          <small>
            ASL research interface · Recognition and signed replies are not yet released.
          </small>
        </footer>
      </body>
    </html>
  );
}
