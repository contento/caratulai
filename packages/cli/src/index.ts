#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { createRequire } from "node:module";
import { Command } from "commander";
import {
  generate,
  extractTags,
  analyzeImage,
  getPalette,
  createConstraints,
  getProfile,
  BUILTIN_PALETTES,
  PROFILE_IDS,
  type GenerationRequest,
  type GenerationResult,
  type LLMProvider,
  type ProfileId,
} from "@caratulai/core";
import { buildProvider } from "./provider-factory.js";
import { fetchTextFromUrl } from "./fetch.js";
import { loadDotEnv, loadYamlConfig, resolveOpt, getConfigValue, getModelSurfaceConfig, type CaratulaiConfig } from "./config.js";

// Load .env variables and YAML config before parsing CLI flags
await loadDotEnv();
const yamlConfig: CaratulaiConfig = await loadYamlConfig();

const pkg = createRequire(import.meta.url)("../package.json") as { version: string };

/** Generate filename: {name_}{profile_}yyyyMMddHHmmss.svg (name/profile omitted if falsy) */
function generateTimestampFilename(dir: string, profileId?: string, name?: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const filename = [name, profileId, `${yyyy}${MM}${dd}${HH}${mm}${ss}`].filter(Boolean).join("_") + ".svg";
  return `${dir}/${filename}`;
}

/** Aspect ratio presets. */
const RATIO_PRESETS: Record<string, [number, number]> = {
  square: [512, 512],
  "1:1": [512, 512],
  "16:9": [960, 540],
  "9:16": [540, 960],
  "4:3": [640, 480],
  "3:4": [480, 640],
  "21:9": [1024, 438],
  "9:21": [438, 1024],
};

function resolveRatio(ratioStr: string | undefined): [number, number] {
  if (!ratioStr) return [512, 512];
  const preset = RATIO_PRESETS[ratioStr.toLowerCase()];
  if (preset) return preset;
  // Try parsing custom ratio like "16:9"
  const match = ratioStr.match(/^(\d+):(\d+)$/);
  if (match && match[1] && match[2]) {
    const w = Number(match[1]);
    const h = Number(match[2]);
    const scale = 512 / w;
    return [Math.round(w * scale), Math.round(h * scale)];
  }
  return [512, 512];
}

/** Canvas dimensions: --width/--height > --ratio > CARATULAI_RATIO env > YAML > default. */
function resolveDimensions(opts: { width?: number; height?: number; ratio?: string }): {
  width: number;
  height: number;
  ratioLabel: string;
} {
  if (opts.width || opts.height) {
    return { width: opts.width || 512, height: opts.height || 512, ratioLabel: "custom (--width/--height)" };
  }
  const ratioOpt = opts.ratio || process.env.CARATULAI_RATIO || getConfigValue<string>(yamlConfig, "generation.ratio", "16:9");
  const [width, height] = resolveRatio(ratioOpt);
  return { width, height, ratioLabel: ratioOpt };
}

/** Profile id: CLI flag > env > YAML config > default. */
function resolveProfileId(opts: { profile?: string }): ProfileId {
  return (opts.profile ?? process.env.CARATULAI_PROFILE ?? getConfigValue<string>(yamlConfig, "generation.profile", "sagan")) as ProfileId;
}

/** Model set name: --model-set (global flag, env default) > YAML active_set. */
function resolveModelSetName(): string | undefined {
  return program.opts().modelSet ?? getConfigValue<string | undefined>(yamlConfig, "models.active_set", undefined);
}

function defaultSeed(): number {
  if (process.env.CARATULAI_SEED) return parseInt(process.env.CARATULAI_SEED, 10);
  return getConfigValue<number>(yamlConfig, "cli.seed", 16384);
}

function printGenerationFailure(err: unknown, providerName: string, providerLabel: string): void {
  console.error(`Generation failed via ${providerLabel}:`);
  console.error(`  ${err instanceof Error ? err.message : String(err)}`);
  if (providerName === "openrouter") {
    const hasKey = !!(process.env.OPENROUTER_API_KEY || process.env.SVG_MODEL_API_KEY);
    console.error(`  Check: API key valid? Rate limited? Model exists?`);
    console.error(`  API Key: ${hasKey ? "set" : "NOT SET"}`);
  }
  if (providerName === "ollama" || providerName === "lmstudio") {
    console.error(`Is the local server running? See wiki/11-LLM Providers.`);
  }
}

/** Where to write the SVG: --out wins; otherwise the auto-save dir (env > YAML) if configured. */
function resolveOutPath(opts: { out?: string; name?: string }, profileId: string): string | null {
  if (opts.out) return opts.out;
  const autoSaveDir = process.env.CARATULAI_AUTO_SAVE_DIR || getConfigValue<string | undefined>(yamlConfig, "output.auto_save_dir", undefined);
  return autoSaveDir ? generateTimestampFilename(autoSaveDir, profileId, opts.name) : null;
}

/** Write the SVG plus a sidecar .log capturing everything needed to reproduce it. */
async function saveResult(args: {
  outPath: string;
  result: GenerationResult;
  sourceInfo?: string;
  paramLines: string[];
}): Promise<void> {
  const { outPath, result, sourceInfo, paramLines } = args;
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, result.svg, "utf8");

  const logPath = outPath.replace(/\.svg$/, ".log");
  const logContent = [
    `Generated: ${new Date().toISOString()}`,
    `SVG File: ${outPath}`,
    "",
    ...(sourceInfo ? ["Source:", `  ${sourceInfo}`, ""] : []),
    "Parameters:",
    ...paramLines.map((l) => `  ${l}`),
    "",
    "Prompt Sent:",
    result.prompt,
    "",
    "Validation Issues Fixed:",
    result.report.issues.length > 0
      ? result.report.issues.map((i) => `  [${i.rule}] ${i.message}`).join("\n")
      : "  (none)",
    "",
  ].join("\n");
  await writeFile(logPath, logContent, "utf8");
  console.error(`Wrote ${outPath}`);
  console.error(`Logged ${logPath}`);
}

/** Emit the result: save to disk (with log) when a path resolved, else stream to stdout. */
async function emitResult(args: {
  opts: { out?: string; name?: string };
  profileId: string;
  result: GenerationResult;
  sourceInfo?: string;
  paramLines: string[];
}): Promise<void> {
  for (const issue of args.result.report.issues) {
    console.error(`  fixed [${issue.rule}] ${issue.message}`);
  }
  const outPath = resolveOutPath(args.opts, args.profileId);
  if (outPath) {
    await saveResult({ outPath, result: args.result, sourceInfo: args.sourceInfo, paramLines: args.paramLines });
  } else {
    process.stdout.write(args.result.svg + "\n");
  }
}

const program = new Command();

program
  .name("caratulai")
  .description("Alien image generator — concepts to simple vector images in fundamental palettes")
  .version(pkg.version);

program.option("--model-set <name>", "named model set from caratulai.config.yaml", process.env.CARATULAI_MODEL_SET);

program
  .command("palettes")
  .description("List built-in fundamental palettes")
  .action(() => {
    for (const p of Object.values(BUILTIN_PALETTES)) {
      console.log(`${p.id.padEnd(12)} ${p.colors.length} colors  ${p.label ?? ""}`);
    }
  });

program
  .command("generate-svg")
  .description("Generate SVG directly from concept tags (no extraction)")
  .argument("[tags...]", "concept tags (e.g. star water travel), or use CARATULAI_DEFAULT_TAGS from .env")
  .option("-p, --palette <id>", "palette id (see `caratulai palettes`)")
  .option("--profile <id>", `image profile: ${PROFILE_IDS.join(" | ")}`)
  .option("--svg-provider <name>", "llm backend for SVG generation (echo | ollama | lmstudio | openrouter)")
  .option("--svg-model <model>", "model for SVG generation (must be good at code generation)")
  .option("--base-url <url>", "override the provider base URL")
  .option("-o, --out <file>", "write SVG to this path instead of stdout")
  .option("--name <label>", "filename prefix for auto-saved output (e.g. 'dawn' → dawn_sagan_20260627143022.svg)")
  .option("-s, --seed <n>", "seed for variation", (v) => parseInt(v, 10), defaultSeed())
  .option("-t, --temperature <n>", "sampling temperature", (v) => parseFloat(v))
  .option("--ratio <preset>", "aspect ratio preset: square, 16:9, 4:3, 21:9, 9:16, 3:4, or custom like 16:9")
  .option("--width <n>", "canvas width (overrides --ratio)", (v) => parseInt(v, 10))
  .option("--height <n>", "canvas height (overrides --ratio)", (v) => parseInt(v, 10))
  .action(async (tags: string[], opts) => {
    try {
      // Resolve tags: CLI args > env var > YAML config > error
      let finalTags = tags && tags.length > 0 ? tags : [];
      if (finalTags.length === 0) {
        const configured =
          process.env.CARATULAI_DEFAULT_TAGS || getConfigValue<string | undefined>(yamlConfig, "cli.default_tags", undefined);
        finalTags = configured?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];
      }
      if (finalTags.length === 0) {
        console.error("Error: provide tags, set CARATULAI_DEFAULT_TAGS env, or set cli.default_tags in caratulai.config.yaml");
        process.exitCode = 1;
        return;
      }

      const { width, height, ratioLabel } = resolveDimensions(opts);
      const profileId = resolveProfileId(opts);
      const profileDef = getProfile(profileId);
      const paletteId = resolveOpt(opts.palette, "CARATULAI_PALETTE", profileDef.paletteId);
      const temperature = resolveOpt(opts.temperature, "CARATULAI_TEMPERATURE", 0.7, parseFloat);

      // SVG model: CLI flags > env > active model set from YAML > echo
      const svgConfig = getModelSurfaceConfig(yamlConfig, "svg", resolveModelSetName());
      const svgProviderName = opts.svgProvider ?? process.env.CARATULAI_SVG_PROVIDER ?? svgConfig?.provider ?? "echo";
      const svgModelId = opts.svgModel ?? process.env.CARATULAI_SVG_MODEL ?? svgConfig?.model;

      console.error(`[DEBUG] SVG: ${svgProviderName}/${svgModelId || "(default)"}  Profile: ${profileId}`);

      const palette = getPalette(paletteId);
      if (!palette) {
        console.error(`Unknown palette "${paletteId}". Try: ${Object.keys(BUILTIN_PALETTES).join(", ")}`);
        process.exitCode = 1;
        return;
      }

      let svgProvider: LLMProvider;
      try {
        svgProvider = buildProvider({
          ...opts,
          provider: svgProviderName,
          model: svgModelId,
          baseUrl: opts.baseUrl ?? svgConfig?.base_url,
          apiKeyEnv: svgConfig?.api_key_env,
          modelType: "svg",
        });
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
        process.exitCode = 1;
        return;
      }

      const constraints = { ...createConstraints(profileDef), width, height };

      const req: GenerationRequest = {
        tags: finalTags,
        palette,
        constraints,
        params: { model: svgModelId || svgProvider.models[0], temperature, seed: opts.seed },
        profile: profileId,
      };

      let result: GenerationResult;
      try {
        result = await generate(req, svgProvider);
      } catch (err) {
        printGenerationFailure(err, svgProviderName, svgProvider.name);
        process.exitCode = 1;
        return;
      }

      await emitResult({
        opts,
        profileId,
        result,
        paramLines: [
          `Tags: ${finalTags.join(", ")}`,
          `Profile: ${profileId}`,
          `Palette: ${paletteId}`,
          `Ratio: ${ratioLabel}`,
          `Canvas: ${width}x${height}`,
          `SVG Provider: ${svgProviderName}`,
          `SVG Model: ${svgModelId || svgProvider.models[0]}`,
          `Temperature: ${temperature}`,
          `Seed: ${opts.seed}`,
        ],
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`\n❌ Error: ${errorMsg}`);
      if (process.env.DEBUG) {
        console.error("\nFull stack trace:");
        console.error(err);
      }
      process.exitCode = 1;
    }
  });

program
  .command("generate")
  .description("Generate an SVG from concept tags, narrative text, URL, or image")
  .argument("[tags...]", "concept tags, e.g. star water travel (required unless --from-text, --from-url, or --from-image is used)")
  .option("-p, --palette <id>", "palette id (see `caratulai palettes`)")
  .option("--profile <id>", `image profile: ${PROFILE_IDS.join(" | ")}`)
  .option("--text-provider <name>", "llm backend for text extraction (echo | ollama | lmstudio | openrouter)")
  .option("--text-model <model>", "model for text extraction")
  .option("--svg-provider <name>", "llm backend for SVG generation (echo | ollama | lmstudio | openrouter)")
  .option("--svg-model <model>", "model for SVG generation (must be good at code generation)")
  .option("--image-provider <name>", "llm backend for image reading (echo | ollama | lmstudio | openrouter)")
  .option("--image-model <model>", "model for image reading (e.g. openai/gpt-4o, llava:13b)")
  .option("--base-url <url>", "override the provider base URL")
  .option("-o, --out <file>", "write SVG to this path instead of stdout")
  .option("--name <label>", "filename prefix for auto-saved output (e.g. 'dawn' → dawn_sagan_20260627143022.svg)")
  .option("-s, --seed <n>", "seed for variation", (v) => parseInt(v, 10), defaultSeed())
  .option("-t, --temperature <n>", "sampling temperature", (v) => parseFloat(v))
  .option("--ratio <preset>", "aspect ratio preset: square, 16:9, 4:3, 21:9, 9:16, 3:4, or custom like 16:9")
  .option("--width <n>", "canvas width (overrides --ratio)", (v) => parseInt(v, 10))
  .option("--height <n>", "canvas height (overrides --ratio)", (v) => parseInt(v, 10))
  .option("--from-text <text>", "extract concept tags from narrative text")
  .option("--from-url <url>", "fetch text from a URL and extract concept tags from it")
  .option("--from-image <path-or-url>", "extract concepts from an image file or URL (requires vision model)")
  .action(async (tags: string[], opts) => {
    try {
      const profileId = resolveProfileId(opts);
      const profileDef = getProfile(profileId);
      const paletteId = resolveOpt(opts.palette, "CARATULAI_PALETTE", profileDef.paletteId);
      const { width, height, ratioLabel } = resolveDimensions(opts);
      const temperature = resolveOpt(opts.temperature, "CARATULAI_TEMPERATURE", 0.7, parseFloat);

      const modelSetName = resolveModelSetName();
      const textConfig = getModelSurfaceConfig(yamlConfig, "text", modelSetName);
      const svgConfig = getModelSurfaceConfig(yamlConfig, "svg", modelSetName);
      const imageConfig = getModelSurfaceConfig(yamlConfig, "image", modelSetName);

      // Text model (extraction from narrative text)
      const textProviderName = opts.textProvider ?? process.env.CARATULAI_TEXT_PROVIDER ?? textConfig?.provider ?? "echo";
      const textModelId = opts.textModel ?? process.env.CARATULAI_TEXT_MODEL ?? textConfig?.model;

      // SVG model (generation from tags)
      const svgProviderName = opts.svgProvider ?? process.env.CARATULAI_SVG_PROVIDER ?? svgConfig?.provider ?? "echo";
      const svgModelId = opts.svgModel ?? process.env.CARATULAI_SVG_MODEL ?? svgConfig?.model;

      console.error(`[DEBUG] TEXT: ${textProviderName}/${textModelId || "(default)"}  SVG: ${svgProviderName}/${svgModelId || "(default)"}  Profile: ${profileId}`);

      // Validate that either tags, --from-text, --from-url, or --from-image is provided.
      const hasPositionalTags = tags && tags.length > 0;
      if (!hasPositionalTags && !opts.fromText && !opts.fromUrl && !opts.fromImage) {
        console.error("Error: provide either positional tags, --from-text <text>, --from-url <url>, or --from-image <path-or-url>");
        process.exitCode = 1;
        return;
      }

      const palette = getPalette(paletteId);
      if (!palette) {
        console.error(`Unknown palette "${paletteId}". Try: ${Object.keys(BUILTIN_PALETTES).join(", ")}`);
        process.exitCode = 1;
        return;
      }

      // Build SVG generation provider
      let svgProvider: LLMProvider;
      try {
        svgProvider = buildProvider({
          ...opts,
          provider: svgProviderName,
          model: svgModelId,
          baseUrl: opts.baseUrl ?? svgConfig?.base_url,
          apiKeyEnv: svgConfig?.api_key_env,
          modelType: "svg",
        });
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
        process.exitCode = 1;
        return;
      }

      // Build text extraction provider (or reuse SVG provider if same)
      let textProvider: LLMProvider;
      if (textProviderName === svgProviderName && textModelId === svgModelId) {
        textProvider = svgProvider;
      } else {
        try {
          textProvider = buildProvider({
            ...opts,
            provider: textProviderName,
            model: textModelId,
            baseUrl: opts.baseUrl ?? textConfig?.base_url,
            apiKeyEnv: textConfig?.api_key_env,
            modelType: "text",
          });
        } catch (err) {
          console.error(err instanceof Error ? err.message : String(err));
          process.exitCode = 1;
          return;
        }
      }

      // Image provider (for vision models)
      let imageProvider: LLMProvider;
      const imageProviderName = opts.imageProvider ?? imageConfig?.provider ?? "openrouter";
      const imageModelId = opts.imageModel ?? imageConfig?.model ?? "openai/gpt-4o";
      if (imageProviderName === svgProviderName && imageModelId === svgModelId) {
        imageProvider = svgProvider;
      } else {
        try {
          imageProvider = buildProvider({
            ...opts,
            provider: imageProviderName,
            model: imageModelId,
            baseUrl: opts.baseUrl ?? imageConfig?.base_url,
            apiKeyEnv: imageConfig?.api_key_env,
            modelType: "image",
          });
        } catch (err) {
          console.error(`Failed to build image provider: ${err instanceof Error ? err.message : String(err)}`);
          process.exitCode = 1;
          return;
        }
      }

      // Resolve input source: --from-image → --from-url → --from-text → positional tags
      let finalTags: string[] = [];
      let sourceText: string | null = null;

      if (opts.fromImage) {
        // Image input: analyze image and extract tags
        try {
          const imageResult = await analyzeImage(
            { source: opts.fromImage, params: { model: imageModelId, temperature, seed: opts.seed } },
            imageProvider
          );
          finalTags = imageResult.tags;
          console.error(`Image analysis: ${imageResult.narrative}`);
          console.error(`Extracted concepts: ${finalTags.join(", ")}`);
        } catch (err) {
          console.error(`Image analysis failed: ${err instanceof Error ? err.message : String(err)}`);
          process.exitCode = 1;
          return;
        }
      } else if (opts.fromUrl) {
        try {
          sourceText = await fetchTextFromUrl(opts.fromUrl);
          console.error(`Fetched ${sourceText.length} chars from ${opts.fromUrl}`);
        } catch (err) {
          console.error(`Failed to fetch URL: ${err instanceof Error ? err.message : String(err)}`);
          process.exitCode = 1;
          return;
        }
      } else if (opts.fromText) {
        sourceText = opts.fromText;
      }

      if (sourceText) {
        try {
          finalTags = await extractTags(sourceText, textProvider, {
            model: textModelId || textProvider.models[0],
            temperature,
            seed: opts.seed,
          });
          console.error(`Extracted concepts: ${finalTags.join(", ")}`);
        } catch (err) {
          console.error(`Extraction failed: ${err instanceof Error ? err.message : String(err)}`);
          process.exitCode = 1;
          return;
        }
      } else if (!opts.fromImage) {
        finalTags = tags || [];
      }

      const constraints = { ...createConstraints(profileDef), width, height };

      const req: GenerationRequest = {
        tags: finalTags,
        palette,
        constraints,
        params: { model: svgModelId || svgProvider.models[0], temperature, seed: opts.seed },
        profile: profileId,
      };

      let result: GenerationResult;
      try {
        result = await generate(req, svgProvider);
      } catch (err) {
        printGenerationFailure(err, svgProviderName, svgProvider.name);
        process.exitCode = 1;
        return;
      }

      const sourceInfo = opts.fromUrl
        ? `URL: ${opts.fromUrl}`
        : opts.fromText
          ? `Text: ${opts.fromText.substring(0, 100)}...`
          : opts.fromImage
            ? `Image: ${opts.fromImage}`
            : `Tags: ${finalTags.join(", ")}`;

      await emitResult({
        opts,
        profileId,
        result,
        sourceInfo,
        paramLines: [
          `Final Tags: ${finalTags.join(", ")}`,
          `Profile: ${profileId}`,
          `Palette: ${paletteId}`,
          `Ratio: ${ratioLabel}`,
          `Canvas: ${width}x${height}`,
          `Text Provider: ${textProviderName}`,
          `Text Model: ${textModelId || textProvider.models[0]}`,
          `SVG Provider: ${svgProviderName}`,
          `SVG Model: ${svgModelId || svgProvider.models[0]}`,
          `Temperature: ${temperature}`,
          `Seed: ${opts.seed}`,
        ],
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`\n❌ Error: ${errorMsg}`);
      if (process.env.DEBUG) {
        console.error("\nFull stack trace:");
        console.error(err);
      }
      process.exitCode = 1;
    }
  });

program.parseAsync().catch((err) => {
  if (err instanceof Error) {
    // User-friendly error messages for common issues
    if (err.message.includes("API key")) {
      console.error(`\n❌ API Configuration Error: ${err.message}`);
      console.error("\nSet up your .env file with required API keys:");
      console.error("  TEXT_MODEL_API_KEY=sk-or-v1-...");
      console.error("  SVG_MODEL_API_KEY=sk-or-v1-...");
      console.error("  IMAGE_MODEL_API_KEY=sk-or-v1-...");
    } else if (err.message.includes("HTTP")) {
      console.error(`\n❌ LLM Provider Error: ${err.message}`);
      console.error("\nCheck: API key valid? Rate limited? Model exists?");
    } else if (err.message.includes("ENOENT")) {
      console.error(`\n❌ File Error: ${err.message}`);
      console.error("Check that the file path is correct and accessible.");
    } else {
      console.error(`\n❌ Error: ${err.message}`);
      if (process.env.DEBUG) {
        console.error("\nFull stack trace:");
        console.error(err.stack);
      } else {
        console.error("\nFor detailed error trace, set DEBUG=1 and try again.");
      }
    }
  } else {
    console.error(`\n❌ Unexpected error:`, err);
  }
  process.exitCode = 1;
});
