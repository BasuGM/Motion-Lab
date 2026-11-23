"use client";

import Link from "next/link";
import { useState } from "react";
import { DemoStage } from "@/components/animation/demo-stage";
import { CodePanel } from "@/components/animation/code-panel";
import { Pip } from "@/components/shared/pip";
import { libraries } from "@/animations/libraries";
import { getScenario, scenarios, supports } from "@/animations/scenarios";
import { getSnippet } from "@/animations/snippets";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCompareStore } from "@/stores/compare-store";
import type { LibraryId } from "@/types/animation";
import { cn } from "cn";

export function CompareBoard({ scenario }: { scenario: string }) {
  const stored = useCompareStore((state) => state.libraries);
  const setScenario = useCompareStore((state) => state.setScenario);
  const toggle = useCompareStore((state) => state.toggle);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(scenario);
  const definition = getScenario(scenario);
  const comparable = scenarios.filter((item) => item.comparable);
  if (seen !== scenario) {
    setSeen(scenario);
    setActive(0);
    setScenario(scenario);
  }

  if (!definition) return null;
  const visible = stored.slice(0, 3);
  const current = visible[Math.min(active, visible.length - 1)] ?? visible[0];

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Scenario">
          {comparable.map((item) => (
            <Link
              key={item.id}
              href={`/compare/${item.id}`}
              role="tab"
              aria-selected={item.id === scenario}
              className={cn(
                "shrink-0 border border-border px-3 py-2 text-sm",
                item.id === scenario && "border-signal-ink text-signal-ink",
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="h-10 border border-border px-3 text-sm">
              Columns
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Up to three</DropdownMenuLabel>
            {libraries.map((library) => (
              <DropdownMenuCheckboxItem
                key={library.id}
                checked={stored.includes(library.id)}
                onCheckedChange={() => toggle(library.id)}
              >
                {library.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mt-4 max-w-[68ch] text-sm text-foreground/70">{definition.brief}</p>
      <div className="sticky top-14 z-30 mt-4 flex gap-2 bg-background py-2 min-[1100px]:hidden">
        {visible.map((library, index) => (
          <button
            key={library}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "inline-flex h-9 items-center gap-2 border border-border px-3 text-sm",
              current === library && "border-signal-ink",
            )}
          >
            <Pip id={library} />
            {libraries.find((item) => item.id === library)?.name}
          </button>
        ))}
      </div>
      <div className="mt-4 hidden gap-4 min-[1100px]:grid" style={{ gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))` }}>
        {visible.map((library) => (
          <Column key={library} library={library} scenario={scenario} />
        ))}
      </div>
      <div className="mt-2 min-[1100px]:hidden">{current ? <Column library={current} scenario={scenario} /> : null}</div>
    </div>
  );
}

function Column({ library, scenario }: { library: LibraryId; scenario: string }) {
  const definition = getScenario(scenario);
  const snippet = definition && supports(definition, library) ? getSnippet(scenario, library) : undefined;
  const name = libraries.find((item) => item.id === library)?.name ?? library;
  return (
    <article>
      <div className="mb-3 flex items-center gap-2">
        <Pip id={library} />
        <h2 className="text-sm">{name}</h2>
      </div>
      <DemoStage library={library} scenario={scenario} />
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <Fact label="Lines" value={snippet ? String(snippet.lines) : "—"} />
        <Fact label="Complexity" value={snippet?.complexity ?? "—"} />
        <Fact label="Fit" value={snippet ? "Fits" : "Not a fit"} />
        <Fact label="Note" value={snippet?.note ?? definition?.exclusion?.[library]?.reason ?? "Different tool."} />
      </dl>
      {snippet ? (
        <details className="mt-3">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Snippet</summary>
          <div className="mt-3">
            <CodePanel code={snippet.code} />
          </div>
        </details>
      ) : null}
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border px-3 py-2">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground/85">{value}</dd>
    </div>
  );
}
