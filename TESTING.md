# Testing

## Unit and component

```bash
pnpm test
```

Vitest with jsdom.

- `src/animations/registry.test.ts` checks that every supported library has a non-empty snippet and that the line count matches the text.
- `src/features/configuration/schemas.test.ts` checks that Motion rejects a stiffness of 0 and that the AutoAnimate schema has no spring field.
- `src/components/animation/not-a-fit.test.tsx` renders the mismatch panel and its link.
- `src/components/layout/site-header.test.tsx` checks the active compare link.

`vitest.setup.ts` stubs `matchMedia`.

## End to end

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

`e2e/smoke.spec.ts` opens the home stage, pauses a playground fade, checks two compare columns at 1440 and the switcher at 390, resets the studio, and checks the benchmark bundle tab. Screenshots go to `e2e/artifacts/`, which is gitignored.

## What is not covered

Visual pixel diffs. The screenshots are for review. Animation timing is not asserted. A tween that runs is enough for the smoke test. The pause control is asserted because it is a button, not because a pixel moved.
