import Link from "next/link";
import { BookOpen, Video, ArrowUpRight } from "lucide-react";
export default function Page() {
  return (
    <section className="wrap prose">
      <p className="eyebrow">A VOCABULARY WITH CLEAR BOUNDARIES</p>
      <h1>
        Only what we can
        <br />
        stand behind.
      </h1>
      <p className="lead">
        This release has no enabled recognition vocabulary and no published signed reply videos. We
        won’t fill the gaps with unverified signs.
      </p>
      <div className="library-grid">
        <article>
          <BookOpen size={28} />
          <h2>Recognition vocabulary</h2>
          <span className="status-tag">AWAITING EVALUATION</span>
          <p>
            A supported sign will need an approved model, a documented operating domain and
            signer-disjoint test results before appearing here.
          </p>
        </article>
        <article>
          <Video size={28} />
          <h2>Signed video replies</h2>
          <span className="status-tag">AWAITING RIGHTS & ASL REVIEW</span>
          <p>
            Replies must be complete phrases, recorded with permission and checked by a competent
            ASL reviewer. No word-by-word stitching.
          </p>
        </article>
      </div>
      <Link className="button primary" href="/readiness">
        See the research status <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
