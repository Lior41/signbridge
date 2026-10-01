export default function Page() {
  return (
    <article className="wrap prose">
      <p className="eyebrow">YOUR VIDEO STAYS YOURS</p>
      <h1>
        Preview locally.
        <br />
        Choose deliberately.
      </h1>
      <p>
        No video is uploaded, saved by this application or used for training in this release. The
        camera requires an explicit action and your browser’s permission. Microphone access is not
        requested.
      </p>
      <p>
        Camera tracks stop when you press Stop, switch away from the page or leave the studio. A
        local file is accessed through a temporary browser URL and released when replaced or when
        the page is closed.
      </p>
      <p>
        Text entered in the walkthrough stays in page memory and disappears on reload. No accounts,
        advertising trackers or analytics are included. Normal hosting access logs may contain
        connection information.
      </p>
      <p>
        Any future remote inference must introduce a separate, explicit explanation and consent flow
        before transmitting video. A future training contribution must require a distinct opt-in.
      </p>
    </article>
  );
}
