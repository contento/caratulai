# caratulai

[![CI](https://github.com/contento/caratulai/actions/workflows/ci.yml/badge.svg)](https://github.com/contento/caratulai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Carátula** (Spanish): the cover sheet — the first image you meet.

An **alien image generator**: concepts (tags/ontology) → simple vector images in fundamental palettes.

Lineage: Voyager Golden Record · Picasso's line · contento/conten.to.

## Quick start

Requires Node ≥ 20 and pnpm (`corepack enable pnpm`).

```sh
pnpm install && pnpm build
```

## Usage

The main entry point is the `generate` command. Use the wrapper scripts (`./caratulai.sh` or `.\caratulai.ps1`) — they build the CLI on demand.

### From tags

```sh
# Explicit output path
./caratulai.sh generate star water travel --profile sagan --out out/idea.svg

# Auto-save with timestamped filename (sagan_20260627143022.svg)
./caratulai.sh generate star water travel --profile sagan

# Add a custom name prefix (dawn_sagan_20260627143022.svg)
./caratulai.sh generate star water travel --profile sagan --name dawn
```

### From narrative text

```sh
./caratulai.sh generate --from-text "A dark journey across an ancient ocean" --profile picasso
./caratulai.sh generate --from-text "A dark journey across an ancient ocean" --profile picasso --name voyage
```

### From a URL (text or image)

```sh
# Fetch text from URL, extract concepts, generate
./caratulai.sh generate --from-url https://example.com/article.txt --profile sagan

# Analyze image from URL using vision model (requires image-model provider)
./caratulai.sh generate --from-image https://example.com/art.png --profile contento --name art
```

### From an image file (vision model required)

```sh
./caratulai.sh generate --from-image ./photo.jpg --profile contento --name photo
```

### Use a named model set from config

Model sets group provider + model combinations. Define them in `caratulai.config.yaml`, then reference by name:

```sh
./caratulai.sh --model-set lmstudio generate star water travel --profile sagan
./caratulai.sh --model-set openrouter generate star water travel --profile sagan
```

### Override individual models

```sh
# Use specific SVG generation model
./caratulai.sh generate star water travel --svg-provider ollama --svg-model mistral --profile sagan

# Use specific text extraction model
./caratulai.sh generate --from-text "..." --text-provider ollama --text-model qwen2.5 --profile sagan

# Use specific image analysis model (for vision extraction)
./caratulai.sh generate --from-image photo.jpg --image-provider openrouter --image-model openai/gpt-4o --profile contento
```

### PowerShell

Replace `./caratulai.sh` with `.\caratulai.ps1`:

```powershell
.\caratulai.ps1 generate star water travel --profile sagan
.\caratulai.ps1 generate --from-text "A dark ocean" --profile picasso --name voyage
.\caratulai.ps1 --model-set lmstudio generate star water travel --profile sagan
```

### List palettes
```sh
./caratulai.sh palettes
```

## Documentation

Full documentation lives in the wiki — open [wiki/](wiki/) as an Obsidian vault or read on GitHub.

- **[Vision](wiki/01-Vision.md)** — why this exists, the founding prompt, the musical analogy
- **[Getting Started](wiki/09-Getting%20Started.md)** — install, run, first generation
- **[Profiles](wiki/03-Profiles.md)** — aesthetic styles (sagan · picasso · contento · dictionary · ...)
- **[Profile Gallery](wiki/profiles/00-gallery.md)** — visual samples for all 13 profiles
- **[LLM Providers](wiki/11-LLM%20Providers.md)** — local (Ollama · LM Studio) and remote (OpenRouter)
- **[Roadmap](wiki/17-Roadmap.md)** — M0–M10 milestones
- **[Contributing](wiki/13-Contributing.md)** — dev setup, conventions, PRs

Status: early build. Core engine + CLI are working; web/desktop/server deferred.
