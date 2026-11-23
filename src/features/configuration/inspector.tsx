"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { getLibrary } from "@/animations/libraries";
import { getScenario } from "@/animations/scenarios";
import { schemaFor } from "@/features/configuration/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useStudioStore } from "@/stores/studio-store";
import { directions, easeNames, type AnimationConfig, type ControlGroup, type LibraryId } from "@/types/animation";

const fieldsByGroup: Record<ControlGroup, Array<keyof AnimationConfig>> = {
  time: ["duration", "delay", "ease", "repeat", "direction", "speed"],
  transform: ["x", "y", "scale", "rotate"],
  spring: ["stiffness", "damping", "mass"],
  lottie: ["speed", "direction", "loop"],
  list: ["duration", "ease"],
};

const ranges: Partial<Record<keyof AnimationConfig, { min: number; max: number; step: number }>> = {
  duration: { min: 0.05, max: 5, step: 0.05 },
  delay: { min: 0, max: 2, step: 0.05 },
  repeat: { min: -1, max: 12, step: 1 },
  speed: { min: 0.25, max: 3, step: 0.05 },
  x: { min: -160, max: 160, step: 1 },
  y: { min: -120, max: 120, step: 1 },
  scale: { min: 0.5, max: 2, step: 0.01 },
  rotate: { min: -180, max: 180, step: 1 },
  stiffness: { min: 1, max: 500, step: 1 },
  damping: { min: 1, max: 80, step: 1 },
  mass: { min: 0.1, max: 10, step: 0.1 },
};

function fieldsFor(library: LibraryId, scenarioId: string): Array<keyof AnimationConfig> {
  const scenario = getScenario(scenarioId);
  const profile = getLibrary(library);
  if (!scenario) return [];
  const groups = profile.controls.filter((group) => scenario.controls.includes(group));
  const fields: Array<keyof AnimationConfig> = [];
  for (const group of groups) {
    for (const field of fieldsByGroup[group]) {
      if (!fields.includes(field)) fields.push(field);
    }
  }
  return fields;
}

export function Inspector() {
  const library = useStudioStore((state) => state.library);
  const scenario = useStudioStore((state) => state.scenario);
  const config = useStudioStore((state) => state.config);
  const patch = useStudioStore((state) => state.patch);
  const fields = fieldsFor(library, scenario);
  const schema = schemaFor(library);
  const form = useForm<Partial<AnimationConfig>>({
    resolver: zodResolver(schema) as unknown as Resolver<Partial<AnimationConfig>>,
    defaultValues: config,
  });

  useEffect(() => {
    form.reset(useStudioStore.getState().config);
  }, [library, scenario, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const parsed = schema.safeParse(values);
      if (parsed.success) patch(parsed.data);
    });
    return () => subscription.unsubscribe();
  }, [form, schema, patch]);

  const hint =
    library === "auto-animate"
      ? "No playhead. Add, remove, or reorder the list. Duration and easing are the whole API."
      : library === "lottie"
        ? "Speed, direction, and loop change playback. The drawing stays in the file."
        : library === "react-spring" || library === "motion"
          ? "Stiffness, damping, and mass drive the spring. Duration still sets the clock for comparison."
          : "Duration, easing, and repeat are the GSAP clock.";

  return (
    <aside className="border border-border p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Inspector</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/70">{hint}</p>
      <form className="mt-6 space-y-5">
        {fields.map((field) => {
          const value = config[field];
          if (field === "ease") {
            return (
              <label key={field} className="block text-sm">
                <span className="mb-2 block text-foreground/70">Easing</span>
                <Select value={String(value)} onValueChange={(next) => next && form.setValue("ease", next as AnimationConfig["ease"], { shouldValidate: true })}>
                  <SelectTrigger className="w-full rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {easeNames.map((ease) => (
                      <SelectItem key={ease} value={ease}>
                        {ease}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            );
          }
          if (field === "direction") {
            return (
              <label key={field} className="block text-sm">
                <span className="mb-2 block text-foreground/70">Direction</span>
                <Select value={String(value)} onValueChange={(next) => next && form.setValue("direction", next as AnimationConfig["direction"], { shouldValidate: true })}>
                  <SelectTrigger className="w-full rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {directions.map((direction) => (
                      <SelectItem key={direction} value={direction}>
                        {direction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            );
          }
          if (field === "loop") {
            return (
              <label key={field} className="flex items-center justify-between text-sm">
                <span>Loop</span>
                <input
                  type="checkbox"
                  checked={Boolean(value)}
                  onChange={(event) => form.setValue("loop", event.target.checked, { shouldValidate: true })}
                  className="size-4 accent-[oklch(0.72_0.17_55)]"
                />
              </label>
            );
          }
          const range = ranges[field];
          if (!range || typeof value !== "number") return null;
          return (
            <label key={field} className="block">
              <span className="mb-2 flex items-center justify-between text-sm">
                <span className="capitalize text-foreground/70">{field}</span>
                <span className="font-mono text-[12px] tabular-nums">{value}</span>
              </span>
              <Slider
                aria-label={field}
                min={range.min}
                max={range.max}
                step={range.step}
                value={[value]}
                onValueChange={(next) => {
                  form.setValue(field, next[0] as never, { shouldValidate: true });
                }}
              />
            </label>
          );
        })}
      </form>
    </aside>
  );
}
