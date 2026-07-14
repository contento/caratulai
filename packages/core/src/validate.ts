import { parse, type HTMLElement } from "node-html-parser";
import type { Constraints, Palette, ValidationIssue, ValidationReport } from "./types.js";
import { snapToPalette } from "./palettes.js";

/**
 * Strip markdown fences / prose an LLM may wrap around the SVG. Takes the LAST `<svg` opening
 * tag through its first following `</svg>`: models that narrate a false start ("let me
 * restart...") emit an abandoned, often-unclosed `<svg>` followed by prose and a complete
 * final one — a single greedy/non-greedy match from the first opening tag would swallow the
 * abandoned draft and the prose in between into one malformed blob.
 */
export function extractSvg(raw: string): string {
  const lower = raw.toLowerCase();
  const start = lower.lastIndexOf("<svg");
  if (start === -1) return raw.trim();
  const closeTag = "</svg>";
  const closeIdx = lower.indexOf(closeTag, start);
  if (closeIdx === -1) return raw.trim();
  return raw.slice(start, closeIdx + closeTag.length);
}

// Matches both CSS (`fill:#fff`) and attribute (`fill="#fff"`) forms, capturing the separator
// and optional quote so they can be preserved on replacement. The value branch also captures
// bare keywords so named CSS colors get snapped; non-color keywords (none, url, …) pass through.
const COLOR_PROP = /(fill|stroke|stop-color)(\s*[:=]\s*)(["']?)(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/g;

/** Named CSS colors LLMs commonly emit despite the exact-hex instruction. */
const NAMED_COLORS: Record<string, string> = {
  black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000", lime: "#00ff00",
  blue: "#0000ff", navy: "#000080", yellow: "#ffff00", orange: "#ffa500", purple: "#800080",
  gray: "#808080", grey: "#808080", silver: "#c0c0c0", gold: "#ffd700", brown: "#a52a2a",
  pink: "#ffc0cb", cyan: "#00ffff", magenta: "#ff00ff", crimson: "#dc143c", indigo: "#4b0082",
  violet: "#ee82ee", teal: "#008080", maroon: "#800000", olive: "#808000", beige: "#f5f5dc",
  tan: "#d2b48c", ivory: "#fffff0", khaki: "#f0e68c", salmon: "#fa8072", coral: "#ff7f50",
  turquoise: "#40e0d0", lavender: "#e6e6fa", plum: "#dda0dd", orchid: "#da70d6",
  skyblue: "#87ceeb", steelblue: "#4682b4", darkblue: "#00008b", darkred: "#8b0000",
  darkgreen: "#006400", darkgray: "#a9a9a9", darkgrey: "#a9a9a9", lightgray: "#d3d3d3",
  lightgrey: "#d3d3d3", lightblue: "#add8e6", lightgreen: "#90ee90",
};

/**
 * Enforce the aesthetic on a generated SVG: snap colors to the palette, drop disallowed
 * elements, cap complexity, and remove text beyond the limit. Returns the cleaned SVG and a
 * report of what was changed.
 */
export function sanitizeSvg(
  raw: string,
  palette: Palette,
  constraints: Constraints
): { svg: string; report: ValidationReport } {
  const issues: ValidationIssue[] = [];
  let svg = extractSvg(raw);

  // 1) Snap every color to the nearest fundamental palette color.
  svg = svg.replace(COLOR_PROP, (m, prop: string, sep: string, quote: string, color: string) => {
    const hex = color.startsWith("#") ? normalizeHex(color) : NAMED_COLORS[color.toLowerCase()];
    if (!hex) return m; // none / url(...) / currentColor — nothing to snap
    const snapped = snapToPalette(hex, palette);
    if (snapped.toLowerCase() !== color.toLowerCase()) {
      issues.push({ rule: "palette", message: `${color} → ${snapped}`, fixed: true });
    }
    return `${prop}${sep}${quote}${snapped}`;
  });

  const root = parse(svg, { voidTag: { tags: [] } });
  const svgEl = root.querySelector("svg");
  if (!svgEl) {
    return {
      svg,
      report: { ok: false, issues: [{ rule: "structure", message: "no <svg> element", fixed: false }] },
    };
  }

  const allowed = new Set(constraints.allowedPrimitives.map((t) => t.toLowerCase()));
  allowed.add("svg");
  allowed.add("title");
  allowed.add("desc");

  // 2) Remove disallowed elements; enforce text and complexity limits.
  let textCount = 0;
  let drawCount = 0;
  for (const el of svgEl.querySelectorAll("*")) {
    const tag = el.tagName?.toLowerCase();
    if (!tag) continue;

    if (tag === "text" || tag === "tspan") {
      textCount++;
      if (textCount > constraints.maxTextElements) {
        remove(el);
        issues.push({ rule: "text", message: `removed extra <${tag}>`, fixed: true });
      }
      continue;
    }

    if (!allowed.has(tag)) {
      remove(el);
      issues.push({ rule: "primitive", message: `removed disallowed <${tag}>`, fixed: true });
      continue;
    }

    if (tag !== "svg" && tag !== "g") {
      drawCount++;
      if (drawCount > constraints.maxElements) {
        remove(el);
        issues.push({ rule: "complexity", message: `removed element over cap`, fixed: true });
      }
    }
  }

  return {
    svg: root.toString(),
    report: { ok: issues.every((i) => i.fixed), issues },
  };
}

function normalizeHex(hex: string): string {
  let h = hex.replace("#", "");
  // Drop the alpha channel from #rgba / #rrggbbaa forms.
  if (h.length === 4) h = h.slice(0, 3);
  if (h.length === 8) h = h.slice(0, 6);
  if (h.length === 3) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  return `#${h}`;
}

function remove(el: HTMLElement): void {
  el.remove();
}
