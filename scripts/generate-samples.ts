/**
 * Generate sample SVGs for every profile — one per profile.
 *
 * Usage:
 *   npx tsx scripts/generate-samples.ts [--provider echo|openrouter|ollama] [--out samples/]
 *
 * Reads .env from project root. Defaults to openrouter when OPENROUTER_API_KEY or
 * SVG_MODEL_API_KEY is present, otherwise falls back to echo.
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { PROFILES, getProfile } from "../packages/core/src/profiles.js";
import { getPalette } from "../packages/core/src/palettes.js";
import { createConstraints } from "../packages/core/src/constraints.js";
import { buildPrompt, SYSTEM_PROMPT } from "../packages/core/src/prompt.js";
import { generate } from "../packages/core/src/generate.js";
import { EchoProvider } from "../packages/core/src/providers/echo.js";
import { createOpenRouterProvider } from "../packages/core/src/providers/openrouter.js";
import { createOllamaProvider } from "../packages/core/src/providers/ollama.js";
import type { GenerationRequest, ProfileId, LLMProvider } from "../packages/core/src/types.js";

// --- Load .env from project root ---

try {
  const env = readFileSync(join(process.cwd(), ".env"), "utf-8");
  for (const line of env.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch { /* .env not found — continue */ }

// --- CLI args ---

const args = process.argv.slice(2);
const flag = (name: string, fallback: string): string => {
  const eq = args.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.split("=")[1]!;
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1]! : fallback;
};

const providerFlag = flag("provider",
  (process.env.OPENROUTER_API_KEY ?? process.env.SVG_MODEL_API_KEY) ? "openrouter" : "echo",
);
const outDir = flag("out", "samples");
const model = flag("model", "");

// --- Provider selection ---

function createProvider(name: string): LLMProvider {
  switch (name) {
    case "echo":
      return new EchoProvider();
    case "openrouter": {
      const apiKey = process.env.OPENROUTER_API_KEY ?? process.env.SVG_MODEL_API_KEY;
      if (!apiKey) throw new Error("No API key found. Set OPENROUTER_API_KEY or SVG_MODEL_API_KEY in .env");
      return createOpenRouterProvider({
        model: model || "openai/gpt-4o-mini",
        apiKey,
        referer: "https://github.com/contento/caratulai",
        title: "caratulai-samples",
      });
    }
    case "ollama":
      return createOllamaProvider({ model: model || "llama3.2" });
    default:
      throw new Error(`Unknown provider: ${name}. Use echo, openrouter, or ollama.`);
  }
}

// --- Main ---

const SAMPLE_TAGS = ["star", "water"];

async function main() {
  const provider = createProvider(providerFlag);
  console.log(`Provider: ${provider.name} (${provider.models.join(", ")})`);

  const outPath = join(process.cwd(), outDir);
  mkdirSync(outPath, { recursive: true });

  const profileIds = Object.keys(PROFILES) as ProfileId[];
  console.log(`Generating ${profileIds.length} samples → ${outPath}/\n`);

  writeFileSync(join(outPath, "_system-prompt.txt"), SYSTEM_PROMPT, "utf-8");

  for (const id of profileIds) {
    const def = getProfile(id);
    const palette = getPalette(def.paletteId);
    if (!palette) {
      console.warn(`  ⚠ ${id}: palette "${def.paletteId}" not found, skipping`);
      continue;
    }

    const req: GenerationRequest = {
      tags: SAMPLE_TAGS,
      palette,
      constraints: createConstraints(def),
      params: { model: provider.models[0]!, temperature: 0.7, seed: 42 },
      profile: id,
    };

    writeFileSync(join(outPath, `${id}-prompt.txt`), buildPrompt(req), "utf-8");

    try {
      const result = await generate(req, provider);
      writeFileSync(join(outPath, `${id}.svg`), result.svg, "utf-8");
      const issues = result.report.issues.length;
      console.log(`  ${issues === 0 ? "✓" : `⚠ ${issues}`} ${id} (${def.label})`);
    } catch (err) {
      console.error(`  ✗ ${id}: ${err}`);
    }
  }

  console.log(`\nDone. Open ${outDir}/*.svg to inspect visually.`);
  console.log(`Prompts: ${outDir}/*-prompt.txt`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
