import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { bundleData, measuredAt } from "@/features/benchmarking/bundle-data";
import { BundleChart, RuntimeBench } from "@/features/benchmarking/runtime-bench";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { libraries } from "@/animations/libraries";

export const metadata: Metadata = { title: "Benchmarks" };

function formatBytes(bytes: number) {
  if (!bytes) return "—";
  return `${(bytes / 1024).toFixed(1)} kB`;
}

export default function BenchmarksPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Benchmarks"
        title="Size on disk, frames on this machine."
        lede="Bundle numbers are regenerated with pnpm bench:size. Frame numbers appear only after you run them here. Both are labeled with what they leave out."
      />
      <div className="mx-auto max-w-[1200px] px-6 pb-16">
        <Tabs defaultValue="bundle">
          <TabsList>
            <TabsTrigger value="bundle">Bundle</TabsTrigger>
            <TabsTrigger value="runtime">Runtime</TabsTrigger>
          </TabsList>
          <TabsContent value="bundle" className="mt-6">
            <div className="grid gap-3 sm:grid-cols-5">
              {bundleData.map((row) => (
                <div key={row.library} className="border border-border px-3 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {libraries.find((item) => item.id === row.library)?.name}
                  </p>
                  <p className="mt-2 font-serif text-3xl tabular-nums">{formatBytes(row.gzip)}</p>
                  <p className="text-sm text-muted-foreground">gzip · {formatBytes(row.raw)} raw</p>
                  <p className="mt-2 text-xs text-muted-foreground">{row.workload}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border border-border p-4">
              <BundleChart />
            </div>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">Measured {measuredAt}. React is external. This is the fixture, not the whole app.</p>
          </TabsContent>
          <TabsContent value="runtime" className="mt-6">
            <RuntimeBench />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
