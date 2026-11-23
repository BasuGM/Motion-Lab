# Implementation guide

## Add a scenario

1. Add a definition in `src/animations/scenarios.ts` with the libraries that can do it and an exclusion for the ones that cannot.
2. Add a snippet in `src/animations/snippets.ts`. The line count is the snippet’s line count.
3. Export a demo from that library’s `demos.tsx`. The key must match the scenario id.
4. The registry test fails if a supported library has no snippet.

Do not add a demo that fakes a capability. A “not a fit” panel is the correct result.

## Studio controls

`schemaFor` in `src/features/configuration/schemas.ts` is the source of truth for which numbers a library accepts. The inspector shows the intersection of that schema’s groups and the scenario’s groups.

Changing a value updates the Zustand config. Demos read `config` as props. Replay bumps `playToken`, and the demo host remounts on that token.

## Reduced motion

`usePrefersReducedMotion` is passed in as `reducedMotion`. Demos should show the settled state and skip tweens. The header says “Motion reduced” when the OS setting is on.

## GSAP in React

```tsx
useGSAP(() => {
  registerGsap();
  gsap.to(element, { x: 40 });
}, { scope: root, dependencies: [playToken] });
```

Do not call `gsap` during render.

## Lottie clips

Edit `src/animations/lottie/build-clips.mjs` and run `node src/animations/lottie/build-clips.mjs`. The player takes `src`, not the older `animationData` prop.

`autoplay` stays off. `play()`, `pause()`, and the reduced-motion seek run from `subscriptions.ready` in `src/animations/lottie/fade.tsx`, because the animation item does not exist on the first effect. Replay remounts the clip through `playToken`.
