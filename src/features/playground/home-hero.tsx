"use client";

import { useState } from "react";
import { DemoStage } from "@/components/animation/demo-stage";
import { ActionLink } from "@/components/shared/actions";
import { Pip } from "@/components/shared/pip";
import { libraries } from "@/animations/libraries";
import { scenarioHref, scenarios } from "@/animations/scenarios";
import type { LibraryId } from "@/types/animation";
import { cn } from "cn";

export function HomeHero() {
  const [library, setLibrary] = useState<LibraryId>("motion");
  const scenario = library === "auto-animate" ? "list" : library === "lottie" ? "playback" : library === "react-spring" ? "fade" : "fade";

  return (
    <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">React animation bench</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">Motion, measured.</h1>
        <p className="mt-5 max-w-[38ch] text-[17px] leading-relaxed text-foreground/80">
          The same interaction, built with Motion, GSAP, React Spring, Lottie, and AutoAnimate. Compare the API before you pick one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ActionLink href="/compare/fade">Compare fade</ActionLink>
          <ActionLink href="/playground/motion/fade" tone="quiet">
            Open playground
          </ActionLink>
        </div>
      </div>
      <div>
        <DemoStage library={library} scenario={scenario} />
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Preview library">
          {libraries.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLibrary(item.id)}
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
      </div>
      <span className="sr-only">{scenarioHref(scenarios[0])}</span>
    </section>
  );
}
