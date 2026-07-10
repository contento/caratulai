# caratulai — Agent Guidelines

**Project:** Alien image generator. Convert concepts (tags/ontology) → simple vector images in fundamental palettes.

**Workspace:** ESM TypeScript monorepo (pnpm + Turborepo). Node ≥ 20.

---

## Working Agreement

- **Early-stage.** Prefer small, reversible steps over big upfront structure.
- **Decisions matter.** Record non-obvious choices as short ADRs in `wiki/decisions/`.
- **Keep wiki current.** Open questions → `wiki/08-Open Questions`, outstanding work → `wiki/17-Roadmap`.
- **Use wrapper scripts:** `./caratulai.sh` (macOS/Linux) or `.\caratulai.ps1` (Windows) — they build CLI on demand.

---

## Aesthetic Guardrails (Hard Requirements)

**Every generated image must enforce these constraints:**

- **Palettes:** fundamental only (bw, grayscale, sepia, palette-16, palette-256). No full spectrum, rainbows, or rococo ornamentation.
- **Primitives:** line, path (arcs/curves), circle, polygon. Minimal element count per profile.
- **Text:** none by default. If allowed, single short label maximum.
- **Output:** SVG only (vector). Exports (PNG/PDF/JPEG/ICO) are derived.
- **Validator enforces all of this.** See `packages/core/src/validate.ts`.

---

## Architecture

**Keystone:** Images are **LLM-generated SVG** (text generation), not diffusion. This gives palette control, clean vectors, cheap iteration, and symbolic "alien" quality.

```
tags + palette + constraints
  ↓
buildPrompt() → injects profile tone + composition guidance
  ↓
LLM provider (ladder: echo → ollama → lmstudio → openrouter)
  ↓
validator/sanitizer (color-snap, strip text, allowed primitives, complexity cap)
  ↓
store + export (PDF/PNG/JPEG/ICO)
```

**Core vs Surfaces:** `packages/core` stays I/O-agnostic (no direct DB/filesystem). Surfaces (CLI, web, desktop, server) inject persistence.

**13 Generation Profiles:** Each a distinct philosophical framework (sagan, picasso, contento, dictionary, freud, jung, nietzsche, booch, carlin, trungpa, rosina, domingo, gabriel). Every profile has:
- Clear philosophy + historical grounding
- Concrete visual language (colors, shapes, constraints)
- Prompt tone tuned for LLM
- Composition guidance for spatial arrangement

See `wiki/03-Profiles` for full documentation.

---

## Build & Test

```bash
# Install & build
pnpm install
pnpm build

# Type-check
pnpm typecheck

# Test
pnpm test

# Run CLI (via wrapper script)
./caratulai.sh generate star water --profile sagan --out out/idea.svg
./caratulai.sh palettes
./caratulai.sh generate --from-text "A dark ocean" --profile picasso

# Generate visual samples (requires LLM provider; uses .env API keys)
pnpm samples:live

# List available profiles
./caratulai.sh generate --help | grep profile
```

---

## Code Conventions

- **ESM TypeScript**, strict mode. `@caratulai/<name>` scope.
- **Commits:** Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. Keep small & focused.
- **Tests:** Vitest. Coverage ≥ 98%. See `packages/core/src/` and `packages/cli/src/`.
- **Profiles:** Each profile's `composition` field shapes spatial arrangement. When adding/tuning a profile, include composition guidance matching its aesthetic philosophy. Test with `pnpm samples:live`.
- **ADRs:** Record decisions in `wiki/decisions/`. Use the index: `wiki/decisions/00-ADR Index.md`.

---

## Key Files & Directories

| Path | Purpose |
|------|---------|
| `packages/core/` | Engine: types, palettes, profiles, prompt builder, providers, validator |
| `packages/cli/` | Command-line interface (built first) |
| `wiki/` | Full documentation (Obsidian vault compatible) |
| `wiki/00-Home.md` | Wiki index |
| `wiki/01-Vision.md` | Why caratulai exists, musical analogy |
| `wiki/02-Principles.md` | 7 hard aesthetic constraints |
| `wiki/03-Profiles.md` | All 13 profiles overview + rationale |
| `wiki/profiles/` | Detailed profile specs + visual samples |
| `wiki/04-Stack.md` | Tech stack, monorepo layout, architecture |
| `wiki/09-Getting Started.md` | Install, run, first generation |
| `wiki/10-Configuration.md` | caratulai.config.yaml + .env setup |
| `wiki/11-LLM Providers.md` | Local (Ollama, LM Studio) & remote (OpenRouter) |
| `wiki/17-Roadmap.md` | M0–M10 milestones |
| `.github/` | Issue/PR templates |
| `caratulai.config.yaml` | Shared config (models, palettes, output dir) |
| `.env.example` | Secrets template (copy → .env, add your keys) |

---

## Input Pipeline: Ontology at the Root

All input sources (tags, images, narrative text) must convert to an ontology (concept tags) before generation.

```
Tags → ontology tags → final tags drive generation
Image → extract concepts → ontology tags → generation
Text → extract concepts → ontology tags → generation
```

**Why:** Predictable, tag-focused output respecting aesthetic constraints. Generation is never driven by original narrative or image—always by final ontology.

---

## LLM Provider Flags

Modern CLI uses type-specific flags:

```bash
# For text extraction (--from-text, --from-url, --from-image)
--text-provider <ollama|lmstudio|openrouter|echo>
--text-model <model-id>

# For SVG generation
--svg-provider <ollama|lmstudio|openrouter|echo>
--svg-model <model-id>

# For vision (image analysis)
--image-provider <ollama|lmstudio|openrouter|echo>
--image-model <model-id>

# Use named model sets from config
--model-set <name>  # e.g., lmstudio, ollama, openrouter
```

---

## Configuration

**`caratulai.config.yaml`** (committed, shared):
- Model sets (text, svg, image providers/models)
- Default profile, palette, ratio, seed
- Auto-save directory
- Generation defaults

**`.env`** (gitignored, local secrets):
- API keys: `OPENROUTER_API_KEY`, type-specific keys (`TEXT_MODEL_API_KEY`, etc.)
- Custom server URLs (if LM Studio or Ollama run elsewhere)
- Anthropic API key (future)

Copy `.env.example` → `.env`, fill in your keys.

---

## Testing Locally

**With Ollama (production-grade):**
```bash
ollama pull qwen2.5-coder  # or mistral, llama2
ollama serve               # runs in background
./caratulai.sh --model-set ollama generate star water --out out/test.svg
```

**With LM Studio (dev-friendly):**
1. Download from https://lmstudio.ai
2. Download a model (e.g., mistral-7b-instruct)
3. Developer ▸ Start Server (listens on http://localhost:1234/v1)
4. `./caratulai.sh --model-set lmstudio generate star water --out out/test.svg`

---

## Pull Request Checklist

1. Branch off `main`.
2. `pnpm build && pnpm typecheck` pass.
3. `pnpm test` passes (≥98% coverage enforced).
4. If generation changed: `pnpm samples:live` and verify output respects aesthetic constraints.
5. Open PR describing the change, linking any related issue.
6. Include ADR if decision isn't obvious.

---

## See Also

- **Full wiki:** `wiki/00-Home.md` — open `wiki/` as Obsidian vault or read on GitHub
- **Decisions:** `wiki/decisions/00-ADR Index.md`
- **Open questions:** `wiki/08-Open Questions.md`
- **Roadmap:** `wiki/17-Roadmap.md` (M0–M10, current status)
- **Contributing:** `CONTRIBUTING.md` — detailed dev guide
- **Specification:** `SPEC.md` — points to wiki (canonical docs)
