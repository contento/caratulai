# Image-to-SVG Pipeline

## Overview

Convert images (file paths or URLs) to Caratulai SVG by extracting visual concepts and generating vector art through the existing ontology pipeline.

## Pipeline

```
Image (file/URL) → Vision Model → Narrative Description → Extract Tags → SVG Generation
```

### Steps

1. **Image Input**: Accept local file path or HTTP(S) URL
2. **Image Analysis**: Vision model extracts narrative description of the image
3. **Ontology Extraction**: Existing `extractTags()` converts narrative to concept tags
4. **SVG Generation**: Standard `generate()` pipeline creates the SVG

## Model Recommendations

### Remote Models (via OpenRouter)

| Model | Provider | Vision Quality | Notes |
|-------|----------|----------------|-------|
| `openai/gpt-4o` | OpenAI | ★★★★★ | Best overall vision, fast |
| `anthropic/claude-3.5-sonnet` | Anthropic | ★★★★★ | Excellent detail, nuanced |
| `google/gemini-1.5-pro` | Google | ★★★★☆ | Good, handles large images |
| `meta-llama/llama-3.2-90b-vision` | Meta | ★★★★☆ | Open source, strong |
| `openai/gpt-4-vision-preview` | OpenAI | ★★★★☆ | Legacy, still capable |

### Local Models

| Model | Size | VRAM | Quality | Notes |
|-------|------|------|---------|-------|
| **LLaVA 1.6 34B** | 34B | ~20GB | ★★★★☆ | Best open-source vision |
| **LLaVA 1.6 13B** | 13B | ~10GB | ★★★☆☆ | Good balance |
| **BakLLaVA 1** | 13B | ~10GB | ★★★★☆ | Enhanced LLaVA |
| **Moondream2** | 1.8B | ~4GB | ★★☆☆☆ | Lightweight, fast |
| **MiniCPM-V 2.6** | 8B | ~8GB | ★★★★☆ | Efficient, Chinese+English |
| **LLaVA-Phi-3** | 3.8B | ~6GB | ★★★☆☆ | Small but capable |

### Recommended Configuration

**For best quality (remote):**
```yaml
models:
  image:
    provider: "openrouter"
    model: "openai/gpt-4o"
    api_key_env: "IMAGE_MODEL_API_KEY"
```

**For local (Ollama):**
```yaml
models:
  image:
    provider: "ollama"
    model: "llava:13b"
```

**For local (LM Studio):**
```yaml
models:
  image:
    provider: "lmstudio"
    model: "llava-13b"
```

## API Design

### Core Function

```typescript
interface ImageAnalysisRequest {
  /** Local file path or HTTP(S) URL */
  source: string;
  /** Model parameters */
  params?: Partial<GenerationParams>;
}

interface ImageAnalysisResult {
  /** Extracted narrative description */
  narrative: string;
  /** Derived concept tags */
  tags: string[];
  /** Source path/URL */
  source: string;
}

export async function analyzeImage(
  request: ImageAnalysisRequest,
  provider: LLMProvider | ModelLadder
): Promise<ImageAnalysisResult>;
```

### CLI Interface

```bash
# From local file
caratulai generate --from-image ./photo.jpg --profile sagan

# From URL
caratulai generate --from-image https://example.com/image.png --profile contento

# With specific model
caratulai generate --from-image ./art.jpg --image-model gpt-4o --profile picasso
```

## Implementation Details

### Image Encoding

- **Local files**: Read and encode to base64, detect MIME type from extension
- **URLs**: Fetch and encode to base64, use Content-Type header for MIME

### Prompt for Vision Model

```
You are caratulai's image analyst. Describe this image in 2-3 sentences, focusing on:
- Main subjects and objects
- Composition and spatial relationships
- Colors and visual mood

Be concrete and visual. Avoid abstract interpretations.

Description:
```

### Provider Support

All existing providers support the OpenAI chat completions format. Vision models require:
- `messages[].content` as array with `image_url` type
- Base64 data URI or HTTP URL

## Future Enhancements

- Batch processing (multiple images)
- Style transfer (match profile aesthetic)
- Image-to-image variation (SVG preserves composition)
- Thumbnail generation for previews
