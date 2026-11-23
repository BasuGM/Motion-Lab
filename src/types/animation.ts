export const libraryIds = [
  "motion",
  "gsap",
  "react-spring",
  "lottie",
  "auto-animate",
] as const;

export type LibraryId = (typeof libraryIds)[number];

export const scenarioCategories = ["playground", "component", "advanced"] as const;

export type ScenarioCategory = (typeof scenarioCategories)[number];

export const controlGroups = ["time", "transform", "spring", "lottie", "list"] as const;

export type ControlGroup = (typeof controlGroups)[number];

export const easeNames = ["linear", "easeIn", "easeOut", "easeInOut", "circOut"] as const;

export type EaseName = (typeof easeNames)[number];

export const directions = ["normal", "reverse", "alternate"] as const;

export type PlaybackDirection = (typeof directions)[number];

export type Complexity = "low" | "moderate" | "high";

export interface AnimationConfig {
  duration: number;
  delay: number;
  ease: EaseName;
  repeat: number;
  direction: PlaybackDirection;
  speed: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  stiffness: number;
  damping: number;
  mass: number;
  loop: boolean;
}

export const defaultConfig: AnimationConfig = {
  duration: 0.7,
  delay: 0,
  ease: "easeOut",
  repeat: -1,
  direction: "alternate",
  speed: 1,
  x: 84,
  y: 0,
  scale: 1.18,
  rotate: 16,
  stiffness: 180,
  damping: 16,
  mass: 1,
  loop: true,
};

export interface DemoProps {
  config: AnimationConfig;
  playing: boolean;
  playToken: number;
  reducedMotion: boolean;
}

export interface Exclusion {
  reason: string;
  href: string;
  label: string;
}

export interface LibraryProfile {
  id: LibraryId;
  name: string;
  packageName: string;
  purpose: string;
  install: string;
  strengths: string[];
  limits: string[];
  browserNotes: string;
  integrationNotes: string;
  controls: ControlGroup[];
  entry: string;
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  brief: string;
  category: ScenarioCategory;
  supportedLibraries: LibraryId[];
  controls: ControlGroup[];
  comparable: boolean;
  compare: LibraryId[];
  exclusion?: Partial<Record<LibraryId, Exclusion>>;
}

export interface SnippetRecord {
  code: string;
  lines: number;
  complexity: Complexity;
  note: string;
}
