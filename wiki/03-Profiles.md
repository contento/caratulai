# Image Generation Profiles

**12 generation profiles**—each a distinct philosophical, epistemological, or aesthetic framework for visualizing concepts. Spanning aesthetics (minimal to maximal), psychology, philosophy, communication styles, engineering, grounded realism, and musical mastery. **All profiles enforce ZERO text elements.**

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

## Rationale: Why 7 Profiles?

Each profile answers a different question about how concepts should be visualized. Together, they cover the full spectrum from **minimal elegance** to **abundant complexity**, and from **scientific archival** to **philosophical genealogy**.

### The Visual Spectrum

```text
Restraint ────────────────────────────────────────────→ Abundance
  ↑                                                         ↑
Picasso (20 el)    Sagan (48 el)    Freud/Jung    Nietzsche/Dictionary    Contento (80+ el)
"Say it with        "Timeless        (50-70 el)    (variable/60 el)        "Show it all
one perfect line"   archive"         "Internal     "Compose from           in rich color"
                                     psychology"   concepts"
```

### By Use Case

| I want to... | Use Profile | Why |
| --- | --- | --- |
| Create something timeless & cosmic | **sagan** | Golden Record aesthetic; profound minimal beauty |
| Celebrate elegant line drawing | **picasso** | Sophisticated restraint; every mark intentional |
| Showcase visual abundance | **contento** | All shapes, colors, effects; maximize richness |
| Build a reusable semantic library | **dictionary** | Compose from primitives; consistency + meaning |
| Visualize psychological depth (Freudian) | **freud** | Concentric conflict; unconscious vs superego |
| Visualize spiritual wholeness (Jungian) | **jung** | Mandala integration; collective archetypes |
| Map philosophical genealogies | **nietzsche** | Concept hierarchies; Apollonian/Dionysian tension |

### Design Philosophy: Seven Schools of Thought

The 7 profiles aren't arbitrary—they're **schools of visualization**, each asking: *"How should a concept **look** if you believe in [this philosophical framework]?"*

- **sagan:** "Concepts are cosmic data." (Scientific, archival, timeless)
- **picasso:** "Concepts are elegant lines." (Minimalist, sophisticated)
- **contento:** "Concepts are abundant experiences." (Maximalist, joyful)
- **dictionary:** "Concepts are semantic primitives." (Compositional, reusable)
- **freud:** "Concepts reveal unconscious conflict." (Psychological, introspective)
- **jung:** "Concepts reflect archetypal wholeness." (Spiritual, integrative)
- **nietzsche:** "Concepts genealogize values." (Philosophical, dialectical)

---

### Why Freud & Jung Are Essential

**Freud** and **Jung** are not just psychology—they're **visualization languages** for the invisible:

- **Freud's concentric layers** solve the problem: *"How do I show repression, conflict, hidden drives visually?"*
  - Answer: Nested rings, with warmth (desire) inside and coolness (judgment) outside
  - Use case: Concepts about struggle, ambivalence, unconscious motivation, psychology of personality
  
- **Jung's mandalas** solve the problem: *"How do I show integration, wholeness, archetypal unity visually?"*
  - Answer: Radial symmetry with luminous center, opposites balanced in sacred geometry
  - Use case: Concepts about transformation, collective meaning, spiritual wholeness, myth

Without them, you can't visualize *psychological and spiritual depth*. The dictionary profile handles *semantics*; freud/jung handle *interiority*.

---

### Why Nietzsche Stands Alone

**Nietzsche** is the *only* profile that's *genealogical*—it shows how concepts **become** and **transform** over time:

- **Apollonian ↔ Dionysian:** Order vs chaos, form vs formlessness
- **Master ↔ Slave morality:** Power-affirming vs reactive values
- **Eternal recurrence + Übermensch:** Cycles and transformation

Why it matters: Concepts aren't static. They evolve through struggle and opposition. Nietzsche visualizes *genealogy*—the hidden history of how values and ideas came to be.

---

### Philosophical Coverage

```text
                        RATIONALIST
                        Sagan (data)
                           ↑
        MINIMALIST ←────────────────→ MAXIMALIST
        Picasso            Contento
        (restraint)        (abundance)
                           ↓
              SEMANTIC COMPOSER
              Dictionary (reusable)
              
                    DEPTH LAYER
        ┌───────────────────────────────┐
        │  Freud (Conflict)             │
        │  Jung (Integration)           │
        │  Nietzsche (Genealogy)        │
        └───────────────────────────────┘
```

The **depth layer** (freud/jung/nietzsche) gives caratulai its philosophical power—beyond pretty pictures, these profiles visualize *meaning*, *psychology*, and *becoming*.

---

### Implementation Notes

- All 7 profiles enforce the same hard [[02-Principles|aesthetic constraints]] (no text, valid SVG, etc.)
- But each has distinct **color palettes**, **element limits**, and **prompt tone**
- The prompt builder [[04-Stack|shapes the prompt]] to each profile's philosophy
- Testing with real models (M1) will reveal which profiles LLMs find easiest/hardest

See: [[design/04-Profile Comparison Examples]] for concrete visual differences.

## Configuration

**Via `caratulai.config.yaml`:**

```yaml
generation:
  profile: sagan  # or picasso, contento, dictionary, freud, jung, nietzsche
```

**Via CLI:**

```sh
node packages/cli/dist/index.js generate star water --profile sagan --out out/idea.svg
node packages/cli/dist/index.js generate shadow --profile jung --out out/shadow.svg
node packages/cli/dist/index.js generate power --profile nietzsche --out out/power.svg
```

## See Also

- [[02-Principles]] — the 7 hard aesthetic constraints all profiles enforce
- [[04-Stack]] — the generation pipeline and how profiles shape prompts
- [[design/03-Freud-Jung-Nietzsche Profiles]] — full technical specs
- [[design/04-Profile Comparison Examples]] — concrete visual examples & philosophical analysis
