"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Camera, Upload, ShieldCheck, Square, Check, RotateCcw, Info, Hand } from "lucide-react";
import { validateClip } from "@/lib/recognition";
type Message = { kind: "system" | "person"; text: string };
export function CommunicationStudio() {
  const video = useRef<HTMLVideoElement>(null),
    stream = useRef<MediaStream | null>(null),
    blob = useRef<string | null>(null),
    pending = useRef(0);
  const [mode, setMode] = useState<"empty" | "camera" | "file">("empty"),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [scenario, setScenario] = useState(false),
    [candidate, setCandidate] = useState(""),
    [correction, setCorrection] = useState(""),
    [messages, setMessages] = useState<Message[]>([]),
    [notice, setNotice] = useState("");
  function release() {
    pending.current++;
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    if (blob.current) {
      URL.revokeObjectURL(blob.current);
      blob.current = null;
    }
    if (video.current) {
      video.current.pause();
      video.current.srcObject = null;
      video.current.removeAttribute("src");
      video.current.load();
    }
  }
  const stopCapture = useCallback(() => {
    pending.current++;
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    if (blob.current) {
      URL.revokeObjectURL(blob.current);
      blob.current = null;
    }
  }, []);
  useEffect(() => {
    const stopOnHide = () => {
      if (document.hidden) {
        pending.current++;
        stream.current?.getTracks().forEach((t) => t.stop());
        stream.current = null;
        if (video.current) video.current.srcObject = null;
        setMode("empty");
        setBusy(false);
      }
    };
    document.addEventListener("visibilitychange", stopOnHide);
    return () => {
      document.removeEventListener("visibilitychange", stopOnHide);
      stopCapture();
    };
  }, [stopCapture]);
  async function camera() {
    release();
    setMode("empty");
    setError("");
    setBusy(true);
    const request = pending.current;
    try {
      if (!navigator.mediaDevices?.getUserMedia)
        throw new Error("Camera preview is not supported here. Choose a local video instead.");
      const s = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (request !== pending.current) {
        s.getTracks().forEach((t) => t.stop());
        return;
      }
      stream.current = s;
      if (video.current) {
        video.current.srcObject = s;
        await video.current.play();
      }
      setMode("camera");
    } catch (e) {
      setError(
        e instanceof Error && e.name === "NotAllowedError"
          ? "Camera access was declined. You can still use a local video or the interface walkthrough."
          : e instanceof Error
            ? e.message
            : "Camera unavailable.",
      );
    } finally {
      if (request === pending.current) setBusy(false);
    }
  }
  function file(f: File | undefined) {
    if (!f) return;
    setError("");
    const problem = validateClip(f);
    if (problem) {
      setError(problem);
      return;
    }
    release();
    blob.current = URL.createObjectURL(f);
    if (video.current) {
      video.current.src = blob.current;
      video.current.load();
    }
    setMode("file");
    setNotice("Local preview only. This video is not uploaded or analyzed.");
  }
  function walkthrough() {
    release();
    setMode("empty");
    setScenario(true);
    setCandidate("HELLO");
    setMessages([
      {
        kind: "system",
        text: "Prewritten interface scenario. No video was recognized and no model is running.",
      },
    ]);
    setNotice("This walkthrough demonstrates confirmation and correction only.");
  }
  function confirm() {
    setMessages((v) => [
      ...v,
      { kind: "person", text: `You confirmed the prewritten suggestion: ${candidate}.` },
      {
        kind: "system",
        text: "Signed video replies are unavailable until authorized full-phrase clips have been reviewed in ASL.",
      },
    ]);
    setCandidate("");
  }
  return (
    <div className="wrap studio">
      <div className="status-banner">
        <Info size={16} />
        <span>
          RESEARCH RELEASE · Camera and local preview available. ASL inference is not enabled.
        </span>
        <Link href="/readiness">Why? ↗</Link>
      </div>
      <div className="studio-heading">
        <div>
          <p className="eyebrow">YOUR COMMUNICATION SPACE</p>
          <h1>A little room to connect.</h1>
          <p>Start with a local preview, or explore the confirmation interface.</p>
        </div>
        <span className="language-pill">ASL → English</span>
      </div>
      <div className="studio-grid">
        <section className="capture-panel">
          <div className="panel-heading">
            <h2>Your video</h2>
            <span className={`status-dot ${mode === "camera" ? "on" : ""}`}>
              {mode === "camera" ? "CAMERA ACTIVE" : mode === "file" ? "LOCAL FILE" : "CAMERA OFF"}
            </span>
          </div>
          <div className={`video-stage ${mode === "empty" ? "empty" : ""}`}>
            <video
              ref={video}
              muted
              playsInline
              controls={mode === "file"}
              onLoadedMetadata={() => {
                if (
                  mode === "file" &&
                  video.current &&
                  (!Number.isFinite(video.current.duration) || video.current.duration > 15)
                ) {
                  release();
                  setMode("empty");
                  setError("Choose a video up to 15 seconds long.");
                }
              }}
              onError={() => {
                if (mode === "file") {
                  release();
                  setMode("empty");
                  setError("This video could not be played. Try another MP4 or WebM file.");
                }
              }}
              aria-label="Local camera or video preview"
            />
            {mode === "empty" && (
              <div className="capture-empty">
                <div className="hand-frame">
                  <Hand size={62} strokeWidth={1} />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <h3>Your space. Your choice.</h3>
                <p>
                  Frame your face, hands and upper body.
                  <br />
                  Use a plain background and even lighting.
                </p>
                <span>Nothing is uploaded.</span>
              </div>
            )}
          </div>
          <div className="capture-actions">
            {mode === "camera" ? (
              <button
                className="button primary"
                onClick={() => {
                  release();
                  setMode("empty");
                  setNotice("Camera stopped.");
                }}
              >
                <Square size={15} />
                Stop camera
              </button>
            ) : (
              <button className="button primary" disabled={busy} onClick={camera}>
                <Camera size={17} />
                {busy ? "Requesting camera…" : "Enable camera preview"}
              </button>
            )}
            <label className="button upload">
              <Upload size={17} />
              Choose a local video
              <input
                type="file"
                accept="video/mp4,video/webm"
                onChange={(e) => {
                  file(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
          <p className="capture-note">
            <ShieldCheck size={14} /> MP4 / WebM · Up to 8 MB and 15 seconds · Local playback only
          </p>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <div className="unavailable">
            <Info size={18} />
            <div>
              <strong>Recognition isn’t available yet.</strong>
              <p>
                No licensed, evaluated model is installed. Previewing a video does not translate it.
              </p>
              <Link href="/readiness">See the release checklist ↗</Link>
            </div>
          </div>
        </section>
        <aside className="conversation-panel">
          <div className="panel-heading">
            <h2>Understanding together</h2>
            <span className="quiet-label">TEXT PREVIEW</span>
          </div>
          <div className="conversation-body">
            {!scenario ? (
              <div className="conversation-empty">
                <span>“</span>
                <h3>
                  A suggestion.
                  <br />
                  Then your say.
                </h3>
                <p>
                  When recognition is ready, suggestions will appear here for you to confirm or
                  correct.
                </p>
                <button className="text-link" onClick={walkthrough}>
                  Try a prewritten interface scenario ↗
                </button>
              </div>
            ) : (
              <>
                <span className="scenario-label">PREWRITTEN WALKTHROUGH · NOT AI OUTPUT</span>
                {messages.map((m, i) => (
                  <div key={i} className={`message ${m.kind}`}>
                    {m.text}
                  </div>
                ))}
                {candidate && (
                  <div className="candidate">
                    <small>EXAMPLE SUGGESTION</small>
                    <h3>{candidate}</h3>
                    <p>Is this what you meant?</p>
                    <div>
                      <button className="button primary" onClick={confirm}>
                        <Check size={16} />
                        Confirm
                      </button>
                      <button
                        onClick={() => {
                          setCandidate("");
                          setMessages((v) => [
                            ...v,
                            {
                              kind: "system",
                              text: "Suggestion rejected. No meaning was assumed.",
                            },
                          ]);
                        }}
                      >
                        Not what I meant
                      </button>
                    </div>
                  </div>
                )}
                <form
                  className="correction"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!correction.trim()) return;
                    setMessages((v) => [...v, { kind: "person", text: correction.trim() }]);
                    setCorrection("");
                  }}
                >
                  <label htmlFor="correction">Type what you mean (stays in this page)</label>
                  <input
                    id="correction"
                    value={correction}
                    onChange={(e) => setCorrection(e.target.value)}
                    maxLength={200}
                    placeholder="Your correction or message"
                    required
                  />
                  <button className="button" type="submit">
                    Add to this walkthrough
                  </button>
                </form>
                <button
                  className="text-link"
                  onClick={() => {
                    setScenario(false);
                    setCandidate("");
                    setMessages([]);
                    setCorrection("");
                  }}
                >
                  <RotateCcw size={14} />
                  End walkthrough
                </button>
              </>
            )}
          </div>
          <div className="privacy-foot">No conversation is saved. Reloading clears this text.</div>
        </aside>
      </div>
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      <div className="studio-guidance">
        <span>01 · Preview locally</span>
        <span>02 · Confirm or correct</span>
        <span>03 · Keep the limits visible</span>
      </div>
    </div>
  );
}
