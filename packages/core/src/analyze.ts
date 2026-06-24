import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import type { LLMProvider, GenerationParams, ImageAnalysisRequest, ImageAnalysisResult } from "./types.js";
import { ModelLadder } from "./providers/index.js";
import { extractTags } from "./extract.js";

/** MIME type mapping for common image extensions */
const EXTENSION_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".bmp": "image/bmp",
  ".svg": "image/svg+xml",
};

/** System prompt for image analysis: describe what the vision model should extract. */
export const IMAGE_ANALYSIS_SYSTEM_PROMPT = [
  "You are caratulai's image analyst. Your job: describe an image in 2-3 sentences,",
  "focusing on concrete visual elements that could be translated to simple vector art.",
  "",
  "Focus on:",
  "- Main subjects and objects (nouns, not adjectives)",
  "- Composition and spatial relationships",
  "- Key shapes and forms",
  "- Dominant colors and contrast",
  "",
  "Be concrete and visual. Avoid abstract interpretations, emotions, or narrative.",
  "Think: what simple geometric shapes and colors would recreate this scene?",
].join("\n");

/** Build the analysis prompt that asks the vision model to describe an image. */
export function buildImageAnalysisPrompt(): string {
  return [
    "Describe this image in 2-3 sentences for a minimalist vector artist.",
    "Focus on concrete visual elements: subjects, shapes, composition, colors.",
    "No emotions, no abstract interpretations. Just what you see.",
    "",
    "Description:",
  ].join("\n");
}

/**
 * Analyze an image and extract concept tags.
 *
 * Pipeline:
 * 1. Load image (local file or URL)
 * 2. Send to vision model for description
 * 3. Extract concept tags from description
 * 4. Return both narrative and tags
 */
export async function analyzeImage(
  request: ImageAnalysisRequest,
  provider: LLMProvider | ModelLadder,
  params?: Partial<GenerationParams>
): Promise<ImageAnalysisResult> {
  const isRemoteSource = request.source.startsWith("http://") || request.source.startsWith("https://");

  // Load and encode the image only when needed. Vision-capable providers can consume
  // remote URLs directly, which avoids provider-specific issues with inline data URLs.
  let imageRef: string;
  let mimeType: string;

  if (isRemoteSource && "generateWithImage" in provider && typeof provider.generateWithImage === "function") {
    imageRef = request.source;
    mimeType = "url";
  } else if (isRemoteSource) {
    const response = await fetch(request.source);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${request.source}: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    mimeType = contentType?.split(";")[0]?.trim() || "image/jpeg";

    const buffer = Buffer.from(await response.arrayBuffer());
    imageRef = buffer.toString("base64");
  } else {
    const buffer = await readFile(request.source);
    const ext = extname(request.source).toLowerCase();
    mimeType = EXTENSION_TO_MIME[ext] || "image/jpeg";
    imageRef = buffer.toString("base64");
  }

  // Build the analysis prompt
  const prompt = buildImageAnalysisPrompt();

  // Use lower temperature for deterministic analysis
  const analysisParams: GenerationParams = {
    model: params?.model || request.params?.model || "default",
    temperature: params?.temperature ?? request.params?.temperature ?? 0.3,
    seed: params?.seed ?? request.params?.seed,
  };

  // Get narrative description from vision model
  let narrative: string;

  // Check if provider supports vision
  if ("generateWithImage" in provider && typeof provider.generateWithImage === "function") {
    narrative = await provider.generateWithImage(
      prompt,
      imageRef,
      mimeType,
      analysisParams
    );
  } else {
    // Fallback: Use text-only extraction (won't work well for images)
    // This is a graceful degradation for providers without vision support
    const providerName = "name" in provider ? provider.name : "unknown";
    narrative = await provider.generateSvg(
      `Image analysis requested but provider "${providerName}" does not support vision.\n\n${prompt}`,
      analysisParams
    );
  }

  // Extract concept tags from the narrative
  const tags = await extractTags(narrative, provider, params);

  return {
    narrative: narrative.trim(),
    tags,
    source: request.source,
  };
}
