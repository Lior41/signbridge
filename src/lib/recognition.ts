import { z } from "zod";
export const modelManifestSchema = z
  .object({
    version: z.string().min(1),
    language: z.literal("ASL"),
    licenseUrl: z.url(),
    evaluationUrl: z.url(),
    vocabulary: z.array(z.string().min(1).max(80)).min(1),
    validated: z.literal(true),
  })
  .strict();
export type ModelManifest = z.infer<typeof modelManifestSchema>;
export const inferenceSchema = z
  .object({
    hasSign: z.boolean(),
    candidates: z
      .array(
        z.object({ label: z.string().min(1).max(80), score: z.number().min(0).max(1) }).strict(),
      )
      .max(5),
    latencyMs: z.number().finite().min(0).max(120000),
  })
  .strict();
export type Recognition = {
  state: "unavailable" | "not-recognized" | "candidate";
  label?: string;
  reason: string;
  latencyMs?: number;
};
export function interpret(raw: unknown, manifest: ModelManifest | null): Recognition {
  if (!manifest)
    return { state: "unavailable", reason: "No ASL model has passed the release checks." };
  const m = modelManifestSchema.parse(manifest),
    v = inferenceSchema.parse(raw);
  if (!v.hasSign || !v.candidates.length)
    return {
      state: "not-recognized",
      reason: "No supported sign was recognized.",
      latencyMs: v.latencyMs,
    };
  const sorted = [...v.candidates].sort((a, b) => b.score - a.score),
    best = sorted[0];
  if (!m.vocabulary.includes(best.label))
    return {
      state: "not-recognized",
      reason: "This sign is outside the supported vocabulary.",
      latencyMs: v.latencyMs,
    };
  // Illustrative policy defaults, not calibrated accuracy claims. A model release
  // must tune these operating thresholds on held-out signers before activation.
  if (best.score < 0.8 || (sorted[1] && best.score - sorted[1].score < 0.15))
    return {
      state: "not-recognized",
      reason: "The result is uncertain. Please try again or use text.",
      latencyMs: v.latencyMs,
    };
  return {
    state: "candidate",
    label: best.label,
    reason: "Please confirm this suggestion; it may be incorrect.",
    latencyMs: v.latencyMs,
  };
}
export function validateClip(file: { type: string; size: number }) {
  if (!["video/mp4", "video/webm"].includes(file.type)) return "Choose an MP4 or WebM video.";
  if (file.size > 8 * 1024 * 1024) return "Please choose a video smaller than 8 MB.";
  if (!file.size) return "This video is empty.";
  return null;
}
export const releaseStatus = {
  inferenceEnabled: false,
  language: "ASL",
  model: null,
  supportedSigns: [],
  replyClips: [],
  reason:
    "A licensed, evaluated ASL model and reviewer-approved reply videos are not yet available.",
} as const;
