# M1 Testing Plan — Real Generation with LLMs

**Milestone:** M1 — Real generation. Replace Echo placeholder with real LLMs producing valid, on-aesthetic SVG.

**Status:** Ready to execute. All 13 profiles documented. Code scaffold in place.

---

## Phase 1: Add All Profiles to Code (This Week)

### 1.1 Create Palettes for New Profiles

Add to `packages/core/src/palettes.ts`:

- **PALETTE_GRAYSCALE_SEPIA** — Freud (grayscale + sepia blended)
- **PALETTE_BOOCH** — Black, blue, gray (engineering)
- **PALETTE_CARLIN** — Black, red, electric blue (subversion)
- **PALETTE_TRUMPA** — Gold, black, red (crazy wisdom)
- **PALETTE_ROSINA** — Gray, brown, black (grounded realism)
- **PALETTE_DOMINGO** — Gold, blue, amber (musical warmth)
- **PALETTE_GABRIEL** — Earth, green, gold, indigo (magic realism)

Jung, Nietzsche use `PALETTE_256` (already exists).

### 1.2 Add All 13 Profiles to Code

Update `packages/core/src/profiles.ts` with all 13 ProfileDef entries:

```typescript
export const PROFILES: Record<ProfileId, ProfileDef> = {
  // Existing (4)
  sagan: { ... },
  picasso: { ... },
  contento: { ... },
  dictionary: { ... },
  
  // New (9)
  freud: { maxElements: 70, paletteId: "grayscale-sepia", promptTone: "..." },
  jung: { maxElements: 50, paletteId: "palette-256", promptTone: "..." },
  nietzsche: { maxElements: 100, paletteId: "palette-256", promptTone: "..." },
  booch: { maxElements: 70, paletteId: "booch", promptTone: "..." },
  carlin: { maxElements: 80, paletteId: "carlin", promptTone: "..." },
  trumpa: { maxElements: 70, paletteId: "trumpa", promptTone: "..." },
  rosina: { maxElements: 50, paletteId: "rosina", promptTone: "..." },
  domingo: { maxElements: 80, paletteId: "domingo", promptTone: "..." },
  gabriel: { maxElements: 120, paletteId: "gabriel", promptTone: "..." },
};
```

Each `promptTone` comes directly from the wiki profile documentation (the "Prompt Tone" sections).

### 1.3 Update Type Definitions

Update `packages/core/src/types.ts`:

```typescript
export type ProfileId = 
  | "sagan" | "picasso" | "contento" | "dictionary"
  | "freud" | "jung" | "nietzsche"
  | "booch" | "carlin" | "trumpa"
  | "rosina" | "domingo" | "gabriel";
```

---

## Phase 2: Manual Testing with Ollama (Week 2)

### Setup

```bash
# Start Ollama with a model
ollama run qwen2.5-coder

# In another terminal, run caratulai CLI tests
cd packages/cli
npm run dev -- generate ocean --profile sagan --provider ollama
npm run dev -- generate psyche --profile jung --provider ollama
# ... etc
```

### Test Matrix

Test across all 13 profiles with a diverse concept set:

**Concepts to test:**
- Abstract: "journey", "becoming", "freedom"
- Concrete: "ocean", "mountain", "fire"
- Emotional: "joy", "sorrow", "love"
- Psychological: "shadow", "conflict", "integration"
- Technical: "system", "structure", "flow"

**For each concept × profile combo:**
1. Generate SVG
2. Validate (palette-snap, allowed primitives, element count, no text)
3. Visually inspect output
4. Rate: ✅ Works / ⚠️ Needs tuning / ❌ Broken
5. Document observations (what worked, what's hard for the model)

### Success Criteria

- **All 13 profiles generate valid SVG** (passes validator)
- **No obvious errors** (palette violations, text elements, broken SVG)
- **Profile-specific traits visible** (e.g., sagan = gold/silver, jung = mandala-like, rosina = minimal)
- **Concept is recognizable** in the output (not random)

---

## Phase 3: Prompt Tuning (Week 3)

### Observation → Refinement Loop

**If a profile struggles:**
1. Review the outputs (look at patterns)
2. Identify what's breaking (too many elements? wrong colors? missing mandala structure?)
3. Adjust the `promptTone` in code
4. Re-test with same concept
5. Compare outputs

**Common tuning targets:**
- **Too many elements?** → Tighten language ("maximum N elements, no more")
- **Wrong colors?** → Simplify palette section, name colors explicitly
- **No clear structure?** → Add more specific visual metaphors
- **Text appearing?** → Restate "ZERO TEXT" more emphatically
- **Model ignoring constraints?** → Move constraint up in prompt, use caps

### Focus on "Hardest" Profiles First

**Likely to need tuning (based on LLM difficulty):**
1. **Jung** — Mandala + radial symmetry (structural constraint)
2. **Nietzsche** — Opposing forces, spirals (conceptual subtlety)
3. **Gabriel** — Cyclical time, genealogical spirals (complex concept)
4. **Trumpa** — Paradox held simultaneously (contradictions)
5. **Booch** — Box-and-line clarity without text (minimalist + informative)

**Likely to work well (simpler constraints):**
1. **Sagan** — Well-understood aesthetic, straightforward prompt
2. **Picasso** — Single-line style, clear directive
3. **Contento** — "Use all shapes, all colors" is easy for LLMs
4. **Rosina** — Minimalist is understandable

---

## Phase 4: Anthropic Provider Integration (Week 4)

### Add Claude API Support

- Wire up `@anthropic-ai/sdk`
- Implement Claude provider (similar to OpenRouter, Ollama)
- Add `--provider anthropic` flag to CLI
- Add `ANTHROPIC_API_KEY` to `.env`

### Test All 13 Profiles with Claude

**Claude is expected to be strongest at SVG.** Compare outputs:

| Profile | Ollama | Claude | Notes |
| --- | --- | --- | --- |
| sagan | ? | ? | |
| jung | ? | ? | |
| ... | ... | ... | |

**Track:**
- Quality (visual coherence, recognizability)
- Constraint adherence (palette, elements, no text)
- Cost (tokens per request)

---

## Phase 5: Model Ladder Wiring (Week 4–5)

### Implement Auto-Fallback

When a generation fails (invalid SVG, constraint violation):
1. Retry with next model in ladder
2. Log attempts
3. Return first successful output, or error if all fail

**Ladder:**
```
Ollama (local, free)
  → LM Studio (local, free)
  → OpenRouter (remote, cheap)
  → Anthropic (remote, expensive)
```

**Behavior:**
- User runs: `caratulai generate ocean --profile jung`
- Try Ollama first (local, instant)
- If Ollama fails → try LM Studio (another local option)
- If both fail → try OpenRouter (remote, slower, cheaper than Claude)
- If still failing → try Claude (expensive, most reliable)

### Success Metrics

- ✅ **Most requests succeed on Ollama** (quick, local)
- ✅ **Ladder activates gracefully** (user sees it working, not errors)
- ✅ **Cost stays low** (majority on Ollama, fallback to remote only when needed)

---

## Phase 6: Output Analysis & Vocabulary Extraction (Week 5–6)

### Collect & Analyze Outputs

For each profile, generate 3–5 examples with different concepts. Store outputs in:

```
outputs/M1-testing/
├── sagan/
│   ├── journey.svg
│   ├── ocean.svg
│   └── ...
├── jung/
│   ├── shadow.svg
│   └── ...
└── ...
```

### Extract Patterns

**For each profile, observe:**
- What shapes dominate? (circles, lines, paths, polygons)
- What colors appear most? (palette adherence)
- What structures emerge? (concentric, hierarchical, scattered, spiraling)
- What works? (which concepts render well)
- What's hard? (which concepts confuse the model)

**Document as:** `M1-OUTPUT-ANALYSIS.md` — profiles that work, profiles that need tuning, primitives that naturally emerge.

---

## Testing Checklist

### Week 1: Code Changes
- [ ] Add 9 new palettes to `palettes.ts`
- [ ] Add 13 profiles to `profiles.ts` (including prompt tones)
- [ ] Update `types.ts` ProfileId union
- [ ] Unit test: all profiles load, palettes resolve
- [ ] CLI: `--help` shows all 13 profile options

### Week 2: Manual Testing
- [ ] Ollama running locally with a model
- [ ] Generate 5 concepts × 13 profiles = 65 outputs
- [ ] Validate all 65 against SVG spec + constraints
- [ ] Visual inspection: document what works, what's broken
- [ ] Rate each (✅/⚠️/❌)

### Week 3: Prompt Tuning
- [ ] Identify 3–5 profiles needing adjustment
- [ ] Refine prompts based on observations
- [ ] Re-test tuned profiles
- [ ] Document what changed and why

### Week 4: Anthropic Provider
- [ ] Claude API wired up
- [ ] Test all 13 profiles with Claude
- [ ] Compare Ollama vs Claude outputs (quality, cost)
- [ ] Document findings

### Week 4–5: Model Ladder
- [ ] Ladder logic implemented
- [ ] Test fallback: Ollama → LM Studio → OpenRouter → Anthropic
- [ ] Verify error handling (graceful fallback)
- [ ] Measure success rates per model

### Week 5–6: Analysis
- [ ] Collect all outputs (3–5 per profile)
- [ ] Extract pattern documentation
- [ ] Identify best profiles, hardest profiles
- [ ] Document primitives for Dictionary profile

### Success: All Tests Green
- [ ] All 13 profiles generate valid SVG
- [ ] No profile breaks validator
- [ ] Profile-specific traits visible in outputs
- [ ] Model ladder working (fast on local, graceful fallback)
- [ ] Output patterns documented for next phase

---

## Next Steps

1. **Merge new profiles into code** (this PR)
2. **Start Week 1 checklist** (add palettes, profiles, types)
3. **Set up Ollama locally** (test infrastructure)
4. **Run first test batch** (5 concepts × 13 profiles)
5. **Document what works, what's broken**
6. **Iterate on tuning**

---

## See Also

- [[17-Roadmap]] — M1 milestones
- [[wiki/profiles/]] — All 13 profile documentation
- [[04-Stack]] — LLM provider architecture
- [[11-LLM Providers]] — How to configure Ollama, OpenRouter, Anthropic
