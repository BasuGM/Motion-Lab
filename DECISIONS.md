# Decisions

## No shared `animate()` wrapper

The libraries do not share a model. Motion is declarative. GSAP is a timeline. React Spring is a physics system. Lottie is a file. AutoAnimate is a ref. A wrapper would hide the thing a reader came to compare.

Snippets and notes sit beside real components. The line count is the snippet, counted by splitting lines.

## One stage

Every demo renders inside `Stage`. The chrome is ink, the stage is paper, and library color is a 6px pip. The frame does not animate. The demo does.

shadcn/ui supplies slider, select, dialog, tabs, sheet, accordion, dropdown, chart, and toast behavior. Tokens in `src/app/globals.css` replace the default theme. Radius is 4px. The accent is one orange.

## Light, dark, and system

The header switches light, dark, and system. The page background and the paper stage stay distinct in both. Accent text and focus rings use a darker ink in light mode so the orange still meets contrast. In dark mode that ink is the accent itself.

Reduced motion is a separate setting. It comes from the operating system, not from the theme.

## Dynamic import per library

`DemoHost` imports the library module when that demo is shown. The home page does not load all five runtimes on first paint.

## Studio stays inside preset demos

The inspector edits duration, springs, and playback for a chosen scenario. It does not become a freeform timeline editor. That keeps the GSAP usage inside ordinary application code.

## Original Lottie JSON

Clips are generated in the repo. No third-party illustration files.

## Benchmarks are labeled

Bundle size is a reproducible esbuild fixture. Frame rate is a session sample. The UI says so next to the number.

## Cache Components off

The scaffold enabled them. This app has no cached data fetching. They are disabled in `next.config.ts` so the animation routes stay ordinary client components.
