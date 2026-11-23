# Interview prep

Spoken answers. The longer version is named at the end of each one.

## Why not one animation API?

The differences are the product. A shared wrapper would make GSAP look like Motion and would hide Flip, DrawSVG, and springs. The registry stores a component per library instead.

Longer version: [DECISIONS.md](DECISIONS.md).

## When do you pick each library?

Motion for gestures, layout, and presence. GSAP for timelines, scroll, and SVG. React Spring for values that must be interrupted. Lottie for a finished vector file. AutoAnimate for add, remove, and reorder.

Most apps need one of the first three, plus Lottie if design hands over JSON.

Longer version: [ANIMATION_LIBRARIES.md](ANIMATION_LIBRARIES.md).

## How do you keep GSAP from leaking?

`useGSAP` with a scope ref reverts tweens on unmount. Plugins are registered once. Tweens are not created during render.

Longer version: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md).

## How do you measure bundle size without lying?

esbuild bundles one fixture, React is external, and the GSAP fade does not import ScrollTrigger. AutoAnimate is measured as a list, and the table says so. Gzip is computed locally, not copied from a website.

Longer version: [BENCHMARKS.md](BENCHMARKS.md).

## Why is FPS not a ranking?

`requestAnimationFrame` on one laptop, for two seconds, with fifty tweens, moves when the machine is busy. The page calls it a session sample. Median frame time is the summary. Long tasks are included only when the browser exposes them.

Longer version: [BENCHMARKS.md](BENCHMARKS.md).

## How does reduced motion work?

The stage reads `prefers-reduced-motion` and passes `reducedMotion`. Demos skip tweens and show the settled UI. Buttons still work. The header shows the state. It is the operating system setting, not the color theme.

Longer version: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md).

## What would you not build?

A freeform timeline canvas on top of GSAP. The license allows coded demos. It does not invite a competing visual builder. The studio edits numbers on preset demos.

Longer version: [DECISIONS.md](DECISIONS.md).

## What is a line count here?

The number of lines in the curated snippet next to the demo. It is a reading aid. It is not an AST measurement of the whole module.

Longer version: [DECISIONS.md](DECISIONS.md).

## Why does the home page not import all five libraries?

The home stage loads the library you are looking at. `DemoHost` imports that module when the demo is on screen. GSAP, Spring, Lottie, and AutoAnimate stay out of the first paint until you pick them.

Longer version: [ARCHITECTURE.md](ARCHITECTURE.md).

## What does the screen show when a library cannot do the brief?

A "not a fit" panel, with the reason and a link to a library that can. The scenario list records the exclusion. There is no fake fade for AutoAnimate and no fake list for Lottie.

Longer version: [ARCHITECTURE.md](ARCHITECTURE.md).

## How do light and dark stay readable, and why does the accent ink change?

The page background and the paper stage stay distinct in both themes. In light mode the accent orange is too light for text and focus rings, so those use a darker ink. In dark mode that ink is the accent itself. The header switches light, dark, and system. Demos do not pick colors.

Longer version: [DECISIONS.md](DECISIONS.md).

## Why does Lottie wait for ready instead of calling play() on mount?

`autoplay` is off so the transport and reduced motion stay in charge. The animation item does not exist on the first effect, so a `play()` there is ignored and the clip sits still. `play()`, `pause()`, and the reduced-motion seek run from `subscriptions.ready`, which fires after the item exists. Replay remounts the clip, and ready starts it again.

Longer version: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md).
