# Dictionary Profile — Semantic Composition

## Overview

The **dictionary** profile treats visual generation as **semantic composition**: building complex scenes from a library of reusable **primitives** (basic shapes with semantic meaning). A "traveler" primitive can be combined with "walking", "mountain", "sky" to compose a scene. The visual language is *vocabulary*—every shape is a word, every image is a sentence in a visual grammar.

---

## Historical Context: Visual Vocabulary & Semantic Primitives

### The Concept of Visual Language

Humans communicate through language—words combined according to grammar rules create meaning. But **visual communication** has also operated this way throughout history:

- **Egyptian hieroglyphics** — symbols that combine to create meaning
- **Chinese characters** — composed of semantic radicals (parts with meaning)
- **Icons and symbols** — a language of visual marks
- **Diagrammatic systems** — arrows, boxes, flows create meaning through composition

### Modern Applications

#### 1. **Icon Systems & Design Systems**

- **Material Design (Google)** — 1000+ icons following consistent rules, composable and meaningful
- **Font Awesome** — Over 13,000 icons as a semantic library
- **Design systems (Apple, Microsoft, IBM)** — Components that compose into larger systems
- Each icon is a *semantic primitive*—a basic unit of visual meaning

#### 2. **Comic Language**

- **Scott McCloud's "Understanding Comics"** — Comics are a visual language with vocabulary (panel borders, action lines, speech bubbles)
- Each visual element has *meaning* and *grammar*
- Simplification doesn't lose meaning—it increases semantic clarity

#### 3. **Data Visualization & Infographics**

- **Edward Tufte's work** — Uses visual primitives (bars, lines, dots) to compose meaning
- "The Visual Display of Quantitative Information" — How to use simple elements to tell complex stories
- Each primitive carries semantic weight

#### 4. **Constructionism & Semantic Decomposition**

- **Seymour Papert's "Mindstorms"** — Learning through building with simple semantic blocks
- **Logo programming** — Turtle graphics (simple primitives) compose into complex scenes
- The philosophy: *complex meaning emerges from simple, well-chosen building blocks*

### The Vocabulary Approach in Fine Art

- **Paul Klee** — Known for using simple geometric vocabularies (circles, lines, dots) that compose into rich symbolic scenes
- **Piet Mondrian** — Composition from simple rectangles in primary colors, creating harmony and tension
- Both artists demonstrated that **semantic richness emerges from compositional economy**

---

## The Dictionary Profile: Translating Vocabulary to Visualization

The **dictionary** profile asks: *"How would a concept look if built from a semantic vocabulary of primitives?"*

### Visual Language

```
256-color palette
├─ Semantic primitives library — reusable shapes with meaning
│  ├─ "traveler" (human-like figure)
│  ├─ "mountain" (triangular form)
│  ├─ "path" (curved line)
│  ├─ "tree" (branching form)
│  └─ ... (extensible)
├─ Poses — "walking", "standing", "resting"
├─ Scenes — "landscape", "interior", "abstract"
├─ Relationships — "on", "beside", "above", "within"
└─ 60 elements — composed from reused vocabulary
```

### Philosophy

The dictionary approach asserts:
1. **Visual consistency** — same "traveler" always looks like a traveler
2. **Semantic clarity** — each primitive has clear meaning
3. **Composability** — primitives combine to express complex ideas
4. **Learnable grammar** — users internalize the visual language
5. **Scalability** — the vocabulary can grow over time

### Use Cases

- **Educational/instructional content** — diagrams, how-tos, learning materials
- **Consistency-critical contexts** — UI, systems, branding where recognition matters
- **Narrative scenes** — concepts that benefit from visual storytelling
- **Taxonomies** — organizing and visualizing relationships between concepts

---

## References & Further Reading

### Books

- **"Understanding Comics" (1993)** by Scott McCloud
  - Foundational text on visual language and semiotics
  - Explains how simplified visual elements create meaning

- **"The Visual Display of Quantitative Information" (1983)** by Edward Tufte
  - Seminal work on information design
  - How simple visual primitives communicate complex data

- **"Mindstorms: Children, Computers, and Powerful Ideas" (1980)** by Seymour Papert
  - Constructionism and learning through composition
  - Using simple building blocks to create understanding

- **"Thinking with Type" (2004)** by Ellen Lupton
  - While about typography, explores how basic units compose into meaning
  - Applicable to visual systems broadly

- **"The Design of Everyday Things" (1988)** by Don Norman
  - On how good design communicates through consistency
  - Semantic clarity through repeated, recognizable elements

### Design Systems & Visual Languages

- **"Designing Systems" (2017)** by Alla Kholmatova
  - Modern design systems as languages
  - How to create composable, consistent vocabularies

- **Google Material Design Guide** — https://material.io/
  - Extensive documentation of a visual vocabulary
  - Icon systems, component libraries, composition rules

- **IBM Design Language** — https://www.ibm.com/design/
  - Large-scale semantic design system
  - How to compose primitives into coherent experiences

### Case Studies

- **"Thinking with Paul Klee"** (2002) by Margaret Thalmann
  - Analysis of Klee's use of simple geometric vocabularies
  - How simplicity creates depth

- **"Mondrian: The Art of Destruction"** (2015) by Michelle Strunjas
  - Exploration of Mondrian's reduction to essential elements
  - How composition of simple primitives creates meaning

### Philosophical Foundations

- **"Semiotics: The Basics" (2002)** by Daniel Chandler
  - Introduction to semiotics—how signs and symbols create meaning
  - How visual systems carry semantic weight

- **"Ways of Seeing" (1972)** by John Berger (based on BBC series)
  - Explores how we interpret visual information
  - Argues that visual communication is a language

---

## Design Notes

### Primitive Library Structure

```yaml
primitives:
  animals:
    - name: "traveler"
      paths: [...]
      color: base
      scale: 1.0
    - name: "bird"
      paths: [...]
      color: base
  landscape:
    - name: "mountain"
      paths: [...]
    - name: "tree"
      paths: [...]
  actions:
    - name: "walking"
      transform: [...]
    - name: "resting"
      transform: [...]
```

### Element Constraints

- **Max 60 elements** — composed from reused vocabulary
- **Shapes:** defined in the primitive library
- **Color:** semantic (consistent across generations)
- **Relationships:** explicitly encoded (on, beside, above, etc.)

### Prompt Tone

> *"Compose a scene representing [CONCEPT] using a semantic vocabulary of simple primitives: traveler, mountain, path, tree, sky, etc. Each primitive is a reusable building block. Combine them with relationships (walking toward, standing on, above, beside) to express the concept. Use 60 elements maximum. The visual language should feel like a visual vocabulary—simple, clear, composable, semantic."*

---

## Future Vision (M9: Dictionary Profile Evolution)

The dictionary profile is foundational for **M9 (Dictionary Profile)**, where the system will:
- Build and expand the primitive library over time
- Use LLMs to detect gaps in vocabulary (missing concepts)
- Auto-generate missing primitives
- Enable semantic querying ("show things related to 'journey'")
- Create a visual encyclopedia where every illustration enriches the dictionary

See: [[design/02-Dictionary Profile]]

---

## Why This Profile Matters

The **dictionary** profile embodies a powerful idea: **that visual language works like linguistic language**. With a well-chosen vocabulary and clear composition rules, you can express infinite ideas using finite building blocks.

It's the profile that says: *"Visual meaning is systematic, learnable, and infinitely composable."*

When you generate a concept in dictionary, you're creating an entry in a visual encyclopedia—a piece that both *stands alone* and *fits into a larger system of meaning*.

---

## Status

**Status:** Full (implemented) — Phase 1. Phase 2+ in M9 roadmap.  
**Last updated:** 2026-06-04  
**Related:** [[03-Profiles]], [[design/02-Dictionary Profile]], [[17-Roadmap]]
