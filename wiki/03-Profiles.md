# Image Generation Profiles

Seven aesthetic styles, each with distinct constraints and prompt tone. **All profiles enforce ZERO text elements.**

| Profile | Aesthetic | Palette | Max Elements | Shapes | Use Case |
| --- | --- | --- | --- | --- | --- |
| **sagan** | Voyager Golden Record | Gold + Silver | 48 | Fundamental only | Cosmic, profound, archival |
| **picasso** | Single-line drawings | B/W | 20 | Fundamental only | Sophisticated, minimal, elegant |
| **contento** | Rich, dense, layered | 256-color | 80 | All shapes + effects | Visual abundance, complexity |
| **dictionary** | Vocabulary & icons | 256-color | 60 | All shapes + effects | Semantic visual library |
| **freud** | Layers of the psyche | Grayscale + sepia | 50–70 | Shapes + groups | Unconscious drives, dream logic |
| **jung** | Archetypal symbols | 256-color | 50 | Shapes + groups | Psychological/symbolic depth |
| **nietzsche** | Genealogy of concepts | 256-color | 40–100 | Shapes + arrows | Philosophical/conceptual mapping |

## Per-Profile Details

### sagan (implemented)

**Aesthetic:** Voyager Golden Record. Gold background (#d4af37), silver text/lines (#c0c0c0).

Voyager record plate aesthetic: technical, minimal, profound. The canonical reference for cosmic communication — a message to an alien civilization.

**Palette:** Gold + Silver (2 colors). Hard constraint.

**Max elements:** 48

**Prompt tone:** Archival, scientific, timeless. Imagine a diagram on a phonograph record that's traveled 50 years through space.

### picasso (implemented)

**Aesthetic:** Elegant, sophisticated lines. Minimal shapes. Single-line drawing style.

**Palette:** B/W (black on white).

**Max elements:** 20. Sparse; elegance through restraint.

**Prompt tone:** Minimalist, sophisticated, single-stroke. Think Picasso's line drawings — economical and perfect.

### contento (implemented)

**Aesthetic:** Less restrained. Rich complexity, 80+ elements, all shapes allowed. Dense, layered, visually abundant.

**Palette:** 256-color (full semantic palette).

**Max elements:** 80.

**Prompt tone:** Visual abundance. All SVG shapes permitted: paths, polygons, circles, groups, gradients, patterns, effects.

**Use case:** When you want to showcase the full range of visual possibility.

### dictionary (implemented)

**Aesthetic:** Dictionary-based generation. Uses visual vocabulary and pattern library.

**Palette:** 256-color.

**Max elements:** 60.

**Prompt tone:** Vocabulary-centric. Compose scenes from reusable semantic primitives. See [[design/02-Dictionary Profile]] for the full vision.

### freud (defined)

**Aesthetic:** Concentric psychological layers (id, ego, superego) in grayscale + sepia. Dream-like, introspective, symbolic.

**Palette:** Grayscale + sepia (warm brown/rust tones inside → cool gray outside).

**Max elements:** 50–70.

**Prompt tone:** Dream-like introspection. "Create nested, concentric psychological structures. Innermost core is sepia/warm (id), middle gray (ego), outer cool gray (superego). Use spirals, layered shapes, fading edges."

**Key visual metaphors:** Concentric circles/rings (consciousness layers), spirals (libido), organic forms (id), geometric boundaries (superego), fading/blurring edges (repression).

→ **Full spec:** [[design/03-Freud-Jung-Nietzsche Profiles]]

### jung (defined)

**Aesthetic:** Archetypal symbols from collective unconscious. Mandalas, sacred geometry, symbolic animals. Radially symmetric compositions.

**Palette:** 256-color (emphasize gold, deep blue, purple, green).

**Max elements:** 50.

**Prompt tone:** Sacred, integrated, mythic. "Create a mandala-like vision with luminous gold center (the Self). Concentric rings. Include symbolic animals (lion=Hero, serpent=Shadow, owl=Wise Old Man, dove=Anima). Rich colors, radial symmetry."

**Key visual metaphors:** Mandalas (the Self), concentric circles (psyche layers), symbolic animals (archetypes), sacred geometry (divine order), gold luminosity (divine center).

→ **Full spec:** [[design/03-Freud-Jung-Nietzsche Profiles]]

### nietzsche (defined)

**Aesthetic:** Hierarchical & cyclical. Philosophical genealogy via opposing forces (Apollonian/Dionysian, master/slave morality), eternal recurrence, will-to-power.

**Palette:** 256-color with emphasis on opposing pairs (gold ↔ black, red ↔ blue).

**Max elements:** 40–100 (concept-driven; more complex concepts = more elements).

**Prompt tone:** Philosophical, dialectical. "Create a hierarchical diagram with opposing forces in tension: order (Apollonian, gold/white/structured) vs chaos (Dionysian, black/red/organic). Show arrows and flows for transformation. Include spirals for eternal recurrence. Ascend toward synthesis (Übermensch)."

**Key visual metaphors:** Hierarchies/trees (genealogy), opposing colors/positions (Apollonian vs Dionysian), cycles/spirals (eternal recurrence), arrows/flows (will-to-power), ascending paths (Übermensch).

→ **Full spec:** [[design/03-Freud-Jung-Nietzsche Profiles]]

## Configuration

**Via `caratulai.config.yaml`:**
```yaml
generation:
  profile: sagan  # or picasso, contento, dictionary, ...
```

**Via CLI:**
```sh
node packages/cli/dist/index.js generate star water --profile sagan --out out/idea.svg
```

## See Also

- [[02-Principles]] — the 7 hard aesthetic constraints all profiles enforce
- [[04-Stack]] — the generation pipeline and how profiles shape prompts
