# Getting Started

## Installation & Setup

Requires **Node ≥ 20** and **pnpm** (enable it once with `corepack enable pnpm`).

```sh
pnpm install
pnpm build

# Verify the build
pnpm typecheck
```

## Running the CLI

Use the wrapper scripts (`./caratulai.sh` on macOS/Linux or `.\caratulai.ps1` on Windows) — they build the CLI on demand.

The CLI currently defaults to the `echo` provider (deterministic placeholder) so you can test without setting up an LLM.

### List available palettes

```sh
./caratulai.sh palettes
```

### Generate a simple image from tags

```sh
./caratulai.sh generate star water travel --out out/idea.svg
```

This will:
1. Parse the tags: `star`, `water`, `travel`
2. Build a prompt from the tags, palette (default: sagan), and profile
3. Call the echo provider (placeholder LLM)
4. Validate and optimize the SVG output
5. Save to `out/idea.svg` and a `.log` file with reproduction info

### Generate with a specific profile and palette

```sh
./caratulai.sh generate star water travel --profile picasso --palette gold --out out/idea.svg

# Auto-save with timestamp (sagan_20260701143022.svg)
./caratulai.sh generate star water travel --name mytag

# Auto-save with custom name prefix (mytag_sagan_20260701143022.svg)
./caratulai.sh generate star water travel --name mytag
```

### Generate from narrative text

```sh
./caratulai.sh generate --from-text "A dark journey through an ancient ocean" --profile picasso --out out/journey.svg
```

### Generate from an image (vision model required)

```sh
./caratulai.sh generate --from-image ./photo.jpg --profile contento --out out/photo.svg
```

### View the output

```sh
open out/idea.svg  # on macOS
# or use your preferred SVG viewer on Windows/Linux
```

## Using a Real LLM (Local)

To use a real LLM, set up a local backend (LM Studio or Ollama) and configure caratulai.

### LM Studio (easiest for testing on Mac)

1. Download and install from https://lmstudio.ai
2. Download a model (e.g., `mistral-7b-instruct`)
3. Start the server (Developer ▸ **Start Server**) — listens on `http://localhost:1234/v1`
4. Generate with caratulai:

```sh
./caratulai.sh generate star water \
  --svg-provider lmstudio --svg-model mistral-7b-instruct \
  --out out/idea.svg
```

Or reference a model set from your config:

```sh
./caratulai.sh --model-set lmstudio generate star water --out out/idea.svg
```

### Ollama (production, CLI-friendly)

1. Install from https://ollama.com
2. Pull a model:

```sh
ollama pull qwen2.5-coder
```

3. Start the server (runs in background):

```sh
ollama serve
```

4. Generate with caratulai:

```sh
./caratulai.sh generate star water \
  --svg-provider ollama --svg-model qwen2.5-coder \
  --out out/idea.svg
```

Or use a named model set:

```sh
./caratulai.sh --model-set ollama generate star water --out out/idea.svg
```

## Configuration

**Two files control behavior:**

1. **`caratulai.config.yaml`** — shareable configuration (models, palette, output dir, etc.). Committed to repo.
2. **`.env`** — secrets only (API keys). Gitignored. Copy `.env.example` and fill in your keys.

See [[10-Configuration]] for details.

## Next Steps

- Read [[02-Principles]] — understand the aesthetic constraints
- Read [[03-Profiles]] — learn about the different generation styles
- Read [[04-Stack]] — understand the architecture
- Read [[13-Contributing]] — if you want to contribute code
- Try different [[11-LLM Providers]] — local and remote
- See [[12-Testing Local Models]] — quick-start with LM Studio/Ollama

## Troubleshooting

**"Cannot find module '@caratulai/core'"**
- Make sure you ran `pnpm build` first: `ls packages/core/dist/index.js`

**Connection refused: localhost:1234**
- LM Studio not running? Open the app and click "Start Server"
- Check Settings → Server → Port (default is 1234)
- Verify with: `curl http://localhost:1234/v1/models`

**SVG output is empty or malformed**
- The echo provider emits a placeholder for testing
- Switch to a real LLM (LM Studio or Ollama) for actual generation
- Check the provider is running and accessible

**Generation is slow**
- First generation with LM Studio/Ollama can be slow (model load)
- Try a smaller model: `mistral-7b` or `neural-chat-7b` instead of `llama2-13b`
- See [[12-Testing Local Models]] for detailed benchmarking

## See Also

- [[11-LLM Providers]] — full setup guide for all backends
- [[12-Testing Local Models]] — benchmark models and measure performance
- [[10-Configuration]] — config.yaml reference
