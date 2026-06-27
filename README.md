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

### From tags
```sh
# explicit output path
node packages/cli/dist/index.js generate star water travel --profile sagan --out out/idea.svg

# auto-save to output/ with timestamped filename (sagan_20260627143022.svg)
node packages/cli/dist/index.js generate star water travel --profile sagan

# add a name prefix (dawn_sagan_20260627143022.svg)
node packages/cli/dist/index.js generate star water travel --profile sagan --name dawn
```

### From narrative text
```sh
node packages/cli/dist/index.js generate --from-text "A dark journey across an ancient ocean" --profile picasso
node packages/cli/dist/index.js generate --from-text "A dark journey across an ancient ocean" --profile picasso --name voyage
```

### From an image (vision model required)
```sh
node packages/cli/dist/index.js generate --from-image ./photo.jpg --image-model openai/gpt-4o --profile contento
node packages/cli/dist/index.js generate --from-image https://example.com/art.png --profile sagan --name art
```

### Switch model sets
```sh
node packages/cli/dist/index.js generate star water travel --model-set lmstudio --profile sagan
node packages/cli/dist/index.js generate star water travel --model-set openrouter --profile sagan
```

### Helper scripts
```sh
# Linux/macOS
./caratulai.sh generate star water travel --profile sagan
./caratulai.sh generate star water travel --profile sagan --name dawn
./caratulai.sh generate star water travel --model-set lmstudio --profile sagan
./caratulai.sh generate --from-image ./photo.jpg --profile contento --name photo

# PowerShell
.\caratulai.ps1 generate star water travel --profile sagan
.\caratulai.ps1 generate star water travel --profile sagan --name dawn
.\caratulai.ps1 generate star water travel --model-set lmstudio --profile sagan
.\caratulai.ps1 generate --from-image .\photo.jpg --profile contento --name photo
```

### List palettes
```sh
node packages/cli/dist/index.js palettes
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
