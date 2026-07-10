# ADR-0004: Coordinate Bounds Enforcement & Profile Background Colors

**Date:** 2026-06-23  
**Status:** Accepted  
**Context:** SVG generation was producing coordinates far outside canvas bounds (e.g., paths reaching y=1200 on a 540px canvas), breaking rendering. Additionally, profiles lacked visual grounding with background fills.

---

## Decision

### 1. Explicit Canvas Bounds in Prompts

**Issue:** LLM models ignored canvas size even when stated. Generated coordinates exceeded viewable area.

**Solution:** 
- Rewrote prompt to be extremely explicit: "CANVAS SIZE: 960x540. THIS IS THE HARD LIMIT."
- Added system-level warning: "CRITICAL: The SVG canvas size is specified in each request. All coordinates... must stay within those bounds or the image will not render."
- Listed bounds for each axis explicitly: "x-axis: 0 to 960, y-axis: 0 to 540"
- Added consequence warning about rendering failure

**Result:** Models now respect bounds consistently.

### 2. Profile Background Colors

**Issue:** SVGs were transparent by default, losing profile identity and context.

**Solution:**
- Added `backgroundColor?: string` to `ProfileDef` interface
- Assigned contextual background colors to all 13 profiles:
  - **sagan** (#d4af37 gold) - Voyager archival feel
  - **picasso** (#ffffff white) - minimalist line drawings
  - **booch** (#ffffff white) - engineering clarity
  - **dictionary** (#ffffff white) - visual clarity for icons
  - **freud** (#e8e8e8 gray) - introspective layers
  - **jung** (#fffaf0 cream) - sacred/warm mandalas
  - **nietzsche** (#ffffff white) - philosophical diagrams
  - **carlin** (#1a1a1a dark) - subversive contrast
  - **trungpa** (#f5e6d3 tan) - sacred warmth
  - **rosina** (#d3d3d3 gray) - grounded/worn
  - **domingo** (#fef9f3 cream) - musical warmth
  - **contento** (#f5f5f5 light gray) - complexity on neutral ground
  - **gabriel** (#fffef5 ivory) - mythic luminosity

- Injected background `<rect>` as first SVG child in `generate()` pipeline
- Background respects canvas dimensions and profile aesthetic

**Result:** Each profile now has intentional visual grounding that reinforces its philosophical framework.

### 3. Per-Profile Constraints Refinement

**Adjustments made:**
- **picasso**: 20 → **3 elements max** (strict enforcement of single-line minimalism)
- **jung**: 50 → **60 elements** (mandala complexity needs room)
- **rosina**: 50 → **60 elements** (realism shows more essential forms)

---

## Trade-offs

- **Prompts become verbose:** More explicit instructions increase token usage slightly but dramatically improve constraint adherence.
- **Background injection timing:** Happens post-sanitization, so background counts toward max-elements if miscounted, but in practice this is rarely an issue since it's a single element.
- **Profile identity vs. minimalism:** Some minimal profiles (picasso, booch) have white backgrounds that reduce visual impact, but this aligns with their aesthetic intent.

---

## References

- [[02-Principles]] — aesthetic constraints these decisions support
- [[03-Profiles]] — philosophical grounding for each background choice
- `packages/core/src/prompt.ts` — coordinate bounds constraints
- `packages/core/src/generate.ts` — background injection
- `packages/core/src/profiles.ts` — backgroundColor definitions
