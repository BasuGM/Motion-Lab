"use client";

import { DemoStage } from "@/components/animation/demo-stage";
import { Inspector } from "@/features/configuration/inspector";
import { Pip } from "@/components/shared/pip";
import { libraries } from "@/animations/libraries";
import { scenarios, supports } from "@/animations/scenarios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStudioStore } from "@/stores/studio-store";

export function StudioScreen() {
  const library = useStudioStore((state) => state.library);
  const scenario = useStudioStore((state) => state.scenario);
  const config = useStudioStore((state) => state.config);
  const playing = useStudioStore((state) => state.playing);
  const playToken = useStudioStore((state) => state.playToken);
  const setLibrary = useStudioStore((state) => state.setLibrary);
  const setScenario = useStudioStore((state) => state.setScenario);
  const toggle = useStudioStore((state) => state.toggle);
  const replay = useStudioStore((state) => state.replay);
  const reset = useStudioStore((state) => state.reset);

  return (
    <div className="mx-auto grid max-w-[1200px] gap-6 px-6 pb-16 min-[900px]:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        <div className="mb-4 flex flex-wrap gap-3">
          <Select value={library} onValueChange={(value) => value && setLibrary(value as typeof library)}>
            <SelectTrigger className="w-44 rounded-none" aria-label="Library">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {libraries.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <span className="inline-flex items-center gap-2">
                    <Pip id={item.id} />
                    {item.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={scenario} onValueChange={(value) => value && setScenario(value)}>
            <SelectTrigger className="w-52 rounded-none" aria-label="Scenario">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {scenarios.filter((item) => supports(item, library)).map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DemoStage
          library={library}
          scenario={scenario}
          config={config}
          transport={{ playing, playToken, onToggle: toggle, onReplay: replay, onReset: reset }}
        />
      </div>
      <Inspector />
    </div>
  );
}
