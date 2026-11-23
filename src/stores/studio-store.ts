"use client";

import { create } from "zustand";
import { preferredScenario } from "@/animations/scenarios";
import { defaultConfig, type AnimationConfig, type LibraryId } from "@/types/animation";

interface StudioState {
  library: LibraryId;
  scenario: string;
  config: AnimationConfig;
  playing: boolean;
  playToken: number;
  setLibrary: (library: LibraryId) => void;
  setScenario: (scenario: string) => void;
  patch: (partial: Partial<AnimationConfig>) => void;
  toggle: () => void;
  replay: () => void;
  reset: () => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  library: "motion",
  scenario: "fade",
  config: defaultConfig,
  playing: true,
  playToken: 0,
  setLibrary: (library) =>
    set({
      library,
      scenario: preferredScenario(library, get().scenario),
      playing: true,
      playToken: get().playToken + 1,
    }),
  setScenario: (scenario) => set({ scenario, playing: true, playToken: get().playToken + 1 }),
  patch: (partial) => set({ config: { ...get().config, ...partial } }),
  toggle: () => set({ playing: !get().playing }),
  replay: () => set({ playing: true, playToken: get().playToken + 1 }),
  reset: () => set({ config: defaultConfig, playing: true, playToken: get().playToken + 1 }),
}));
