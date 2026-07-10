# Image Generation Profiles

**13 generation profiles**—each a distinct philosophical, epistemological, aesthetic, or literary framework for visualizing concepts. Spanning aesthetics (minimal to maximal), psychology, philosophy, communication styles, engineering, grounded realism, musical mastery, and literary magic realism. **All profiles enforce ZERO text elements.** Each profile includes **composition guidance** that shapes *how* elements are spatially arranged.

| Profile | Aesthetic | Palette | Max Elements | Shapes | Composition | Use Case |
| --- | --- | --- | --- | --- | --- | --- |
| **sagan** | Voyager Golden Record | Gold + Silver | 48 | Fundamental only | Radial/technical diagram | Cosmic, profound, archival |
| **picasso** | Single-line drawings | B/W | 20 | Fundamental only | Continuous flowing line | Sophisticated, minimal, elegant |
| **contento** | Rich, dense, layered | 256-color | 80 | All shapes + effects | Layered density, 60-80% fill | Visual abundance, complexity |
| **dictionary** | Vocabulary & icons | 256-color | 60 | All shapes + effects | Grid/cluster lexicon | Semantic visual library |
| **freud** | Layers of the psyche | Grayscale + sepia | 50–70 | Shapes + groups | Concentric layers | Unconscious drives, dream logic |
| **jung** | Archetypal symbols | 256-color | 50 | Shapes + groups | Radial mandala | Psychological/symbolic depth |
| **nietzsche** | Genealogy of concepts | 256-color | 40–100 | Shapes + arrows | Hierarchical flows | Philosophical/conceptual mapping |
| **booch** | Engineering systems | Blue + white | 70 | Fundamental only | Boxes & lines | Systems thinking, architecture |
| **carlin** | Linguistic subversion | Black/red/electric | 80 | All shapes + effects | Juxtaposition & paradox | Hypocrisy, contradiction, truth |
| **trungpa** | Sacred paradox | Gold/black/red | 70 | All shapes + effects | Tension held simultaneously | Crazy wisdom, disruption |
| **rosina** | Grounded realism | Gray + earth tones | 60 | Fundamental only | Direct motion & flow | Stark reality, unglamorous truth |
| **domingo** | Musical range | Warm/cool palette | 80 | All shapes + effects | Flowing vocal lines | Versatile mastery, integration |
| **gabriel** | Magic realism | Warm + mythic | 120 | All shapes + effects | Layered memory & spirals | Mythic yet real, extraordinary mundane |

## Per-Profile Details

### sagan (implemented)

**Aesthetic:** Voyager Golden Record. Gold background (#d4af37), silver text/lines (#c0c0c0).

Voyager record plate aesthetic: technical, minimal, profound. The canonical reference for cosmic communication — a message to an alien civilization.

**Palette:** Gold + Silver (2 colors). Hard constraint.

**Max elements:** 48

**Prompt tone:** Archival, scientific, timeless. Imagine a diagram on a phonograph record that's traveled 50 years through space.

**Composition:** Radial/technical diagram — central focal point with radiating elements, radial symmetry, primary shape 30-50% of canvas center.

### picasso (implemented)

**Aesthetic:** Elegant, sophisticated lines. Minimal shapes. Single-line drawing style.

**Palette:** B/W (black on white).

**Max elements:** 20. Sparse; elegance through restraint.

**Prompt tone:** Minimalist, sophisticated, single-stroke. Think Picasso's line drawings — economical and perfect.

**Composition:** Continuous flowing line — single path suggests entire form, economy of marks, balanced negative space, golden ratio proportions.

### contento (implemented)

**Aesthetic:** Less restrained. Rich complexity, 80+ elements, all shapes allowed. Dense, layered, visually abundant.

**Palette:** 256-color (full semantic palette).

**Max elements:** 80.

**Prompt tone:** Visual abundance. All SVG shapes permitted: paths, polygons, circles, groups, gradients, patterns, effects.

**Composition:** Layered density — overlapping elements create depth, fill 60-80% of canvas, foreground/midground/background layers, clear focal point amid complexity.

**Use case:** When you want to showcase the full range of visual possibility.

### dictionary (implemented)

**Aesthetic:** Dictionary-based generation. Uses visual vocabulary and pattern library.

**Palette:** 256-color.

**Max elements:** 60.

**Prompt tone:** Vocabulary-centric. Compose scenes from reusable semantic primitives. See [[design/02-Dictionary Profile]] for the full vision.

**Composition:** Visual lexicon — arrange semantic primitives in grid or cluster formation, consistent spacing, visual rhythm through repetition and variation.

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

### nietzsche (implemented)

**Aesthetic:** Hierarchical & cyclical. Philosophical genealogy via opposing forces (Apollonian/Dionysian, master/slave morality), eternal recurrence, will-to-power.

**Palette:** 256-color with emphasis on opposing pairs (gold ↔ black, red ↔ blue).

**Max elements:** 40–100 (concept-driven; more complex concepts = more elements).

**Prompt tone:** Philosophical, dialectical. "Create a hierarchical diagram with opposing forces in tension: order (Apollonian, gold/white/structured) vs chaos (Dionysian, black/red/organic). Show arrows and flows for transformation. Include spirals for eternal recurrence. Ascend toward synthesis (Übermensch)."

**Key visual metaphors:** Hierarchies/trees (genealogy), opposing colors/positions (Apollonian vs Dionysian), cycles/spirals (eternal recurrence), arrows/flows (will-to-power), ascending paths (Übermensch).

→ **Full spec:** [[design/03-Freud-Jung-Nietzsche Profiles]]

### booch (implemented)

**Aesthetic:** Systems thinking & engineering clarity. Clean boxes, connection lines, orthogonal alignment inspired by Grady Booch's UML notation.

**Palette:** Blue + white (technical, professional).

**Max elements:** 70.

**Prompt tone:** Engineering precision. "Create a system diagram: one primary subsystem centered, supported by smaller secondary components. Use boxes, lines, arrows for data/control flow. Orthogonal alignment. Favor clarity, grouping, and whitespace over density."

**Key visual metaphors:** Boxes/rectangles (subsystems), connecting lines (flows), hierarchy (parent-child), directional arrows (causality).

**Use case:** Architecture, systems design, process flows, organizational structures.

### carlin (implemented)

**Aesthetic:** Linguistic subversion & sharp humor. Rapid juxtaposition, crude energetic style. Named after George Carlin's linguistic deconstruction.

**Palette:** Black (truth) + red (anger/attention) + electric blue (speed).

**Max elements:** 80.

**Prompt tone:** Linguistic subversion. "Expose contradictions and hidden meanings in this concept. Show what it really is beneath comfortable lies. Use rapid juxtaposition: multiple interpretations of the same form. Rough, crude, energetic—not polished. Make hypocrisy visible."

**Key visual metaphors:** Juxtaposition (contradiction), rough/crude marks (anti-polish), rapid movement (speed of insight), collisions (opposing readings).

**Use case:** Satire, critique, exposing contradiction, media literacy, truth-telling.

### trungpa (implemented)

**Aesthetic:** Sacred paradox & crazy wisdom. Named after Chögyam Trungpa Rinpoche's pedagogical disruption through paradox, humor, and sacred mischief.

**Palette:** Gold (sacred) + black (ordinary) + red (passion/attention).

**Max elements:** 70.

**Prompt tone:** Crazy wisdom. "Visualize through sacred paradox: use paradox, humor, and disruption to point toward truth. Show opposites held together simultaneously: sacred and profane, serious and playful. Use shock and humor as teaching methods. Break visual rules to teach."

**Key visual metaphors:** Paradox held simultaneously (no resolution), sacred/profane collisions, serious structures interrupted by play, tension as teaching.

**Use case:** Spiritual teaching, paradoxical truths, meditation objects, koans, disruption as insight.

### rosina (implemented)

**Aesthetic:** Grounded realism & stark honesty. Unglamorous, direct action. Inspired by Italian neorealist cinema (Rossellini).

**Palette:** Gray + earth tones (mud, rust, stone).

**Max elements:** 60.

**Prompt tone:** Stark realism. "Show only what's essential—no decoration. Use arrows and simple forms to show motion, flow, work being done. Think unglamorous, grounded, honest. Focus on the essential action and movement."

**Key visual metaphors:** Arrows (motion/work), simple geometry (essential forms), earth tones (grounded), directness (no embellishment).

**Use case:** Labor, work, direct action, reality-based thinking, practical necessity.

### domingo (implemented)

**Aesthetic:** Musical range & versatile mastery. Flowing, integrated composition inspired by Plácido Domingo's vocal versatility and warmth.

**Palette:** Warm/cool palette (gold + deep blue + amber for integration).

**Max elements:** 80.

**Prompt tone:** Musical integration. "Compose as a musical phrase with a strong central motif anchored, while sweeping curves rise and fall like linked vocal lines. Let upper and lower regions answer each other, showing range without fragmentation. Preserve rhythmic continuity."

**Key visual metaphors:** Central motif (main theme), flowing curves (melody), layered lines (harmony), rhythmic variation (phrasing), integration (coherence).

**Use case:** Mastery, integration, versatility, harmonic complexity, range within unity.

### gabriel (implemented)

**Aesthetic:** Magic realism & elaborate mythology. Blend magical seamlessly with mundane. Inspired by García Márquez's narrative style.

**Palette:** Warm + mythic (gold, crimson, forest green, soft yellows).

**Max elements:** 120.

**Prompt tone:** Magic realism. "Blend magical seamlessly with mundane—treat the extraordinary as matter-of-fact. Ground mythology in specific place. Show spiraling time: past and present coexisting. Elaborate, warm, mythic yet grounded in reality. Create layered memory."

**Key visual metaphors:** Spirals (time recursion), layering (generations), mythic creatures (extraordinary), realistic details (grounded), integration (magical/mundane unified).

**Use case:** Memory, genealogy, legendary narratives, mythic presence in everyday life, storytelling.

## Rationale: Why 13 Profiles?

The original 7 profiles covered philosophical depth (freud, jung, nietzsche), minimalist elegance (picasso), visual abundance (contento), archival timelessness (sagan), and semantic composition (dictionary).

**The 6 new profiles complete the landscape** by adding:

- **Epistemological modes:** booch (engineering clarity), carlin (linguistic subversion), trungpa (sacred paradox)
- **Visual/lived frameworks:** rosina (grounded realism), domingo (musical integration), gabriel (magic realism)

Together, **13 profiles span:**
- **Aesthetics:** minimal (picasso) → abundant (gabriel)
- **Philosophy:** scientific (sagan) → spiritual (trungpa) → magical (gabriel)
- **Epistemology:** engineering (booch) → psychology (freud/jung) → genealogy (nietzsche) → disruption (carlin) → realism (rosina)
- **Expression modes:** visual (dictionary), musical (domingo), narrative (gabriel)

Each profile is a **complete visualization philosophy**—a different answer to: *"How should this concept look if you believe [this]?"*

### The 13-Profile Landscape

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

### Design Philosophy: 13 Schools of Thought

The 13 profiles aren't arbitrary—they're **schools of visualization**, each asking: *"How should a concept **look** if you believe in [this philosophical framework]?"*

**Original 7 (philosophical depth):**
- **sagan:** "Concepts are cosmic data." (Scientific, archival, timeless)
- **picasso:** "Concepts are elegant lines." (Minimalist, sophisticated)
- **contento:** "Concepts are abundant experiences." (Maximalist, joyful)
- **dictionary:** "Concepts are semantic primitives." (Compositional, reusable)
- **freud:** "Concepts reveal unconscious conflict." (Psychological, introspective)
- **jung:** "Concepts reflect archetypal wholeness." (Spiritual, integrative)
- **nietzsche:** "Concepts genealogize values." (Philosophical, dialectical)

**Epistemological & expressive (6 new):**
- **booch:** "Concepts are systems." (Engineering, clarity, structure)
- **carlin:** "Concepts reveal contradictions." (Linguistic subversion, critique)
- **trungpa:** "Concepts teach through paradox." (Sacred wisdom, disruption)
- **rosina:** "Concepts are direct action." (Grounded realism, unglamorous)
- **domingo:** "Concepts are musical phrases." (Integration, versatile mastery)
- **gabriel:** "Concepts are living mythology." (Magic realism, layered time)

---

### Coverage Map: 13 Dimensions

| Dimension | Minimal | | | | Maximal |
| --- | --- | --- | --- | --- | --- |
| **Elements** | Picasso (20) | Sagan (48) | Freud/Booch (50-70) | Carlin/Trungpa/Rosina (60-80) | Domingo/Gabriel (80-120) |
| **Aesthetic** | Line | Archive | Psychological | Disruptive | Mythic |
| **Philosophy** | Elegance | Data | Depth | Critique | Magic |
| **Epistemology** | Minimalist | Scientific | Psychological | Linguistic | Narrative |

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

### The Six New Profiles: Why They Matter

**booch, carlin, trungpa, rosina, domingo, gabriel** complete the landscape by adding:

1. **Engineering clarity (booch):** Systems thinking, architecture, organizational design
2. **Linguistic subversion (carlin):** Critique, hypocrisy exposure, contradiction revelation
3. **Sacred paradox (trungpa):** Teaching through disruption, paradox as pedagogy, crazy wisdom
4. **Grounded realism (rosina):** Unglamorous truth, direct action, labor, essential motion
5. **Musical integration (domingo):** Versatility, mastery, harmonic complexity within unity
6. **Magic realism (gabriel):** Mythic presence in everyday life, layered time, genealogy, memory

---

### Why Nietzsche Stands Alone (Among the Originals)

**Nietzsche** is the *only* original profile that's *genealogical*—it shows how concepts **become** and **transform** over time:

- **Apollonian ↔ Dionysian:** Order vs chaos, form vs formlessness
- **Master ↔ Slave morality:** Power-affirming vs reactive values
- **Eternal recurrence + Übermensch:** Cycles and transformation

Why it matters: Concepts aren't static. They evolve through struggle and opposition. Nietzsche visualizes *genealogy*—the hidden history of how values and ideas came to be.

### Philosophical Coverage

```text
DEPTH & PHILOSOPHICAL COMPLEXITY
                 
        PSYCHOLOGICAL LAYER
        ┌───────────────────────────────┐
        │  Freud (Conflict)             │
        │  Jung (Integration)           │
        │  Nietzsche (Genealogy)        │
        │  Trungpa (Sacred Paradox)     │
        └───────────────────────────────┘
              ↑           ↑
    EPISTEMOLOGICAL LAYER
        ┌───────────────────────────────┐
        │  Booch (Systems)              │
        │  Carlin (Subversion)          │
        │  Rosina (Realism)             │
        └───────────────────────────────┘
              ↑           ↑
    AESTHETIC & EXPRESSIVE LAYER
        ┌───────────────────────────────┐
        │  Picasso (Elegant Line)       │
        │  Sagan (Archival Data)        │
        │  Dictionary (Semantic)        │
        │  Domingo (Musical)            │
        │  Gabriel (Mythic)             │
        │  Contento (Abundant)          │
        └───────────────────────────────┘
```

The **depth layer** (freud/jung/nietzsche) gives caratulai its philosophical power—beyond pretty pictures, these profiles visualize *meaning*, *psychology*, and *becoming*.

---

### Implementation Notes

- All 13 profiles enforce the same hard [[02-Principles|aesthetic constraints]] (no text, valid SVG, etc.)
- Each has distinct **color palettes**, **element limits**, **prompt tone**, and **composition guidance**
- The prompt builder [[04-Stack|shapes the prompt]] to each profile's philosophy, injecting composition after tone and before strict rules
- The 4 implemented profiles (sagan, picasso, contento, dictionary) have composition guidance wired in
- The 9 remaining profiles will get composition when implemented
- Visual samples can be generated with `pnpm samples:live` (requires LLM provider)

See: [[design/04-Profile Comparison Examples]] for concrete visual differences.

## Configuration

**Via `caratulai.config.yaml`:**

```yaml
generation:
  profile: sagan  # or any of the 13: picasso, contento, dictionary, freud, jung, nietzsche, booch, carlin, trungpa, rosina, domingo, gabriel
```

**Via CLI:**

```sh
# Using the wrapper script (builds CLI on demand)
./caratulai.sh generate star water --profile sagan --out out/idea.svg
./caratulai.sh generate shadow --profile jung --out out/shadow.svg
./caratulai.sh generate power --profile nietzsche --out out/power.svg
./caratulai.sh generate system --profile booch --out out/system.svg
./caratulai.sh generate --from-text "A dark ocean" --profile gabriel --out out/journey.svg
```

## See Also

- [[02-Principles]] — the 7 hard aesthetic constraints all profiles enforce
- [[04-Stack]] — the generation pipeline and how profiles shape prompts
- [[design/03-Freud-Jung-Nietzsche Profiles]] — detailed specs for freud/jung/nietzsche
- [[design/04-Profile Comparison Examples]] — concrete visual examples & philosophical analysis
- [[profiles/00-gallery.md]] — visual samples from all 13 profiles
- [[00-Profiles Index]] — quick reference table & choosing guide
