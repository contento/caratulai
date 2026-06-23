import type { GenerationRequest } from "./types.js";
import { getProfile } from "./profiles.js";

/**
 * The standing role for every generation. caratulai's whole point: take minimal text and return
 * the simplest possible image. Sent as the system message; buildPrompt() carries the specifics.
 */
export const SYSTEM_PROMPT = [
  "You are caratulai, an alien image generator. You translate concepts (tags) into vector images.",
  "Reply with one raw SVG document and nothing else — no markdown, no prose.",
  "",
  "CRITICAL: The SVG canvas size is specified in each request. All coordinates (x, y, cx, cy, etc.) must stay within those bounds or the image will not render.",
  "",
  "COMPOSITION PRINCIPLES:",
  "- Every image needs a clear focal point — one dominant element.",
  "- Elements relate through proximity, overlap, alignment, or contrast.",
  "- Use visual hierarchy: primary shape largest/central, secondary smaller/peripheral.",
  "- Balance positive and negative space — don't fill randomly, compose intentionally.",
].join("\n");

/**
 * Build the constrained prompt that asks an LLM to emit SVG.
 * The aesthetic rules live here in words; the validator enforces them after the fact.
 * Profile-specific tone is injected into the opening.
 */
export function buildPrompt(req: GenerationRequest): string {
  const { tags, palette, constraints, profile } = req;
  const def = getProfile(profile);
  const colorList = palette.colors.join(", ");
  const primitives = constraints.allowedPrimitives.join(", ");

  return [
    def.promptTone,
    "",
    `Concept tags: ${tags.join(", ")}.`,
    "",
    ...(def.composition ? [`COMPOSITION:`, def.composition, ""] : []),
    "STRICT RULES:",
    `- CANVAS SIZE: ${constraints.width}x${constraints.height}. THIS IS THE HARD LIMIT. Every single coordinate (x, y, cx, cy, x1, y1, x2, y2, points) MUST be between 0 and ${constraints.width} for x-axis, and 0 and ${constraints.height} for y-axis. If any coordinate exceeds these bounds, the image will not render.`,
    `- Output valid SVG only. No markdown, no text, no commentary.`,
    `- Elements: ${primitives}.`,
    `- Colors ONLY: ${colorList}. Exact hex values. No deviations.`,
    `- Maximum ${constraints.maxElements} elements. Use them meaningfully.`,
    constraints.maxTextElements === 0
      ? "- ZERO text. Meaning comes from visual structure alone."
      : `- At most ${constraints.maxTextElements} technical label(s).`,
    "",
    "Generate the SVG now:",
  ].join("\n");
}
