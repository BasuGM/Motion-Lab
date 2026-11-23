import { build } from "esbuild";
import { gzipSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const fixtures = [
  { library: "motion", file: "scripts/fixtures/motion.tsx", workload: "fade one box" },
  { library: "gsap", file: "scripts/fixtures/gsap.ts", workload: "fade one box" },
  { library: "react-spring", file: "scripts/fixtures/react-spring.tsx", workload: "fade one box" },
  { library: "lottie", file: "scripts/fixtures/lottie.tsx", workload: "player plus one clip" },
  { library: "auto-animate", file: "scripts/fixtures/auto-animate.tsx", workload: "list helper, not a fade" },
] as const;

const rows = [];

for (const fixture of fixtures) {
  const result = await build({
    entryPoints: [fixture.file],
    bundle: true,
    write: false,
    format: "esm",
    platform: "browser",
    minify: true,
    jsx: "automatic",
    external: ["react", "react-dom", "react/jsx-runtime"],
    loader: { ".json": "json" },
    alias: { "@": "./src" },
  });
  const bytes = result.outputFiles[0].contents;
  rows.push({
    library: fixture.library,
    raw: bytes.byteLength,
    gzip: gzipSync(bytes).byteLength,
    workload: fixture.workload,
  });
}

const measuredAt = new Date().toISOString();
const source = `import type { LibraryId } from "@/types/animation";

export interface BundleRow {
  library: LibraryId;
  raw: number;
  gzip: number;
  workload: string;
}

export const bundleData: BundleRow[] = ${JSON.stringify(rows, null, 2)};

export const measuredAt: string = ${JSON.stringify(measuredAt)};
`;

writeFileSync("src/features/benchmarking/bundle-data.ts", source);
console.log(rows);
