# TODO.md — Roadmap Migrated

> The roadmap has been migrated to the wiki. See [[wiki/Roadmap]].

Open the wiki by reading [wiki/00-Home.md](wiki/00-Home.md) or opening [wiki/](wiki/) as an Obsidian vault. See [[wiki/17-Roadmap]] for full timeline.
- [ ] Examples gallery / docs
- [ ] Tag `v1.0.0` (triggers the release workflow)

---

## conten.to integration — per-post caratula seal 🟡 ⭐

> Goal: every conten.to blog post ends with a caratula — an SVG seal generated
> from the post's ontology (wiki concept mapping + frontmatter keywords).
> First consumer of caratulai as a library/CLI.

- [x] `scripts/generate_caratula.py` in conten.to: ontology extraction
      (wiki/sources/index.md concepts + post keywords → 4–6 tags) → caratulai CLI
- [x] Sample run: 5 posts × 3 profiles
- [x] **Decision: profile is dynamic per post** — the post's dominant (first)
      wiki concept picks the profile via the `CONCEPT_PROFILE` map in
      `generate_caratula.py` (attention→picasso, mythology→jung,
      narrative→gabriel, power→carlin, intelligence→sagan, …);
      `--profile` still forces one; fallback `contento`
- [ ] 🟡 Backfill all dated EN posts (~90 SVGs → `static/images/caratula/YYYY/MM/DD.svg`,
      one per post date, shared across EN/ES/FR) — 10/90 done; blocked on
      OpenRouter daily key limit; resume: `uv run scripts/generate_caratula.py --all`
- [x] Tag backfilled posts `before-caratulai` (marks posts published before the
      caratulai era / seals added retroactively) — 90 posts × EN/ES/FR
- [x] Hugo partial `layouts/partials/caratula.html`: seal rendered at end of post
      (after content, before tags footer), **accompanied by a short paragraph
      explaining the seal with a link to <https://caratul.ai>**; EN/ES/FR copy
- [x] Wire into ship pipeline: run alongside `generate_cover.py` when a seed ships
      (documented in conten.to AGENTS.md)
- [x] Update conten.to AGENTS.md (pipeline step + "things not to break")
- [ ] **Bug found during sample run:** the validator passes malformed SVG —
      truncated output ("premature end of data") and leaked `<thinking>` tags
      reach the written file (6/15 failures, clustered in dense profiles
      contento/sagan). The validator should XML-parse the final document and
      fail/retry, not just regex-fix palette/text. conten.to's
      `generate_caratula.py` works around it with xmllint-style validation +
      retry, but the fix belongs in core.

---

## Open questions (see [SPEC.md](SPEC.md))

- [ ] Web framework: SvelteKit vs React
- [ ] Default palette + first concepts
- [ ] Baseline local model for SVG (quality vs cost)
- [ ] Palette enforcement: strict color-snap vs prompt-only

## Backlog / ideas

- [ ] Diffusion as an opt-in mode (non-default; see ADR-0001)
- [ ] Palette designer / custom fundamental palettes
- [ ] Batch/CSV concept input
Legend: ✅ done · 🟡 in progress · ⬜ not started · ⭐ new

---

## M0 — Foundation ✅

> Goal: a buildable monorepo, a working engine skeleton, and a public repo.

- [x] Founding docs: README (vision + founding prompt), SPEC, AGENTS.md
- [x] ADRs: 0001 (LLM-SVG), 0002 (TS monorepo), 0003 (versioning)
- [x] Monorepo scaffold (pnpm + Turborepo + tsconfig base)
- [x] `core` engine: types, palettes (+ color-snap), prompt builder, validator, providers, generate
- [x] `cli`: `palettes` + `generate` commands (runs end to end with Echo placeholder)
- [x] Public GitHub repo: MIT, CI, tag-driven release, Dependabot, issue/PR templates, topics

---

## M1 — Real generation 🟡

> Goal: replace the Echo placeholder with real LLMs producing valid, on-aesthetic SVG.

- [x] **OpenAI-compatible provider** base (shared by all chat-completions backends)
- [x] **Ollama provider** (local, free)
- [x] **LM Studio provider** (local, free)
- [x] **OpenRouter provider** (remote — Grok + cheap models)
- [x] CLI wiring: `--provider` / `--model` / `--base-url`; minimalist `SYSTEM_PROMPT`
- [x] Provider docs ([docs/providers.md](docs/providers.md)) + `.env.example`
- [x] **Test suite** (Vitest): 69 tests across validator, palettes, prompt, generate, providers,
      model ladder, HTTP provider (mocked fetch), factories — coverage thresholds enforced (≥98%)
- [x] Re-enable the CI `test` step (now runs with coverage gating)
- [ ] Verify against a live local model (Ollama/LM Studio) and tune the prompt
- [ ] **Anthropic provider** (Claude — strongest at SVG), with prompt caching
- [ ] Model ladder wiring (local first, escalate to remote)

---

## M2 — Export

> Goal: turn SVG into the shareable formats from the founding prompt.

- [ ] SVG → PNG / JPEG (`@resvg/resvg-js`, `sharp`)
- [ ] SVG → PDF (`pdf-lib` / `svg2pdf`)
- [ ] SVG → ICO (`png-to-ico`)
- [ ] `caratulai export <svg> --to png,pdf,...` command
- [ ] Decide extra formats (WebP, EPS?) — see SPEC

---

## M3 — Ontology & concepts

> Goal: tags come from a real taxonomy, not free strings.

- [ ] Seed a first concept domain (SPEC open question #4)
- [ ] Concept/tag model + relations (taxonomy)
- [ ] Tag resolution: input → canonical concepts → prompt
- [ ] Optional RDF/Turtle export

---

## M4 — Variation & gallery

> Goal: many ideas per concept, swept over hyperparameters.

- [ ] `caratulai vary` — surface `generateVariations` (palette × seed × model sweep)
- [ ] Gallery output (contact sheet / index of variations)
- [ ] Reproducibility check: re-run from stored params reproduces the image

---

## M5 — Persistence

> Goal: save generations + metadata to files and/or DB.

- [ ] Drizzle schema: concepts, palettes, generations, images
- [ ] SQLite (local-first) + Postgres (remote/shared), same schema
- [ ] Save / list / load generations from the CLI
- [ ] File-based store option (SVG + sidecar metadata)

---

## M6 — Caratulize (image input) ⭐

> Goal: upload an image (with restrictions) and **caratulize** it (ES: *caratulizar*) —
> reduce it to a simple vector caratulai in a fundamental palette. The image→caratulai byproduct
> of the LLM-SVG pipeline: a vision model reads the image and emits constrained SVG, which then
> runs through the same validator/sanitizer.

- [ ] Input restrictions: allowed formats (PNG/JPEG/WebP), max dimensions, max file size
- [ ] Vision provider interface (multimodal: image + constraints → SVG)
- [ ] `caratulai caratulize <image>` command (alias: `caratulizar`)
- [ ] Reuse the validator pipeline (palette-snap, allowed primitives, complexity cap, no text)
- [ ] Safety/content checks on uploads (reject unsupported or disallowed content)
- [ ] Tune the "simplify, don't reproduce" prompt so output is a caratulai, not a tracing
- Depends on: M1 (a real provider). Feasible to pull earlier once one vision model is wired.

---

## M7 — Surfaces

> Goal: the four faces over the same engine.

- [ ] `web` — SvelteKit or React (SPEC open question #3): generate + caratulize + gallery
- [ ] `desktop` — Tauri 2, reusing the web UI
- [ ] `server` — Hono API + DB (shared/remote store)

---

## M8 — 1.0

> Goal: stabilize and ship a real release.

- [ ] Freeze the core API, SVG output contract, and CLI surface
- [ ] Examples gallery / docs
- [ ] Tag `v1.0.0` (triggers the release workflow)

---

## Open questions (see [SPEC.md](SPEC.md))

- [ ] Web framework: SvelteKit vs React
- [ ] Default palette + first concepts
- [ ] Baseline local model for SVG (quality vs cost)
- [ ] Palette enforcement: strict color-snap vs prompt-only

## Backlog / ideas

- [ ] Diffusion as an opt-in mode (non-default; see ADR-0001)
- [ ] Palette designer / custom fundamental palettes
- [ ] Batch/CSV concept input
