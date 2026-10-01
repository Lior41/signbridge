import { describe, it, expect } from "vitest";
import { interpret, validateClip, type ModelManifest } from "../src/lib/recognition";
const fixture: ModelManifest = {
  version: "unit-test-fixture",
  language: "ASL",
  licenseUrl: "https://example.test/license",
  evaluationUrl: "https://example.test/evaluation",
  vocabulary: ["EXAMPLE_A", "EXAMPLE_B"],
  validated: true,
};
describe("recognition boundary — synthetic unit fixtures, no ASL model", () => {
  it("never enables inference without an approved model", () =>
    expect(interpret({}, null).state).toBe("unavailable"));
  it("abstains on no-sign input", () =>
    expect(interpret({ hasSign: false, candidates: [], latencyMs: 10 }, fixture).state).toBe(
      "not-recognized",
    ));
  it("abstains on unsupported vocabulary", () =>
    expect(
      interpret(
        { hasSign: true, candidates: [{ label: "UNKNOWN", score: 0.99 }], latencyMs: 10 },
        fixture,
      ).state,
    ).toBe("not-recognized"));
  it("abstains when candidates are ambiguous", () =>
    expect(
      interpret(
        {
          hasSign: true,
          candidates: [
            { label: "EXAMPLE_A", score: 0.9 },
            { label: "EXAMPLE_B", score: 0.85 },
          ],
          latencyMs: 10,
        },
        fixture,
      ).state,
    ).toBe("not-recognized"));
  it("requires confirmation for an accepted candidate", () =>
    expect(
      interpret(
        { hasSign: true, candidates: [{ label: "EXAMPLE_A", score: 0.9 }], latencyMs: 10 },
        fixture,
      ),
    ).toMatchObject({
      state: "candidate",
      label: "EXAMPLE_A",
      reason: "Please confirm this suggestion; it may be incorrect.",
    }));
  it("rejects malformed model scores", () =>
    expect(() =>
      interpret(
        { hasSign: true, candidates: [{ label: "EXAMPLE_A", score: Infinity }], latencyMs: 10 },
        fixture,
      ),
    ).toThrow());
  it("bounds local preview size and media types", () => {
    expect(validateClip({ type: "image/png", size: 100 })).toContain("MP4");
    expect(validateClip({ type: "video/mp4", size: 9 * 1024 * 1024 })).toContain("8 MB");
    expect(validateClip({ type: "video/webm", size: 1024 })).toBeNull();
  });
});
