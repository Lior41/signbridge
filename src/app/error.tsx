"use client";
export default function Page({ reset }: { reset: () => void }) {
  return (
    <section className="wrap prose">
      <h1>A pause in the conversation.</h1>
      <p>The interface could not load. Please try again.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
