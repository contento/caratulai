import type { GenerationRequest, GenerationResult, LLMProvider } from "./types.js";
import { ModelLadder } from "./providers/index.js";
import { buildPrompt } from "./prompt.js";
import { sanitizeSvg } from "./validate.js";
import { getProfile } from "./profiles.js";
import { parse } from "node-html-parser";

/**
 * The core pipeline: tags + palette + constraints → prompt → LLM → SVG → validated SVG.
 * Persistence and export live in the surfaces; this stays pure.
 */
export async function generate(
  req: GenerationRequest,
  provider: LLMProvider | ModelLadder
): Promise<GenerationResult> {
  const prompt = buildPrompt(req);
  const raw = await provider.generateSvg(prompt, req.params);
  let { svg, report } = sanitizeSvg(raw, req.palette, req.constraints);

  // Inject background rectangle if profile specifies one
  const profile = getProfile(req.profile);
  if (profile.backgroundColor) {
    svg = injectBackground(svg, profile.backgroundColor, req.constraints);
  }

  return { svg, request: req, prompt, report };
}

/** Inject a background rectangle as the first element of the SVG. */
function injectBackground(svg: string, backgroundColor: string, constraints: { width: number; height: number }): string {
  const root = parse(svg, { voidTag: { tags: [] } });
  const svgEl = root.querySelector("svg");
  if (!svgEl) return svg;

  // Create background rect as first child
  const bgRect = `<rect width="${constraints.width}" height="${constraints.height}" fill="${backgroundColor}" />`;
  const bgEl = parse(bgRect).firstChild;
  if (bgEl) {
    svgEl.insertAdjacentHTML("afterbegin", bgRect);
  }
  return root.toString();
}

/**
 * Variation engine: sweep the cartesian product of palettes × seeds (and any extra param sets)
 * to produce a gallery of one concept. Every result carries the params that made it.
 */
export interface VariationSweep {
  tags: string[];
  palettes: GenerationRequest["palette"][];
  constraints: GenerationRequest["constraints"];
  baseParams: GenerationRequest["params"];
  seeds: number[];
}

export async function generateVariations(
  sweep: VariationSweep,
  provider: LLMProvider | ModelLadder
): Promise<GenerationResult[]> {
  const results: GenerationResult[] = [];
  for (const palette of sweep.palettes) {
    for (const seed of sweep.seeds) {
      const req: GenerationRequest = {
        tags: sweep.tags,
        palette,
        constraints: sweep.constraints,
        params: { ...sweep.baseParams, seed },
      };
      results.push(await generate(req, provider));
    }
  }
  return results;
}
