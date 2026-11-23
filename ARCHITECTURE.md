# Architecture

MotionLab does not have a shared animation engine. A scenario is a brief plus one React component per library that can do it.

```
src/app/                routes
src/components/         header, stage, code panel
src/animations/         libraries, scenarios, snippets, per-library demos
src/features/           explorer, compare, studio, docs, benchmarks
src/stores/             Zustand
src/types/animation.ts  shared types
```

`src/animations/scenarios.ts` lists what each library supports and, when it does not, why. `src/animations/snippets.ts` holds the curated snippet, line count, and note. `src/components/animation/demo-host.tsx` dynamically imports one library module when that demo is on screen.

Pages:

- `/` home
- `/playground` and `/playground/[library]/[scenario]`
- `/components` and `/components/[slug]`
- `/advanced` and `/advanced/[slug]`
- `/compare` and `/compare/[scenario]`
- `/studio`
- `/docs` and `/docs/[slug]`
- `/benchmarks`

The paper stage is one component. Demos render in its slot. They do not invent a second frame.

The header owns the theme control. `next-themes` sets the class on `html`. Demos do not pick colors.

Playback is not unified. Motion and React Spring use their own controls. GSAP uses a tween. Lottie uses the player ref. AutoAnimate has list buttons instead of a playhead.
