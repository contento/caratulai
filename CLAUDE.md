# CLAUDE.md — AI working instructions

Project: **caratulai** — an alien image generator. Concepts (tags/ontology) → simple **vector** images in fundamental palettes. **Full wiki:** [[wiki/00-Home]]

## Working agreement

- Early-stage project. Prefer small, reversible steps over big upfront structure.
- Record non-obvious decisions as short ADRs in `wiki/decisions/`.
- Keep [[wiki/Open Questions]] current — resolve items as decisions land.
- Track outstanding work in [[wiki/Roadmap]].
- Use `./caratulai.sh` as the quick local automation wrapper; it can build `packages/cli/dist` on demand and then forwards arguments to the CLI.
- Use `./caratulai.ps1` for the same automation flow on PowerShell.

## Input pipeline: ontology at the root

- **Ontology is the core contract.** All input sources (direct tags, images, narrative text) must be converted to an ontology (a set of simple concept tags) before image generation.
- **Image input** → extract visual concepts → ontology tags.
- **Narrative text** → extract core concepts → ontology tags.
- **Direct tags** → validate and pass through as ontology.
- The generated image is **always driven by the final ontology**, never by the original narrative or image. This ensures predictable, tag-focused output that respects [[wiki/Principles|aesthetic constraints]].

## Profiles: 10 Philosophical Frameworks
## Aesthetic guardrails (these are requirements, not taste)

Caratulai offers **10 generation profiles**—each a distinct philosophical framework for visualizing concepts. Profiles range from aesthetics (minimalist to maximalist) to epistemology (scientific engineering to linguistic subversion to sacred paradox).

Every profile follows the same contract:

- Clear, documented philosophy and historical grounding
- Concrete visual language (colors, shapes, constraints)
- Prompt tone tuned for LLM generation
- References and deeper reading for understanding

See **[[wiki/profiles/]]** for full documentation of each.

## Conventions

- Workspace packages are ESM TypeScript, `@caratulai/<name>` scope.
- `core` stays I/O-agnostic — no direct DB/filesystem in the engine; surfaces inject those.
- Built-in palettes and the SVG sanitizer are the source of truth for [[wiki/Principles|aesthetic constraints]].
- Every profile respects the same hard aesthetic constraints (no text, valid SVG, concept-driven).

## See Also

- **[[wiki/01-Vision]]** — why it exists, name, musical analogy
- **[[wiki/02-Principles]]** — the 7 hard aesthetic constraints (required reading)
- **[[wiki/03-Profiles]]** — generation profiles overview
- **[[wiki/profiles/]]** — detailed documentation of all 10 profiles
- **[[wiki/04-Stack]]** — tech stack, monorepo layout, architecture
- **[[wiki/17-Roadmap]]** — M0–M10 milestones
