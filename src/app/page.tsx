import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Eye, MessageSquare, CheckCircle2 } from "lucide-react";
import { SignArt } from "@/components/sign-art";
export default function Page() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" /> AMERICAN SIGN LANGUAGE · RESEARCH PROTOTYPE
          </p>
          <h1>
            More ways
            <br />
            to be <em>understood.</em>
          </h1>
          <p className="lead">
            Exploring a thoughtful bridge between
            <br />
            signed and written communication.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/studio">
              Step into the studio <ArrowUpRight size={19} />
            </Link>
            <Link href="/readiness" className="text-link">
              See what’s ready
            </Link>
          </div>
          <p className="honest-note">
            <ShieldCheck size={16} /> Local video preview works today. ASL recognition and signed
            replies await evaluated, licensed assets.
          </p>
        </div>
        <div className="hero-art">
          <SignArt />
          <div className="floating-card">
            <span className="small-icon">
              <MessageSquare size={18} />
            </span>
            <div>
              MADE FOR UNDERSTANDING<strong>A conversation, with care.</strong>
            </div>
          </div>
          <small>Original illustration · Not an ASL teaching reference</small>
        </div>
      </section>
      <div className="principle-strip">
        <span>ONE LANGUAGE: ASL</span>
        <span>PRIVACY BY DESIGN</span>
        <span>UNCERTAINTY IS VISIBLE</span>
        <span>PEOPLE BEFORE PREDICTIONS</span>
      </div>
      <section className="wrap section">
        <div className="section-head">
          <p className="eyebrow">A CLEARER PATH TO COMMUNICATION</p>
          <h2>
            A little more context.
            <br />A lot more care.
          </h2>
        </div>
        <div className="feature-grid">
          {[
            {
              icon: Eye,
              title: "You stay in control.",
              body: "Preview your camera or a short video locally. Nothing is uploaded by this release.",
            },
            {
              icon: MessageSquare,
              title: "Room for uncertainty.",
              body: "A suggestion should invite confirmation. Our interface includes rejection and correction, with no invented confidence numbers.",
            },
            {
              icon: CheckCircle2,
              title: "Clarity about the limits.",
              body: "A hand detector is not a translator. We separate interface progress from evaluated ASL capability.",
            },
          ].map((f) => (
            <article key={f.title}>
              <f.icon size={27} />
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="research-note wrap">
        <div>
          <p className="eyebrow">BUILT OPENLY</p>
          <h2>
            A prototype.
            <br />
            An honest starting point.
          </h2>
        </div>
        <div>
          <p>
            Good accessibility technology takes more than a model. It needs appropriate data, clear
            rights and evaluation with people who use the language.
          </p>
          <Link href="/how-it-works" className="text-link">
            Explore the architecture and release gates <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
