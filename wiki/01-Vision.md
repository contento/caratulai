# Vision

## What is caratulai?

**Carátula** (Spanish): the cover sheet — the first image you meet.

caratulai makes **symbols, not pictures**: it turns *concepts* (tags, not narratives) into **simple vector images** — line, arc, diagonal — in restrained, fundamental palettes.

The lineage is **contento / conten.to**, the **Voyager 1 Golden Record** and Pioneer plaque, and **Picasso's line**. The goal is imagery that feels like a message left for someone who has never seen Earth: fundamental, symbolic, quiet. The reaction against conten.to's current imagery is deliberate — **less obvious, far less colorful.**

## Why the name

**Carátula** is Spanish for the *cover* — the front of a thing. It's what you call the cover of a book, the sleeve of an **LP**, the case of a **CD**, and now the header of a **blog**. The carátula is the first image you meet, the face a work shows the world.

The name is a stance. Generated imagery had become very complex — and as much as I love Bach and computers, I value **simplicity and minimalism** above all. I love a **simple carátula**. This tool exists to make them.

**caratulai** = *carátula* + **AI** — the cover, drawn by a machine.

## The musical analogy

caratulai plays **simple chords — A, Am, C#.** This is *not* Berlioz or Philip Glass; it's the **Beatles, Paul Simon, Camilo Sesto, Gardel, Edith Piaf** — a small vocabulary of familiar forms arranged for directness and feeling. Song-craft, not symphony.

## Goals

- Turn a set of **tags** (drawn from an ontology) into a **simple SVG image**.
- Enforce a **fundamental aesthetic**: minimal palette, simple line/arc/diagonal, little/no text.
- Make every image **reproducible** from its stored metadata (tags, palette, model, params, seed).
- Generate **many variations** of one concept by sweeping hyperparameters.
- Run on **Web, TUI/CLI, Desktop, Backend**, across **Windows/macOS/Linux/Web**.

## Non-goals (v1)

- Diffusion/raster generation as the primary path (optional mode only).
- Full document/body composition — caratulai makes the *image*, not the document.
- WYSIWYG vector editor (it generates; external tools edit).
- Multi-user accounts / collaboration.
- Colorful, ornate, or photorealistic output — out of scope **by design**.

## Origin story

conten.to's AI-generated post images were good — technically. What nagged was that they were **denotative, not connotative**: illustrations of a post's subject rather than a symbol for it. A picture of the thing, not a sign standing for the thing.

Three threads, pulled from much further back, converged into caratulai:

**The Voyager 1 memory.** As a kid in Colombia, I had a free subscription to *La Pura Verdad* — the Spanish-language edition of *The Plain Truth*, founded 1934 by Herbert W. Armstrong out of Ambassador College in Pasadena, near LA. Even if I was not a Christian myself, some of the articles were very good. Around 1981, an issue covered Voyager 1's images of Saturn and mentioned that Carl Sagan had shaped the mission's imagery with an audience in mind that had never seen Earth — an alien who might one day find the vessel. (Sagan chaired the Golden Record committee and sat on the imaging science team; the magazine's framing blurred the two, but the idea stuck regardless: *design the image for a reader who shares none of your context.*) That's the brief caratulai is built to satisfy — an **alien image generator**.

Verified: the issue is *La Pura Verdad*, Vol. 14, No. 2, **March 1981**, cover story "El *Voyager I* a Saturno: nueva conquista en el espacio" by Gene H. Hogberg — [PDF](http://www.herbert-armstrong.org/SpanishPV/Pura%20Verdad%201981%20(Prelim%20No%2002)%20Mar.pdf). It quotes *Time* framing deep-space missions as "la búsqueda de planetas y el esfuerzo por comunicarse con vida extraterrestre" (the search for planets and the effort to communicate with extraterrestrial life) — the extraterrestrial-contact angle is real, even if Sagan isn't named on the pages sampled; memory likely folds in his public role as the era's face of that framing.

*Still running, much changed.* The magazine survives today as *The Plain Truth*, published by Plain Truth Ministries ([ptm.org](https://www.ptm.org/)) — no longer the mass-circulation free monthly of the 1980s, but a modest bimonthly online newsletter, its end-times/prophecy framing replaced by Jesus-centered devotional content following the Worldwide Church of God's 1990s theological split.

**The diagram languages.** Years of reading and drawing circuit diagrams (AND/OR gates, transistors, diodes) and UML (Booch et al.) shaped a different instinct: that a small vocabulary of primitive shapes — line, arc, diagonal, a handful of symbols — can carry precise meaning without resembling the thing it represents at all. A logic gate doesn't look like a decision; a class diagram doesn't look like an object. That's the alternative to "the image" caratulai chases: **concept → symbol**, not concept → picture.

Put together: conten.to's dissatisfaction supplied the *why now*, the Voyager/Sagan memory supplied the *for whom* (a reader with zero shared context — the alien), and the diagram languages supplied the *how* (fundamental primitives, restrained palettes, symbolic rather than illustrative). The result is the small carátula image now generated for every conten.to post.

## The founding prompt (2026-05-31)

Preserved verbatim for historical reasons:

> the idea comes from contento/conten.to, simplicity, art like picasso, images in gold plate from voyager 1,.
> I'm am not satisfy with the imagery of conten.to: to obvious to colorful! I'd going to create a image generator, web front end, TUI CLI, desktop app and backend.
> a generator based on simple concepts, just tags no complex narratives, ontology style with simple palettes with minimum colors, BW, sephia, grayscale, 16 bit, 256 but always using fundamentals, no rainbows, no rococo or barroco.
> The goal a alien image generator.
> Default generation: force to vector image such as SVG, with export to PDF, JPEG, PNG, ICON, etc (suggest). use LLMs from cheap to costly to generate images, use local and remote LLMs.
> Use a lot of metadata, taxonomy and ontology.
> Use both capabilities save in files and or store in DB (SQL LIte, Progress, etc)
> Suggest tools and frameworks. Typescript, Rust, C#, Python, accepted suggestions.
> Multiplatform Windows, Mac, Linux, Web.
> All lines has to be simple not complicated images, arc and diagonal accepted, minimum if not zero text
> Ability to show different concepts with different palettes, allow to have max number of ideas gen with variations of hyperparameters

## Addendum (2026-05-31)

Another driving idea, preserved verbatim:

> another driving idea: use simple cords A, Am , C#. this is not berlioz, philip glass, more like Beatles, Paul Simon, Camilo Sesto, Gardel, Edit Piaf
