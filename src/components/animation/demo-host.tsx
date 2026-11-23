"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { DemoProps, LibraryId } from "@/types/animation";

type LibraryModule = { demos: Partial<Record<string, ComponentType<DemoProps>>> };

const loaders: Record<LibraryId, () => Promise<LibraryModule>> = {
  motion: () => import("@/animations/motion/demos"),
  gsap: () => import("@/animations/gsap/demos"),
  "react-spring": () => import("@/animations/react-spring/demos"),
  lottie: () => import("@/animations/lottie/demos"),
  "auto-animate": () => import("@/animations/auto-animate/demos"),
};

export function DemoHost({
  library,
  scenario,
  ...props
}: DemoProps & { library: LibraryId; scenario: string }) {
  const [Comp, setComp] = useState<ComponentType<DemoProps> | null>(null);

  useEffect(() => {
    let cancel = false;
    void loaders[library]().then((mod) => {
      if (!cancel) setComp(() => mod.demos[scenario] ?? null);
    });
    return () => {
      cancel = true;
    };
  }, [library, scenario]);

  if (!Comp) {
    return <p className="font-mono text-[11px] tracking-[0.16em] text-paper-muted">LOADING</p>;
  }

  return <Comp key={props.playToken} {...props} />;
}
