import Link from "next/link";
export default function Page() {
  return (
    <section className="wrap prose">
      <p className="eyebrow">404</p>
      <h1>Let’s find our way back.</h1>
      <Link className="button primary" href="/">
        Return to SIGNBRIDGE ↗
      </Link>
    </section>
  );
}
