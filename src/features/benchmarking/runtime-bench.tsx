"use client";

import { useEffect, useRef, useState } from "react";
import { animated, useTrail } from "@react-spring/web";
import gsap from "gsap";
import { motion } from "motion/react";
import { ActionButton } from "@/components/shared/actions";
import { bundleData, measuredAt } from "@/features/benchmarking/bundle-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export interface RuntimeSample {
  library: string;
  fps: number;
  dropped: number;
  longTask: number;
}

const chartConfig = {
  gzip: { label: "Gzip bytes", color: "var(--signal)" },
  fps: { label: "Median FPS", color: "var(--pip-gsap)" },
} satisfies ChartConfig;

function sampleFrames(onDone: (sample: Omit<RuntimeSample, "library">) => void) {
  const samples: number[] = [];
  let last = performance.now();
  const start = last;
  let longTask = 0;
  let observer: PerformanceObserver | null = null;
  try {
    observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) longTask += entry.duration;
    });
    observer.observe({ entryTypes: ["longtask"] });
  } catch {
    observer = null;
  }
  let frame = 0;
  const tick = (now: number) => {
    samples.push(now - last);
    last = now;
    if (now - start < 2000) {
      frame = requestAnimationFrame(tick);
      return;
    }
    observer?.disconnect();
    const sorted = [...samples].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)] || 16.7;
    onDone({
      fps: Math.max(1, Math.round(1000 / median)),
      dropped: samples.filter((delta) => delta > 24).length,
      longTask: Math.round(longTask),
    });
  };
  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
    observer?.disconnect();
  };
}

function MotionHerd({ onDone }: { onDone: (sample: Omit<RuntimeSample, "library">) => void }) {
  useEffect(() => sampleFrames(onDone), [onDone]);
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 50 }, (_, index) => (
        <motion.div
          key={index}
          className="h-3 bg-paper-ink"
          animate={{ opacity: [0.35, 1], x: [0, 8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: (index % 10) * 0.02 }}
        />
      ))}
    </div>
  );
}

function GsapHerd({ onDone }: { onDone: (sample: Omit<RuntimeSample, "library">) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => sampleFrames(onDone), [onDone]);
  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current.children, {
      opacity: 0.35,
      x: 8,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      stagger: 0.01,
    });
    return () => {
      tween.kill();
    };
  }, []);
  return (
    <div ref={ref} className="grid grid-cols-10 gap-1">
      {Array.from({ length: 50 }, (_, index) => (
        <div key={index} className="h-3 bg-paper-ink" />
      ))}
    </div>
  );
}

function SpringHerd({ onDone }: { onDone: (sample: Omit<RuntimeSample, "library">) => void }) {
  const trail = useTrail(50, {
    from: { opacity: 0.35, x: 0 },
    to: { opacity: 1, x: 8 },
    loop: { reverse: true },
  });
  useEffect(() => sampleFrames(onDone), [onDone]);
  return (
    <div className="grid grid-cols-10 gap-1">
      {trail.map((style, index) => (
        <animated.div key={index} style={style} className="h-3 bg-paper-ink" />
      ))}
    </div>
  );
}

const order = ["motion", "gsap", "react-spring"] as const;

export function RuntimeBench() {
  const [running, setRunning] = useState<(typeof order)[number] | null>(null);
  const [results, setResults] = useState<RuntimeSample[]>([]);
  const memory = typeof performance !== "undefined" && "memory" in performance
    ? Math.round((performance as Performance & { memory?: { usedJSHeapSize: number } }).memory!.usedJSHeapSize / 1024 / 1024)
    : null;

  function finish(library: (typeof order)[number], sample: Omit<RuntimeSample, "library">) {
    setResults((current) => [...current.filter((item) => item.library !== library), { library, ...sample }]);
    const next = order[order.indexOf(library) + 1];
    setRunning(next ?? null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <ActionButton
          tone="primary"
          disabled={running !== null}
          onClick={() => {
            setResults([]);
            setRunning("motion");
          }}
        >
          {running ? `Running ${running}` : "Run in this browser"}
        </ActionButton>
        <Dialog>
          <DialogTrigger asChild>
            <ActionButton tone="quiet">Method</ActionButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How this run works</DialogTitle>
              <DialogDescription>
                Fifty marks animate opacity and transform for two seconds. Median frame time becomes the FPS figure. Frames slower than 24ms count as dropped. Long tasks are counted when the browser supports the entry type. Lottie and AutoAnimate are left out of this tie because their work is not a transform tween.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {memory !== null ? <span className="font-mono text-[12px] text-muted-foreground">Heap {memory} MB · Chromium only</span> : null}
      </div>
      <p className="mt-3 max-w-[68ch] text-sm text-muted-foreground">
        This is {measuredAt === "not measured" ? "a local session" : "your machine, right now"}. It is not a lab score.
      </p>
      {running === "motion" ? <MotionHerd onDone={(sample) => finish("motion", sample)} /> : null}
      {running === "gsap" ? <GsapHerd onDone={(sample) => finish("gsap", sample)} /> : null}
      {running === "react-spring" ? <SpringHerd onDone={(sample) => finish("react-spring", sample)} /> : null}
      {results.length > 0 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {results.map((result) => (
            <div key={result.library} className="border border-border px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{result.library}</p>
              <p className="mt-2 font-serif text-4xl tabular-nums">{result.fps}</p>
              <p className="text-sm text-muted-foreground">median FPS · {result.dropped} slow frames · {result.longTask}ms long tasks</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function BundleChart() {
  const data = bundleData.map((row) => ({
    name: row.library,
    gzip: row.gzip,
  }));
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="gzip" fill="var(--color-gzip)" radius={0} />
      </BarChart>
    </ChartContainer>
  );
}
