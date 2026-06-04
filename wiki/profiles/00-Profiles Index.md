# Generation Profiles — Complete Index

Complete documentation for caratulai's 7 aesthetic profiles. Each profile is a **philosophical framework** for visualizing concepts—a school of thought about what shapes should mean and how ideas should look.

---

## Quick Reference

| # | Profile | Aesthetic | Philosophy | Historical Reference | Color Palette | Max Elements |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [[01-Sagan Profile\|Sagan]] | Archival cosmic data | Scientific, timeless | Voyager Golden Record (1977) | Gold + Silver | 48 |
| 2 | [[02-Picasso Profile\|Picasso]] | Elegant restraint | Minimalist sophistication | Picasso's line drawings | Black + White | 20 |
| 3 | [[03-Contento Profile\|Contento]] | Visual abundance | Maximalist joy | Postmodernism, Baroque | 256-color | 80+ |
| 4 | [[04-Dictionary Profile\|Dictionary]] | Semantic composition | Visual vocabulary | Icon systems, comics | 256-color | 60 |
| 5 | [[05-Freud Profile\|Freud]] | Psychological layers | Conflict model | Psychoanalysis | Grayscale + Sepia | 50–70 |
| 6 | [[06-Jung Profile\|Jung]] | Archetypal symbols | Integration model | Jungian psychology | 256-color | 50 |
| 7 | [[07-Nietzsche Profile\|Nietzsche]] | Genealogy of becoming | Philosophical dialectics | Nietzschean philosophy | 256-color | 40–100 |

---

## The Spectrum

### Restraint ↔ Abundance

```text
Picasso          Sagan        Freud/Jung    Dictionary     Contento
(20 el)        (48 el)      (50-70 el)     (60 el)       (80+ el)

"One perfect   "Cosmic       "Internal     "Reusable      "Show it
line"          archive"      psychology"   vocabulary"    all in color"
```

### Visual Language

- **Restraint:** Every mark intentional, nothing wasted
- **Abundance:** Color sings, patterns dance, richness everywhere
- **Vocabulary:** Building blocks, semantic primitives, composable
- **Psychology:** Layers, conflict, integration, archetypes
- **Philosophy:** Genealogy, becoming, opposites in tension

---

## Thematic Groups

### A. Pure Aesthetics (Form & Elegance)

**[[01-Sagan Profile]]** — Cosmic data, archival, timeless
- When: concepts about space, time, profound truths
- Feel: Golden Record engraved on gold plate

**[[02-Picasso Profile]]** — Elegant lines, minimalist
- When: human figures, emotions, refined ideas
- Feel: Sketch in a master artist's notebook

**[[03-Contento Profile]]** — Visual abundance, joyful
- When: celebration, nature, richness, complexity
- Feel: Festival, party, visual feast

### B. Compositional (Building Meaning)

**[[04-Dictionary Profile]]** — Semantic primitives, vocabulary
- When: educational, instructional, consistent scenes
- Feel: Visual encyclopedia entry

### C. Psychological & Philosophical (Inner Worlds)

**[[05-Freud Profile]]** — Conflict, repression, layers
- When: struggle, ambivalence, unconscious drives
- Feel: Dream, introspection, hidden conflict

**[[06-Jung Profile]]** — Archetypes, integration, wholeness
- When: transformation, collective meaning, spiritual
- Feel: Mandala, sacred, mythic

**[[07-Nietzsche Profile]]** — Genealogy, becoming, dialectics
- When: philosophy, value-creation, power, opposition
- Feel: Philosophical genealogy, historical depth

---

## Reading Guide: Which Profile Should I Use?

### By Concept Type

- **Cosmic/timeless/profound?** → [[01-Sagan Profile|Sagan]]
- **Human/emotional/refined?** → [[02-Picasso Profile|Picasso]]
- **Joyful/abundant/complex?** → [[03-Contento Profile|Contento]]
- **Educational/instructional?** → [[04-Dictionary Profile|Dictionary]]
- **Internal struggle/conflict?** → [[05-Freud Profile|Freud]]
- **Spiritual/archetypal/whole?** → [[06-Jung Profile|Jung]]
- **Philosophical/historical/becoming?** → [[07-Nietzsche Profile|Nietzsche]]

### By Emotional Tone

- **Timeless/profound** → Sagan
- **Elegant/sophisticated** → Picasso
- **Joyful/celebratory** → Contento
- **Consistent/educational** → Dictionary
- **Introspective/mysterious** → Freud
- **Sacred/integrated** → Jung
- **Dialectical/transformative** → Nietzsche

### By Visual Complexity

| Complexity | Profile | Elements |
| --- | --- | --- |
| Minimal | Picasso | 20 |
| Restrained | Sagan | 48 |
| Moderate | Freud, Jung | 50–70 |
| Compositional | Dictionary | 60 |
| Abundant | Contento | 80+ |
| Variable | Nietzsche | 40–100 |

---

## Understanding the Profiles

### What "Aesthetic Profile" Means

Each profile is **not just a style**—it's a **philosophical framework** baked into how the concept gets visualized.

When you choose **sagan**, you're saying: "Show me this as cosmic data—timeless, archival, meant to outlast."

When you choose **jung**, you're saying: "Show me this as an archetype—universally meaningful, integrated, whole."

The **LLM prompt changes fundamentally** based on the profile, because the *philosophy* changes.

### Implementation Status

- ✅ **All 7 profiles: Designed & Documented**
- ✅ **4 profiles: Implemented** (sagan, picasso, contento, dictionary)
- 🔨 **3 profiles: Ready for prompt engineering** (freud, jung, nietzsche)

### Next Steps (M1)

1. **Test existing 4 profiles** with Ollama/LM Studio
   - Verify quality, density, element counts
   - Tune prompts based on model behavior

2. **Wire up new 3 profiles** in prompt builder
   - Add freud, jung, nietzsche to profile enum
   - Test with local models
   - Verify layer metaphor (freud) and mandala structure (jung) work

3. **Anthropic provider** (Claude with prompt caching)
   - Claude best at SVG generation
   - Test all 7 profiles with Claude

4. **Model ladder** (Ollama → LM Studio → OpenRouter)
   - Auto-fallback on model failure
   - Cost optimization

---

## See Also

- [[../../03-Profiles]] — Profile overview table
- [[../../design/03-Freud-Jung-Nietzsche Profiles]] — Technical specifications
- [[../../design/04-Profile Comparison Examples]] — Visual examples & philosophical analysis
- [[../../04-Stack]] — How profiles shape the generation pipeline
- [[../../17-Roadmap]] — M1 profile testing roadmap

---

## Navigation

- **For technical specs:** See `wiki/design/03-Freud-Jung-Nietzsche Profiles.md`
- **For visual examples:** See `wiki/design/04-Profile Comparison Examples.md`
- **For implementation:** See `wiki/04-Stack.md` (prompt builder integration)
- **For testing plan:** See `wiki/12-Testing Local Models.md`

---

Last updated: 2026-06-04  
Status: All profiles documented and ready for M1 testing
