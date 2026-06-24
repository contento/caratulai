import { describe, it, expect } from "vitest";
import { buildPrompt, SYSTEM_PROMPT } from "./prompt.js";
import { PROFILES } from "./profiles.js";
import { getPalette } from "./palettes.js";
import { createConstraints } from "./constraints.js";
import type { GenerationRequest, ProfileId } from "./types.js";

/**
 * Prompt snapshot tests: verify that every profile emits the correct composition
 * guidance. These are deterministic — no LLM needed.
 */

const TAGS = ["star", "water"];

const reqFor = (id: ProfileId): GenerationRequest => {
  const def = PROFILES[id];
  return {
    tags: TAGS,
    palette: getPalette(def.paletteId)!,
    constraints: createConstraints(def),
    params: { model: "test", temperature: 0.5, seed: 1 },
    profile: id,
  };
};

describe("profile prompt snapshots", () => {
  for (const id of Object.keys(PROFILES) as ProfileId[]) {
    const def = PROFILES[id];

    it(`${id}: prompt includes promptTone`, () => {
      const prompt = buildPrompt(reqFor(id));
      // Every prompt should contain its profile's opening tone (first 40 chars)
      expect(prompt).toContain(def.promptTone.slice(0, 40));
    });

    it(`${id}: prompt includes concept tags`, () => {
      const prompt = buildPrompt(reqFor(id));
      expect(prompt).toContain("star");
      expect(prompt).toContain("water");
    });

    it(`${id}: prompt includes STRICT RULES`, () => {
      const prompt = buildPrompt(reqFor(id));
      expect(prompt).toContain("STRICT RULES:");
      expect(prompt).toContain("Generate the SVG now:");
    });

    it(`${id}: prompt includes COMPOSITION section`, () => {
      expect(def.composition).toBeTruthy();
      const prompt = buildPrompt(reqFor(id));
      expect(prompt).toContain("COMPOSITION:");
      expect(prompt).toContain(def.composition!.slice(0, 40));
    });

    it(`${id}: COMPOSITION appears before STRICT RULES`, () => {
      const prompt = buildPrompt(reqFor(id));
      const compIdx = prompt.indexOf("COMPOSITION:");
      const rulesIdx = prompt.indexOf("STRICT RULES:");
      expect(compIdx).toBeGreaterThan(-1);
      expect(rulesIdx).toBeGreaterThan(-1);
      expect(compIdx).toBeLessThan(rulesIdx);
    });
  }
});

describe("SYSTEM_PROMPT composition principles", () => {
  it("includes composition principles", () => {
    expect(SYSTEM_PROMPT).toContain("COMPOSITION PRINCIPLES:");
    expect(SYSTEM_PROMPT).toContain("focal point");
    expect(SYSTEM_PROMPT).toContain("visual hierarchy");
    expect(SYSTEM_PROMPT).toContain("negative space");
  });
});

describe("prompt structure per profile", () => {
  for (const id of Object.keys(PROFILES) as ProfileId[]) {
    const def = PROFILES[id];

    it(`${id}: prompt has correct element limit`, () => {
      const prompt = buildPrompt(reqFor(id));
      expect(prompt).toContain(`Maximum ${def.maxElements} elements`);
    });

    it(`${id}: prompt enforces text rule`, () => {
      const prompt = buildPrompt(reqFor(id));
      if (def.maxTextElements === 0) {
        expect(prompt).toContain("ZERO text");
      } else {
        expect(prompt).toContain(`At most ${def.maxTextElements} technical label`);
      }
    });
  }
});
