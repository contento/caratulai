# Freud, Jung, Nietzsche Profiles — Design & Implementation

Consolidated specifications for the final 3 generation profiles. Translates psychological/philosophical concepts into concrete SVG constraints, visual metaphors, and prompt tone.

---

## Freud Profile — Layers of the Psyche

**Aesthetic:** Concentric psychological layers (id, ego, superego) in grayscale + sepia. Dream-like, introspective, symbolic.

| Aspect | Specification |
|--------|---|
| **Palette** | Grayscale (black–white) + sepia (warm brown/rust) |
| **Max elements** | 50–70 |
| **Allowed shapes** | circles, paths, polygons, groups (nested for layers) |
| **Forbidden** | text, patterns, filters, bright colors |
| **Color map** | Innermost (sepia/warm) → id; middle (gray) → ego; outer (gray/cool) → superego |

### Visual Metaphors

- **Concentric circles/rings** → layers of consciousness
- **Spirals, vortices** → libido, psychic energy
- **Organic, flowing forms** → id impulses
- **Rigid, geometric boundaries** → superego restrictions
- **Fading/blurring edges** → repression, unconscious
- **Nested shapes** → defense mechanisms stacked

### Example Concepts & Visual Translations

| Freudian Concept | Visual Pattern |
|---|---|
| **Unconscious** | Dark center, hidden in layers |
| **Repression** | Shape fading into black/void |
| **Projection** | Reflected/mirrored form |
| **Sublimation** | Ascending transformation (fire → spiral) |
| **Neurosis** | Tangled, repeating patterns |
| **Catharsis** | Eruption, breaking through boundary |

### Prompt Tone

> *"Create a concentric, dream-like psychological diagram. The innermost core represents primal drives (sepia, organic, warm). The middle layer is the ego mediating reality (gray, balanced). The outer boundary is the superego—rigid rules and judgment (cool gray, geometric). Use nested circles, spirals, and layered shapes to show how consciousness is structured in concentric layers. No text. Colors shift from warm sepia inside to cool gray outside. The overall effect should feel introspective, mysterious, vulnerable."*

### SVG Constraints

```
- Only circles, ellipses, paths, polygons, groups
- Concentric arrangement (no scattered composition)
- Color palette: #1a1a1a (black), #4a4a4a (dark gray), #888888 (medium gray), 
  #c4a080 (warm sepia), #8b6f47 (rusty brown)
- No text elements, no patterns, no filters
- 50-70 elements total
```

---

## Jung Profile — Archetypal Symbols

**Aesthetic:** Archetypal symbols & collective unconscious imagery. Mandalas, sacred geometry, symbolic animals. 256-color palette for symbolic richness.

| Aspect | Specification |
|--------|---|
| **Palette** | 256-color (semantic palette); emphasize: gold, blue, purple, green |
| **Max elements** | 50 |
| **Allowed shapes** | circles, ellipses, paths, polygons, groups (radial symmetry) |
| **Forbidden** | text, patterns, excessive filters |
| **Symmetry** | Radial / mandala-centered preferred |

### Visual Metaphors

- **Mandalas** → the Self, wholeness, integration
- **Concentric circles** → layers of the psyche (persona → shadow → self)
- **Symbolic animals** → archetypes (lion = hero, serpent = shadow, owl = wise, dove = anima)
- **Gold/luminous center** → the Self, divine center
- **Opposing quadrants** → masculine/feminine, conscious/unconscious
- **Sacred geometry** (pentagrams, hexagons, spirals) → divine order

### Example Archetypes & Visual Translations

| Jungian Archetype | Visual Pattern | Color Association |
|---|---|---|
| **Self** | Central mandala, radiant | Gold, white, luminous |
| **Shadow** | Dark creature/serpent, offset | Deep purple, black, murky |
| **Wise Old Man** | Centered, observant animal (owl) | Gray, blue, silver |
| **Hero** | Ascending form, bold animal (lion) | Red, gold, bright |
| **Anima** (feminine) | Flowing, graceful (dove, butterfly) | Pink, purple, soft |
| **Trickster** | Serpent/fox, chaotic but purposeful | Iridescent, copper, changing |

### Prompt Tone

> *"Create a mandala-like archetypal vision. Design a radially symmetric composition with a luminous center (the Self, represented in gold or white). Surround it with concentric rings representing layers of the collective unconscious. Include symbolic animals or sacred geometry that evoke Jungian archetypes: a lion for the Hero, a serpent for the Shadow, an owl for the Wise Old Man, a dove for the Anima. Use a rich 256-color palette with emphasis on gold, deep blue, purple, and green. The overall effect should feel sacred, integrated, mythic. No text. Maximum 50 elements."*

### SVG Constraints

```
- Radial symmetry preferred (centered mandala)
- Circles, ellipses, paths, polygons, groups
- Use symbolic colors: #ffd700 (gold), #1a3a52 (deep blue), #663399 (purple), 
  #228b22 (green), #ffffff (white for divine)
- Animals/creatures suggested via simple paths, not text
- 50 elements max
- No text
```

---

## Nietzsche Profile — Genealogy of Concepts

**Aesthetic:** Philosophical hierarchies, opposing forces, cycles, transformations. Apollonian/Dionysian tension, master/slave morality, eternal recurrence, will-to-power. 256-color palette.

| Aspect | Specification |
|--------|---|
| **Palette** | 256-color; emphasize opposing pairs (gold ↔ black, red ↔ blue) |
| **Max elements** | Variable (40–100, concept-driven) |
| **Allowed shapes** | circles, paths, polygons, groups, arrows |
| **Forbidden** | text, naturalistic patterns |
| **Structure** | Hierarchical (parent-child), bidirectional (oppositions), cyclical |

### Visual Metaphors

- **Hierarchy (tree inverted or ascending)** → genealogy of concepts
- **Opposing colors/positions** → Apollonian (order, light) vs Dionysian (chaos, dark)
- **Cycles, spirals, wheels** → eternal recurrence
- **Ascending path/spiral** → becoming, Übermensch, self-overcoming
- **Arrows, flows** → will-to-power, active/reactive forces
- **Duality, mirrors** → master morality ↔ slave morality

### Example Concepts & Visual Translations

| Nietzschean Concept | Visual Pattern | Colors |
|---|---|---|
| **Apollonian order** | Geometric, bounded, clear lines | Gold, white, light blue |
| **Dionysian chaos** | Organic, flowing, dissolving forms | Black, deep red, wine |
| **Master morality** | Ascending, powerful, upward arrows | Red, gold, bright |
| **Slave morality** | Reactive, downward, entangled | Gray, muddy brown |
| **Eternal recurrence** | Spirals, wheels, cyclical paths | Iridescent, shifting |
| **Will-to-power** | Dynamic arrows, ascending lines | Red, orange, electric |
| **Übermensch** | Synthesis: Apollonian form + Dionysian fire | Gold+red, integrated |

### Prompt Tone

> *"Create a hierarchical, philosophical diagram of becoming. Show opposing forces in creative tension: order (Apollonian, gold/white, structured) vs chaos (Dionysian, black/red, organic). Use arrows and flowing lines to represent will-to-power and active transformation. Include cyclical elements suggesting eternal recurrence. The composition should ascend or spiral inward, representing the becoming of the Übermensch—the synthesis of reason and passion, structure and creativity. Use a 256-color palette with emphasis on contrasting pairs. No text. Concept hierarchies may drive variable element count (40–100)."*

### SVG Constraints

```
- Hierarchical or cyclical arrangement
- Circles, paths, polygons, arrows, groups
- Opposing color pairs: #ffd700 (gold) ↔ #000000 (black), #ff0000 (red) ↔ #0000ff (blue)
- Use arrows/paths to show transformation and flow
- Spirals/cycles for eternal recurrence
- Variable max elements (40–100) based on concept complexity
- No text
```

---

## Implementation Checklist

### 1. Profile Configuration (`@caratulai/core`)

Add to `profiles.ts`:
- [ ] `freud`: palette colors, max elements, prompt tone
- [ ] `jung`: palette colors (semantic), radial symmetry hint, max elements, prompt tone
- [ ] `nietzsche`: palette colors (opposing pairs), variable max elements, prompt tone, hierarchy hint

### 2. Prompt Builder Tuning

- [ ] **Freud:** Emphasize concentric layers, sepia warmth in center, cool gray outside, introspective tone
- [ ] **Jung:** Emphasize radial symmetry, mandala, sacred geometry, archetypal animals, rich colors
- [ ] **Nietzsche:** Emphasize hierarchies/flows, opposing forces (Apollonian/Dionysian), cycles, transformation

### 3. Testing with Local Models

- [ ] Test freud with Ollama qwen2.5-coder / mistral (layer abstraction works for LLMs)
- [ ] Test jung with Ollama (mandalas + symbolic animals are well-understood)
- [ ] Test nietzsche with Ollama (hierarchies + arrows should be clear)
- [ ] Tune prompts based on quality/density vs model baseline

### 4. Validator Updates (if needed)

- [ ] Enforce palette constraints per profile
- [ ] Enforce max element limits
- [ ] Warn on text (all profiles forbid it)
- [ ] Enforce "no patterns/filters" for freud/jung if applicable

### 5. ADR for Profile Design Decisions

- [ ] Record why each profile chosen (psychological richness, visual distinctness, implementation feasibility)
- [ ] Record trade-offs (why variable max elements for nietzsche vs fixed for others)

---

## See Also

- [[03-Profiles]] — summary table and per-profile overview
- [[11-LLM Providers]] — how to test with Ollama/LM Studio
- [[12-Testing Local Models]] — testing checklist
