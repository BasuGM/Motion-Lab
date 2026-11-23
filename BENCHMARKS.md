# Benchmarks

## Bundle

`pnpm bench:size` runs `scripts/measure-bundles.ts`.

Each fixture imports that library’s fade demo, except AutoAnimate, which imports the list demo. esbuild bundles it for the browser, minified, with `react`, `react-dom`, and `react/jsx-runtime` external. Raw size is the bundle length. Gzip size is `zlib.gzipSync`.

Results land in `src/features/benchmarking/bundle-data.ts` with an ISO timestamp.

This is the fixture, not the whole Next.js app. A fade that also imports ScrollTrigger would be a different number, so the GSAP fade file imports core GSAP only.

## Runtime

The benchmarks page runs Motion, GSAP, and React Spring one after another. Each mounts 50 opacity and transform animations for two seconds. The page samples `requestAnimationFrame` deltas.

- Median FPS is `1000 / median delta`.
- A frame slower than 24ms counts as slow.
- Long tasks are summed when `PerformanceObserver` accepts `longtask`.
- `performance.memory` is shown only when it exists, and it is labeled Chromium-only.

Lottie and AutoAnimate are not in that tie. Playback of a vector file and a DOM list mutation are different work.

## Limitations

One machine, one browser, one session. The number moves if the tab is in the background or the machine is busy. Do not publish it as a ranking.
