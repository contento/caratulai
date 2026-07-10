import type { ProfileId } from "./types.js";

/**
 * A profile defines a complete aesthetic: palette, constraints, and prompt tone.
 */
export interface ProfileDef {
  id: ProfileId;
  label: string;
  paletteId: string;
  maxElements: number;
  maxTextElements: number;
  allowAllShapes: boolean;
  /** Background color (hex). If not specified, transparent. */
  backgroundColor?: string;
  /** Profile-specific opening tone for buildPrompt(). */
  promptTone: string;
  /** Spatial/compositional guidance for arranging elements. */
  composition: string;
}

export const PROFILES: Record<ProfileId, ProfileDef> = {
  sagan: {
    id: "sagan",
    label: "Voyager Golden Record",
    paletteId: "sagan",
    maxElements: 48,
    maxTextElements: 0,
    allowAllShapes: false,
    backgroundColor: "#d4af37",
    promptTone: [
      "Create an engraved technical diagram in the style of the Voyager Golden Record plate.",
      "Gold background, silver lines and marks. Precise, scientific, timeless.",
      "Like a message from Earth engraved in metal for a civilization a thousand years from now.",
      "Technical, profound, archival.",
    ].join(" "),
    composition: "Compose as a technical diagram: central focal point with radiating elements. Use radial symmetry or balanced asymmetry. Primary shape occupies 30-50% of canvas center. Secondary elements orbit or radiate from center. Maintain clear visual hierarchy — one dominant element, supporting elements smaller and peripheral.",
  },

  picasso: {
    id: "picasso",
    label: "Picasso Single Line",
    paletteId: "bw",
    maxElements: 3,
    maxTextElements: 0,
    allowAllShapes: false,
    backgroundColor: "#ffffff",
    promptTone: [
      "Create in the style of Picasso's single-line drawings: ONE continuous, elegant, unbroken line.",
      "A single flowing stroke that suggests the entire form. Minimal, sophisticated, expressive.",
      "A sketch that reveals the essence, not the detail. Pure line, no fill, no shapes — only flowing curves.",
    ].join(" "),
    composition: "Compose as ONE continuous flowing line: a single curved path that suggests the entire form through its flow and direction. The line itself is the art. No disconnected elements. No circles, rects, or shapes — only line. Proportions follow golden ratio or rule of thirds.",
  },

  contento: {
    id: "contento",
    label: "Rich Complexity",
    paletteId: "palette-256",
    maxElements: 80,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#f5f5f5",
    promptTone: [
      "Create a rich, dense, layered composition with maximum visual complexity.",
      "Use all available SVG shapes, gradients, patterns, effects. Fill the canvas.",
      "Layer and overlap. No restrictions. Maximalist but coherent — abundance, not chaos.",
      "CRITICAL: ZERO TEXT. No <text> elements at all. Meaning comes from pure visual structure.",
    ].join(" "),
    composition: "Compose with layered density: multiple overlapping elements create depth. Use visual abundance — fill 60-80% of canvas. Create foreground/midground/background layers. Balance complexity with clear focal point. Elements relate through proximity, overlap, and alignment.",
  },

  dictionary: {
    id: "dictionary",
    label: "Visual Dictionary",
    paletteId: "palette-256",
    maxElements: 60,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#ffffff",
    promptTone: [
      "Create using a visual dictionary of archetypal symbols and icons.",
      "Each concept maps to a recognizable visual primitive. Combine icons into a coherent",
      "pictographic composition. Clear, referential, encyclopedic.",
    ].join(" "),
    composition: "Compose as a visual lexicon: arrange semantic primitives in grid or cluster formation. Each element distinct but related. Use consistent spacing between elements. Create visual rhythm through repetition and variation. Balance density with readability.",
  },

  freud: {
    id: "freud",
    label: "Psychological Layers",
    paletteId: "grayscale-sepia",
    maxElements: 70,
    maxTextElements: 0,
    allowAllShapes: false,
    backgroundColor: "#e8e8e8",
    promptTone: [
      "Visualize this concept as a Freudian psychological structure with concentric layers:",
      "Outermost (cool gray) = Superego (rules, judgment). Middle (gray-sepia) = Ego (mediator).",
      "Innermost (warm sepia) = Id (primal drives). Use nested circles, spirals, fading edges.",
      "No text. Colors shift from warm inside to cool outside. Introspective, mysterious.",
    ].join(" "),
    composition: "Compose as a strict concentric psyche diagram: warm organic core in the center, a mediating middle ring, and a cooler restrictive outer ring. Let one inner form press outward against its boundaries to suggest repression or conflict. Keep all major elements nested, layered, and inward-facing rather than scattered across the canvas.",
  },

  jung: {
    id: "jung",
    label: "Archetypal Symbols",
    paletteId: "palette-256",
    maxElements: 60,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#fffaf0",
    promptTone: [
      "Create a mandala-like archetypal vision. Radially symmetric composition with luminous",
      "gold center (the Self, wholeness). Concentric rings for psyche layers. Include symbolic",
      "animals: lion=Hero (red), serpent=Shadow (purple), owl=Wise (blue), dove=Anima (pink).",
      "Sacred geometry holds opposites together. No text. 50 elements max.",
    ].join(" "),
    composition: "Compose as a mandala with a luminous central Self occupying the exact center. Build 3-4 concentric rings around it, and place archetypal symbols in balanced radial positions or quadrants so opposites face and complete each other. Preserve strong symmetry, sacred spacing, and a clear movement from outer differentiation toward inner wholeness.",
  },

  nietzsche: {
    id: "nietzsche",
    label: "Genealogy of Concepts",
    paletteId: "palette-256",
    maxElements: 100,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#ffffff",
    promptTone: [
      "Create a genealogical, philosophical diagram showing concept becoming: origin, then split",
      "into Apollonian (gold/white/structured order) vs Dionysian (black/red/organic chaos) branches.",
      "Show opposition via arrows and flows. Include spirals for eternal recurrence. Ascend toward",
      "synthesis (Übermensch, gold+red integrated). 40–100 elements based on complexity.",
    ].join(" "),
    composition: "Compose as a vertical genealogy: a primal origin low or central, then a split into two clearly opposed branches. Make the Apollonian side geometric and ascending, the Dionysian side organic and turbulent, then let both converge toward a higher synthesis. Use arrows, branching paths, and one recurring spiral motif to show becoming rather than static balance.",
  },

  booch: {
    id: "booch",
    label: "Engineering Clarity",
    paletteId: "booch",
    maxElements: 70,
    maxTextElements: 0,
    allowAllShapes: false,
    backgroundColor: "#ffffff",
    promptTone: [
      "Visualize this concept as a clear, rigorous system diagram (Grady Booch style).",
      "Use boxes for components, lines for connections. Show structure honestly without decoration.",
      "Make it comprehensible—a junior engineer should understand it immediately. Generous whitespace.",
      "No text labels. Colors: black (structure), blue (flow), gray (secondary). Honest, clear, crafted.",
    ].join(" "),
    composition: "Compose as an engineering diagram with one primary subsystem centered or slightly offset, supported by a small number of clearly separated secondary components. Use orthogonal alignment, even spacing, and direct connection lines so data or control flow reads left-to-right or top-to-bottom at a glance. Favor clarity, grouping, and whitespace over density.",
  },

  carlin: {
    id: "carlin",
    label: "Linguistic Subversion",
    paletteId: "carlin",
    maxElements: 80,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#1a1a1a",
    promptTone: [
      "Visualize this concept in George Carlin's style: linguistic subversion and sharp humor.",
      "Expose contradictions, play with meaning, show what this concept really is beneath comfortable lies.",
      "Use rapid juxtaposition: multiple interpretations of same form. Rough, crude, energetic—not polished.",
      "Show hypocrisy and hidden meanings. Colors: black (truth), red (anger/attention), electric blue (speed).",
    ].join(" "),
    composition: "Compose as a collision of competing readings: one dominant form in the center, then two or more distorted echoes, cutaways, or confrontational side-forms that expose contradiction. Keep the layout tense and punchy, with abrupt directional shifts and visual interruptions rather than smooth harmony. The eye should move quickly between a public surface and its harsher subtext.",
  },

  trungpa: {
    id: "trungpa",
    label: "Sacred Paradox",
    paletteId: "trungpa",
    maxElements: 70,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#f5e6d3",
    promptTone: [
      "Visualize through crazy wisdom: use paradox, humor, sacred disruption to point toward truth.",
      "Show opposites held together simultaneously: sacred and profane, serious and playful.",
      "Use shock and humor as teaching methods. Break visual rules to teach. Colors: gold (sacred),",
      "muddy (ordinary), red (passion). Playful but underneath is depth. Fearless, paradoxical.",
    ].join(" "),
    composition: "Compose around a central paradox where a dignified sacred structure is interrupted by playful, unruly, or earthy counter-forms. Keep the overall image balanced enough to feel intentional, but let one or two surprising asymmetries break the expected order. Place opposites close together so tension feels simultaneous rather than sequential.",
  },

  rosina: {
    id: "rosina",
    label: "Grounded Realism",
    paletteId: "rosina",
    maxElements: 60,
    maxTextElements: 0,
    allowAllShapes: false,
    backgroundColor: "#d3d3d3",
    promptTone: [
      "Visualize with stark realism and direct action (Italian neorealist cinema style).",
      "Show only what's essential—no decoration, no embellishment. Use arrows and simple forms",
      "to show motion, flow, work being done. Think unglamorous, grounded, honest.",
      "Colors: grays, browns, blacks (practical, worn materials). Every line does work. Raw, direct.",
    ].join(" "),
    composition: "Compose as a plain working scene or mechanism stripped to essentials: one active task or force line dominates, with only a few supporting forms showing constraint, effort, or movement. Keep the layout grounded and weighty, favoring horizontal or diagonal force over ornamental symmetry. Empty space should feel like austerity, not elegance.",
  },

  domingo: {
    id: "domingo",
    label: "Musical Range",
    paletteId: "domingo",
    maxElements: 80,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#fef9f3",
    promptTone: [
      "Visualize as a piece of music sung by a master tenor-baritone (Plácido Domingo style).",
      "Show range: high and low registers integrated without contradiction. Use flowing curves suggesting",
      "melodic phrases. Colors: gold (warmth), deep blue (profundity), amber (richness).",
      "The form should shift while maintaining core identity—versatile but unified. Warm, integrated, beautiful.",
    ].join(" "),
    composition: "Compose as an integrated musical phrase: a strong central motif anchors the image while sweeping curves rise and fall around it like linked vocal lines. Let upper and lower regions answer each other across the canvas, showing range without fragmentation. Preserve rhythmic continuity so the whole composition reads as one sustained performance.",
  },

  gabriel: {
    id: "gabriel",
    label: "Magic Realism",
    paletteId: "gabriel",
    maxElements: 120,
    maxTextElements: 0,
    allowAllShapes: true,
    backgroundColor: "#fffef5",
    promptTone: [
      "Visualize through magic realism (García Márquez style): blend magical seamlessly with mundane.",
      "Treat extraordinary as matter-of-fact. Ground mythology in specific place. Show spiraling time:",
      "cycles, repetitions, genealogical connections across generations. Mix traditions (indigenous,",
      "colonial, modern) without hierarchy. Elaborate, warm, mythic yet real. 70–120 elements.",
    ].join(" "),
    composition: "Compose as a layered village-memory tableau: a grounded everyday setting anchors the image while extraordinary forms spiral through and around it as if they belong there naturally. Use looping paths, repeated motifs, and linked clusters to suggest generations, recurrence, and stories folding into one another. Keep the scene dense and atmospheric, but organized around one inhabited center of gravity.",
  },
};

export const DEFAULT_PROFILE: ProfileId = "sagan";

export const PROFILE_IDS = Object.keys(PROFILES) as ProfileId[];

export function getProfile(id?: ProfileId): ProfileDef {
  const key = id ?? DEFAULT_PROFILE;
  const profile = PROFILES[key];
  if (!profile) {
    throw new Error(`Unknown profile "${key}". Available: ${PROFILE_IDS.join(", ")}`);
  }
  return profile;
}
