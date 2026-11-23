"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DemoHost } from "@/components/animation/demo-host";
import { NotAFit } from "@/components/animation/not-a-fit";
import { Stage } from "@/components/animation/stage";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getScenario, scenarioHref, supports } from "@/animations/scenarios";
import { defaultConfig, type AnimationConfig, type LibraryId } from "@/types/animation";

const scrollScenarios = new Set(["scroll", "parallax", "horizontal"]);

export function DemoStage({
  library,
  scenario,
  config = defaultConfig,
  transport,
  onOpenSupported,
}: {
  library: LibraryId;
  scenario: string;
  config?: AnimationConfig;
  onOpenSupported?: () => void;
  transport?: {
    playing: boolean;
    playToken: number;
    onToggle: () => void;
    onReplay: () => void;
    onReset: () => void;
  };
}) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [playToken, setPlayToken] = useState(0);
  const definition = getScenario(scenario);
  const livePlaying = transport?.playing ?? playing;
  const liveToken = transport?.playToken ?? playToken;

  if (!definition) return null;

  const supported = supports(definition, library);
  const exclusion = definition.exclusion?.[library] ?? {
    reason: "This library is the wrong tool for the interaction.",
    href: scenarioHref(definition),
    label: "Open a supported library",
  };

  return (
    <Stage
      library={library}
      title={definition.title}
      frame={definition.category === "advanced" ? "ADV" : "01"}
      scroll={scrollScenarios.has(scenario)}
      playing={livePlaying}
      playToken={liveToken}
      onToggle={transport?.onToggle ?? (() => setPlaying((value) => !value))}
      onReplay={
        transport?.onReplay ??
        (() => {
          setPlaying(true);
          setPlayToken((value) => value + 1);
        })
      }
      onReset={
        transport?.onReset ??
        (() => {
          setPlaying(true);
          setPlayToken((value) => value + 1);
        })
      }
    >
      {supported ? (
        <DemoHost
          library={library}
          scenario={scenario}
          config={config}
          playing={livePlaying}
          playToken={liveToken}
          reducedMotion={reduced}
        />
      ) : (
        <NotAFit exclusion={exclusion} onSamePage={onOpenSupported && exclusion.href === pathname ? onOpenSupported : undefined} />
      )}
    </Stage>
  );
}
