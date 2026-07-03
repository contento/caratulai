import type { LLMProvider, GenerationParams } from "./types.js";
import { ModelLadder } from "./providers/index.js";

const TAG_REWRITES: Record<string, string> = {
  abstract: "",
  beyond: "",
  becoming: "spiral",
  colorful: "",
  crossing: "path",
  distributed: "",
  emergence: "",
  feedback: "",
  formless: "",
  language: "",
  multicolored: "",
  opposition: "split",
  story: "",
  starry: "star",
  threshold: "gate",
  translucent: "",
  transparent: "",
  ancient: "",
  small: "",
  white: "",
  red: "",
  blue: "",
  green: "",
  vertical: "",
};

const NON_VISUAL_TAGS = new Set([
  "ambiguity",
  "certainty",
  "emotion",
  "emotions",
  "fear",
  "grief",
  "hope",
  "ineffable",
  "joy",
  "mystery",
  "renewal",
  "silence",
  "story",
  "time",
  "transcendence",
  "transformation",
  "uncertainty",
  "void",
]);

function normalizeTag(raw: string): string | null {
  const cleaned = raw.trim().toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9\s-]+$/g, "");
  if (!cleaned) return null;

  const tokens = cleaned
    .split(/[\s-]+/)
    .map((token) => TAG_REWRITES[token] ?? token)
    .filter((token) => token.length > 0);

  if (tokens.length === 0) return null;

  const visualTokens = tokens.filter((token) => !NON_VISUAL_TAGS.has(token));
  if (visualTokens.length === 0) return null;

  return visualTokens[visualTokens.length - 1]!;
}

/**
 * System prompt for ontology extraction: ask the LLM to reduce narrative text
 * to a minimal set of visual concepts (tags). Emphasize simplicity and visual-only concepts.
 */
export const EXTRACTION_SYSTEM_PROMPT = [
  "You are caratulai's ontology extractor. Your job: read prose and extract 4–8 simple",
  "visual concepts (tags) that a minimalist image generator could draw. Think Voyager,",
  "Picasso's line. Extract ONLY visual things — no adjectives, no emotions, no narrative.",
  "Example: 'A dark journey across an ancient ocean' → star, water, ship, horizon.",
].join("\n");

/**
 * Build the extraction prompt that asks an LLM to emit a list of concept tags from text.
 */
export function buildExtractionPrompt(text: string): string {
  return [
    EXTRACTION_SYSTEM_PROMPT,
    "",
    "Translate the text into 4-8 simple visual nouns or drawable forms.",
    "Prefer single concrete words like star, water, boat, path, gate, mountain, shadow, flame, circle, spiral.",
    "If the text is abstract or emotional, convert it into visible proxies instead of repeating the abstraction.",
    "Example: grief, fear, hope crossing time -> shadow, light, path, horizon.",
    "Example: ineffable emergence beyond language -> mist, horizon, glow, gate.",
    "Return ONLY a comma-separated list of tags. No explanation, no markdown.",
    "",
    `Text: "${text}"`,
    "",
    "Tags (comma-separated):",
  ].join("\n");
}

/**
 * Extract concept tags from narrative text using an LLM.
 * The LLM is asked to return a comma-separated (or newline-separated) list of tags.
 * Result is lowercased, trimmed, and filtered.
 */
export async function extractTags(
  text: string,
  provider: LLMProvider | ModelLadder,
  params?: Partial<GenerationParams>
): Promise<string[]> {
  const prompt = buildExtractionPrompt(text);

  // Use a lower temperature for extraction (more deterministic).
  const extractParams = {
    model: params?.model || "default",
    temperature: params?.temperature ?? 0.2,
    seed: params?.seed,
    systemPrompt: EXTRACTION_SYSTEM_PROMPT,
  };

  const raw = await provider.generateSvg(prompt, extractParams);

  // Parse the response as either comma-separated or newline-separated tags.
  // Try comma first, fall back to newline.
  let tags: string[];
  if (raw.includes(",")) {
    tags = raw
      .split(",")
      .map(normalizeTag)
      .filter((t): t is string => t !== null);
  } else {
    tags = raw
      .split("\n")
      .map(normalizeTag)
      .filter((t): t is string => t !== null);
  }

  return [...new Set(tags)];
}
