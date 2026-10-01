import Link from "next/link";
export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">DESIGNED TO BE UNDERSTOOD</p>
      <h1>
        Separate the interface
        <br />
        from the intelligence.
      </h1>
      <p className="lead">
        A camera preview, a detected hand, a recognized sign and a translated sentence are different
        capabilities.
      </p>
      <h2>The current release</h2>
      <div className="architecture">Camera / local file → Browser preview → No upload</div>
      <p>
        Next.js serves the application. The browser handles media permissions and playback. Text in
        the walkthrough exists only in memory. No model or reply clips have passed the release gate.
      </p>
      <h2>The planned recognition boundary</h2>
      <div className="architecture">
        Approved ASL model → Validated candidates → Abstain or suggest → User confirmation
      </div>
      <p>
        The code validates the output shape, vocabulary and basic operating thresholds. Synthetic
        tests cover unknown signs, ambiguity and malformed outputs. Those tests verify software
        behavior; they do not measure ASL recognition quality.
      </p>
      <h2>Why the distinction matters</h2>
      <p>
        ASL has its own grammar and uses hands, movement, facial expression and space. A general
        gesture classifier or a sequence of isolated sign clips is not a substitute for a validated
        language system.
      </p>
      <h2>A two-minute prototype tour</h2>
      <ol>
        <li>Open the studio and read the readiness notice.</li>
        <li>Choose a local test video to inspect playback; no upload occurs.</li>
        <li>Try the explicitly prewritten scenario.</li>
        <li>Reject a suggestion and correct it using text.</li>
        <li>Open the research status and inspect the remaining dependencies.</li>
      </ol>
      <p>
        This prototype is not suitable for medical, legal, emergency or other high-stakes
        interpreting.
      </p>
      <h2>Inspect the work</h2>
      <p><a href="https://github.com/Lior41/signbridge">Source code</a> · <a href="https://github.com/Lior41/signbridge/tree/main/tests">Tests</a> · <a href="https://github.com/Lior41/signbridge/actions">Verification runs</a> · <Link href="/demo-video">Captioned walkthrough</Link></p>
      <Link className="button primary" href="/studio">
        Explore the prototype ↗
      </Link>
    </article>
  );
}
