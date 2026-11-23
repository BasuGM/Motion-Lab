"use client";

import { create } from "zustand";
import { getScenario } from "@/animations/scenarios";
import type { LibraryId } from "@/types/animation";

interface CompareState {
  libraries: LibraryId[];
  setScenario: (scenario: string) => void;
  toggle: (library: LibraryId) => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  libraries: ["motion", "gsap", "react-spring"],
  setScenario: (scenario) => {
    const definition = getScenario(scenario);
    set({ libraries: definition?.compare ?? ["motion", "gsap"] });
  },
  toggle: (library) =>
    set((state) => {
      const has = state.libraries.includes(library);
      if (has && state.libraries.length === 1) return state;
      const next = has ? state.libraries.filter((item) => item !== library) : [...state.libraries, library].slice(0, 3);
      return { libraries: next };
    }),
}));
