export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">RESEARCH STATUS · 30 SEPTEMBER 2026</p>
      <h1>Progress you can inspect.</h1>
      <p className="lead">
        The interface is a foundation. It is not evidence of a working ASL translation system.
      </p>
      <div className="readiness-list">
        {[
          [
            "Available",
            "Local camera and video preview",
            "Explicit activation, local playback, stop controls and file limits.",
          ],
          [
            "Available",
            "Confirmation and correction interface",
            "A clearly labeled prewritten walkthrough, without model predictions.",
          ],
          [
            "Implemented, not calibrated",
            "Output validation and abstention policy",
            "Unit-tested with synthetic data. This does not establish model accuracy.",
          ],
          [
            "Required",
            "Licensed ASL recognition model",
            "No weights are bundled. Generic gesture detection is not an ASL model.",
          ],
          [
            "Required",
            "Signer-disjoint evaluation",
            "Per-sign performance, unknown/no-sign behavior and measured latency.",
          ],
          [
            "Required",
            "Authorized signed replies",
            "Full phrases with permission to publish and documented ASL review.",
          ],
        ].map(([status, title, body]) => (
          <section key={title}>
            <span className={`status-tag ${status === "Available" ? "ready" : ""}`}>{status}</span>
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
          </section>
        ))}
      </div>
      <h2>Data sources reviewed</h2>
      <p>
        <a
          href="https://www.microsoft.com/en-us/research/project/asl-citizen/dataset-license/"
          target="_blank"
          rel="noreferrer"
        >
          ASL Citizen’s research license
        </a>{" "}
        restricts redistribution of its data. Those videos are not included in this site.
      </p>
      <p>
        <a href="https://github.com/dxli94/WLASL" target="_blank" rel="noreferrer">
          WLASL
        </a>{" "}
        is a research resource whose terms and original video rights need review before public
        product use. It is not bundled here.
      </p>
      <h2>What would unlock the next step?</h2>
      <p>
        A compatible licensed model, held-out evaluation recordings and an ASL reviewer. Signed
        replies also need authorized recordings. No recognition accuracy, language validation or
        user study is claimed for this release.
      </p>
    </article>
  );
}
