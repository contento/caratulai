# Configuration

caratulai uses two configuration files with a clear separation of concerns:

## caratulai.config.yaml

**Purpose:** Shareable configuration — models, palettes, ratios, seeds, output directory, etc.

**Status:** Committed to repo. Safe to share with collaborators.

**Format:** YAML. Easy to read and edit manually.

**Example contents (as reference):**

```yaml
# Models & LLM settings
models:
  active_set: "openrouter"     # switch to "lmstudio" or "ollama" for local testing
  sets:
    openrouter:
      text:
        provider: "openrouter"
        model: "meta-llama/llama-3.1-8b-instruct"  # for concept extraction
        api_key_env: "OPENROUTER_API_KEY"
      svg:
        provider: "openrouter"
        model: "meta-llama/llama-3.1-70b-instruct"  # for SVG generation
        api_key_env: "OPENROUTER_API_KEY"
      image:
        provider: "openrouter"
        model: "openai/gpt-4o"  # for vision/image analysis
        api_key_env: "OPENROUTER_API_KEY"
    
    lmstudio:
      text:
        provider: "lmstudio"
        model: "mistral-7b-instruct"
        base_url: "http://localhost:1234/v1"
      svg:
        provider: "lmstudio"
        model: "mistral-7b-instruct"
        base_url: "http://localhost:1234/v1"
      image:
        provider: "lmstudio"
        model: "llava:13b"
        base_url: "http://localhost:1234/v1"
    
    ollama:
      text:
        provider: "ollama"
        model: "qwen2.5:7b"
      svg:
        provider: "ollama"
        model: "qwen2.5-coder:14b"
      image:
        provider: "ollama"
        model: "llava:13b"

# Generation settings
generation:
  profile: "sagan"            # or "picasso", "contento", "dictionary", etc.
  ratio: "16:9"               # or "square", "4:3", "21:9", or custom "1920:1080"
  seed: null                  # null = random, or a specific number for reproducibility

# Output settings
output:
  auto_save_dir: "./output"   # where to auto-save with timestamp filename
```

**Model types:**
- **text:** Used for extracting concepts from narrative text or URLs (`--from-text`, `--from-url`)
- **svg:** Used for generating SVG from concept tags (main generation)
- **image:** Used for vision models to analyze images (`--from-image`)

**Typical workflow:** 
1. Edit this file to set your default model set (e.g., `active_set: lmstudio` for local testing)
2. The CLI uses these defaults but accepts `--flag` overrides (e.g., `--svg-provider ollama --svg-model qwen2.5-coder:14b`)
3. Use `--model-set <name>` to switch model sets globally (e.g., `./caratulai.sh --model-set ollama generate ...`)

## .env

**Purpose:** Secrets only — API keys for remote services, local server URLs.

**Status:** Gitignored. Never committed. Each developer creates their own copy.

**Format:** Shell-style `KEY=VALUE` (no quotes needed).

**How to set it up:**

1. Copy the example:
   ```sh
   cp .env.example .env
   ```

2. Fill in your secrets:
   ```bash
   # Remote provider API keys (OpenRouter for multi-model access)
   OPENROUTER_API_KEY=sk-or-...
   
   # Or use individual provider keys for each model type
   TEXT_MODEL_API_KEY=sk-or-...      # for text extraction
   SVG_MODEL_API_KEY=sk-or-...       # for SVG generation
   IMAGE_MODEL_API_KEY=sk-or-...     # for vision models
   
   # Anthropic (Claude with prompt caching)
   ANTHROPIC_API_KEY=sk-ant-...
   
   # Custom local server URLs (if not default)
   # LM_STUDIO_URL=http://localhost:1234/v1
   # OLLAMA_URL=http://localhost:11434/v1
   ```

**Priority:** If you define `OPENROUTER_API_KEY`, it's used for all providers unless overridden by type-specific keys (`TEXT_MODEL_API_KEY`, etc.)

**Typical secrets:**
- `OPENROUTER_API_KEY` — for remote OpenRouter access (covers all model types)
- Type-specific keys — optional, override OPENROUTER_API_KEY for specific model uses
- `ANTHROPIC_API_KEY` — for Claude models
- Custom backend URLs — for local LM Studio or Ollama instances
- Database credentials (future: Postgres, SQLite) — for web/server surfaces

## Separation of Concerns

| File | Committed? | Contains | Edited by |
|---|---|---|---|
| `caratulai.config.yaml` | ✅ Yes | Model names, palette, output dir, generation params | Everyone (coordinated) |
| `.env` | ❌ No | API keys, passwords, personal server URLs | Only locally (each dev) |

**Benefits:**
- **Safe:** secrets never leak to git
- **Shareable:** config changes can be coordinated via git
- **Flexible:** each developer can override with their own `.env` without affecting the team

## Configuration Priority (CLI overrides config file)

When you run a CLI command, the priority is:

1. **CLI flags** (highest) — `--provider ollama --model qwen2.5-coder`
2. **Environment variables** (if set) — `export SVG_MODEL=claude`
3. **caratulai.config.yaml** (lowest) — `generation.profile: sagan`

Example — to override the config file just for one generation:

```sh
# config.yaml says "ollama", but use lmstudio just this once
node packages/cli/dist/index.js generate star water --provider lmstudio --model mistral --out out/test.svg
```

## See Also

- [[09-Getting Started]] — first-time setup
- [[11-LLM Providers]] — which provider to choose and how to set up each one
- [[12-Testing Local Models]] — verify your config works on your machine
