"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DemoStage } from "@/components/animation/demo-stage";
import { CodePanel } from "@/components/animation/code-panel";
import { PageHeader } from "@/components/layout/page-header";
import { Pip } from "@/components/shared/pip";
import { libraries } from "@/animations/libraries";
import { categoryPath, getScenario, scenariosIn, supports } from "@/animations/scenarios";
import { getSnippet } from "@/animations/snippets";
import type { LibraryId, ScenarioCategory } from "@/types/animation";
import { cn } from "cn";

const copy: Record<ScenarioCategory, { eyebrow: string; title: string; lede: string }> = {
  playground: {
    eyebrow: "Playground",
    title: "The same brief, different engines.",
    lede: "Fade, slide, stagger, and the interactions that show up in product UI. Unsupported pairs say so.",
  },
  component: {
    eyebrow: "Components",
    title: "Motion inside real controls.",
    lede: "Buttons, menus, dialogs, lists. Each one uses the library that fits, and an alternate when the comparison is honest.",
  },
  advanced: {
    eyebrow: "Advanced",
    title: "The work a library is for.",
    lede: "Scroll, timelines, SVG, and pointer physics. These are not forced into five identical versions.",
  },
};

export function Explorer({
  category,
  initialLibrary,
  scenario,
}: {
  category: ScenarioCategory;
  initialLibrary: LibraryId;
  scenario: string;
}) {
  const router = useRouter();
  const [library, setLibrary] = useState(initialLibrary);
  const [seenScenario, setSeenScenario] = useState(scenario);
  if (seenScenario !== scenario) {
    setSeenScenario(scenario);
    setLibrary(initialLibrary);
  }
  const items = scenariosIn(category);
  const definition = getScenario(scenario);
  const snippet = definition && supports(definition, library) ? getSnippet(scenario, library) : undefined;
  const heading = copy[category];

  function hrefFor(id: string, supported: boolean, fallback: LibraryId) {
    if (category === "playground") {
      return `/playground/${supported ? library : fallback}/${id}`;
    }
    return `${categoryPath[category]}/${id}`;
  }

  function go(nextLibrary: LibraryId, nextScenario: string) {
    if (category === "playground") {
      router.push(`/playground/${nextLibrary}/${nextScenario}`);
      return;
    }
    setLibrary(nextLibrary);
    if (nextScenario !== scenario) router.push(`${categoryPath[category]}/${nextScenario}`);
  }

  return (
    <div>
      <PageHeader eyebrow={heading.eyebrow} title={heading.title} lede={heading.lede} />
      <div className="mx-auto grid min-w-0 max-w-[1200px] gap-8 px-6 pb-16 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Scenarios" className="min-w-0 lg:sticky lg:top-20 lg:self-start">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {items.map((item) => (
              <Link
                key={item.id}
                href={hrefFor(item.id, supports(item, library), item.supportedLibraries[0])}
                className={cn(
                  "shrink-0 border border-border px-3 py-2 text-sm",
                  item.id === scenario && "border-signal-ink text-signal-ink",
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <ul className="hidden lg:block">
            {items.map((item) => {
              const href = hrefFor(item.id, supports(item, library), item.supportedLibraries[0]);
              return (
                <li key={item.id}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-baseline justify-between gap-3 border-b border-border py-3 text-sm text-foreground/75",
                      item.id === scenario && "text-foreground",
                    )}
                  >
                    <span className={item.id === scenario ? "underline decoration-signal-ink decoration-2 underline-offset-4" : undefined}>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="min-w-0">
          {definition ? <p className="mb-4 max-w-[62ch] text-sm text-foreground/70">{definition.brief}</p> : null}
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Library">
            {libraries.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id, scenario)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 border border-border px-3 text-sm",
                  item.id === library && "border-signal-ink",
                )}
              >
                <Pip id={item.id} />
                {item.name}
              </button>
            ))}
          </div>
          <DemoStage
            library={library}
            scenario={scenario}
            onOpenSupported={definition ? () => setLibrary(definition.supportedLibraries[0]) : undefined}
          />
          {snippet ? (
            <div className="mt-4">
              <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{snippet.lines} lines</span>
                <span>{snippet.complexity}</span>
                <span className="normal-case tracking-normal text-foreground/70">{snippet.note}</span>
              </div>
              <div className="hidden lg:block">
                <CodePanel code={snippet.code} />
              </div>
              <details className="lg:hidden">
                <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Implementation</summary>
                <div className="mt-3">
                  <CodePanel code={snippet.code} />
                </div>
              </details>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
