import type { LibraryId, ScenarioDefinition } from "@/types/animation";

const lottieSkip = {
  lottie: {
    reason: "Lottie plays a finished file. It does not react to children entering, leaving, or expanding.",
    href: "/advanced/playback",
    label: "Play the Lottie clips",
  },
} as const;

const autoSkip = {
  "auto-animate": {
    reason: "AutoAnimate moves elements when the DOM changes. It does not tween one box on a playhead.",
    href: "/playground/auto-animate/list",
    label: "Watch the list transition",
  },
} as const;

export const scenarios: ScenarioDefinition[] = [
  {
    id: "fade",
    title: "Fade",
    brief: "Opacity from a whisper to solid, then back.",
    category: "playground",
    supportedLibraries: ["motion", "gsap", "react-spring", "lottie"],
    controls: ["time", "spring", "lottie"],
    comparable: true,
    compare: ["motion", "gsap", "react-spring"],
    exclusion: autoSkip,
  },
  {
    id: "slide",
    title: "Slide",
    brief: "A horizontal translate with the same distance in every library.",
    category: "playground",
    supportedLibraries: ["motion", "gsap", "react-spring", "lottie"],
    controls: ["time", "transform", "spring", "lottie"],
    comparable: true,
    compare: ["motion", "gsap", "react-spring"],
    exclusion: autoSkip,
  },
  {
    id: "pop",
    title: "Pop",
    brief: "Scale and rotate together, then settle.",
    category: "playground",
    supportedLibraries: ["motion", "gsap", "react-spring", "lottie"],
    controls: ["time", "transform", "spring", "lottie"],
    comparable: true,
    compare: ["motion", "gsap", "react-spring"],
    exclusion: autoSkip,
  },
  {
    id: "stagger",
    title: "Stagger",
    brief: "Five marks arrive in sequence.",
    category: "playground",
    supportedLibraries: ["motion", "gsap", "react-spring", "lottie"],
    controls: ["time", "spring", "lottie"],
    comparable: true,
    compare: ["motion", "gsap", "react-spring"],
    exclusion: autoSkip,
  },
  {
    id: "list",
    title: "List",
    brief: "Add, remove, and reorder rows.",
    category: "playground",
    supportedLibraries: ["auto-animate", "motion", "react-spring", "gsap"],
    controls: ["list", "time", "spring"],
    comparable: true,
    compare: ["auto-animate", "motion", "gsap"],
    exclusion: lottieSkip,
  },
  {
    id: "modal",
    title: "Modal",
    brief: "A panel that enters and leaves.",
    category: "playground",
    supportedLibraries: ["motion", "gsap", "react-spring", "auto-animate"],
    controls: ["time", "spring", "list"],
    comparable: true,
    compare: ["motion", "gsap", "react-spring"],
    exclusion: lottieSkip,
  },
  {
    id: "accordion",
    title: "Accordion",
    brief: "One section opens and closes.",
    category: "playground",
    supportedLibraries: ["motion", "gsap", "react-spring", "auto-animate"],
    controls: ["time", "spring", "list"],
    comparable: true,
    compare: ["motion", "auto-animate", "gsap"],
    exclusion: lottieSkip,
  },
  {
    id: "ui-button",
    title: "Button",
    brief: "Hover and press on a primary action.",
    category: "component",
    supportedLibraries: ["motion", "react-spring"],
    controls: ["spring", "time"],
    comparable: true,
    compare: ["motion", "react-spring"],
    exclusion: {
      gsap: {
        reason: "GSAP can do this, but the interesting comparison is gesture props versus a spring.",
        href: "/advanced/timeline",
        label: "See a GSAP timeline",
      },
      lottie: lottieSkip.lottie,
      "auto-animate": autoSkip["auto-animate"],
    },
  },
  {
    id: "ui-dropdown",
    title: "Dropdown",
    brief: "A menu that opens under its trigger.",
    category: "component",
    supportedLibraries: ["motion", "gsap"],
    controls: ["time"],
    comparable: true,
    compare: ["motion", "gsap"],
  },
  {
    id: "ui-accordion",
    title: "Accordion",
    brief: "A product accordion with three sections.",
    category: "component",
    supportedLibraries: ["motion", "react-spring", "auto-animate"],
    controls: ["time", "spring", "list"],
    comparable: true,
    compare: ["motion", "auto-animate", "react-spring"],
  },
  {
    id: "ui-tabs",
    title: "Tabs",
    brief: "The active tab and its panel change together.",
    category: "component",
    supportedLibraries: ["motion", "react-spring"],
    controls: ["time", "spring"],
    comparable: true,
    compare: ["motion", "react-spring"],
  },
  {
    id: "ui-toast",
    title: "Toast",
    brief: "A notice that enters from the edge and can be dismissed.",
    category: "component",
    supportedLibraries: ["motion", "gsap"],
    controls: ["time"],
    comparable: true,
    compare: ["motion", "gsap"],
  },
  {
    id: "ui-modal",
    title: "Dialog",
    brief: "A dialog with a dimmed field behind it.",
    category: "component",
    supportedLibraries: ["motion", "gsap", "react-spring"],
    controls: ["time", "spring"],
    comparable: true,
    compare: ["motion", "gsap", "react-spring"],
  },
  {
    id: "ui-sidenav",
    title: "Side navigation",
    brief: "A drawer that pushes in from the left.",
    category: "component",
    supportedLibraries: ["motion", "gsap"],
    controls: ["time"],
    comparable: true,
    compare: ["motion", "gsap"],
  },
  {
    id: "ui-card",
    title: "Expandable card",
    brief: "A card that grows to show a second line of detail.",
    category: "component",
    supportedLibraries: ["motion", "react-spring"],
    controls: ["spring", "time"],
    comparable: true,
    compare: ["motion", "react-spring"],
  },
  {
    id: "ui-gallery",
    title: "Gallery",
    brief: "A shared frame between a thumb and the feature image.",
    category: "component",
    supportedLibraries: ["motion"],
    controls: ["time"],
    comparable: false,
    compare: ["motion"],
    exclusion: {
      gsap: {
        reason: "GSAP Flip can do shared-element moves. This demo is here to show Motion layoutId, which is the smaller API.",
        href: "/playground/gsap/list",
        label: "See GSAP Flip on a list",
      },
    },
  },
  {
    id: "ui-skeleton",
    title: "Skeleton",
    brief: "Placeholder bars that pulse while content is imagined.",
    category: "component",
    supportedLibraries: ["motion", "gsap"],
    controls: ["time"],
    comparable: true,
    compare: ["motion", "gsap"],
  },
  {
    id: "ui-list",
    title: "List transition",
    brief: "A settings list with add, remove, and reorder.",
    category: "component",
    supportedLibraries: ["auto-animate", "motion", "react-spring", "gsap"],
    controls: ["list", "time", "spring"],
    comparable: true,
    compare: ["auto-animate", "motion", "react-spring"],
    exclusion: lottieSkip,
  },
  {
    id: "scroll",
    title: "Scroll",
    brief: "Marks reveal as they enter a scroller.",
    category: "advanced",
    supportedLibraries: ["gsap", "motion"],
    controls: ["time"],
    comparable: true,
    compare: ["gsap", "motion"],
  },
  {
    id: "parallax",
    title: "Parallax",
    brief: "Layers travel at different rates inside one scroller.",
    category: "advanced",
    supportedLibraries: ["gsap", "motion"],
    controls: ["time"],
    comparable: true,
    compare: ["gsap", "motion"],
  },
  {
    id: "timeline",
    title: "Timeline",
    brief: "A labeled sequence: enter, hold, then a second beat.",
    category: "advanced",
    supportedLibraries: ["gsap"],
    controls: ["time"],
    comparable: false,
    compare: ["gsap"],
  },
  {
    id: "text-reveal",
    title: "Text reveal",
    brief: "Words arrive in order.",
    category: "advanced",
    supportedLibraries: ["gsap", "motion"],
    controls: ["time"],
    comparable: true,
    compare: ["gsap", "motion"],
  },
  {
    id: "svg-path",
    title: "SVG path",
    brief: "A stroke draws itself.",
    category: "advanced",
    supportedLibraries: ["gsap"],
    controls: ["time"],
    comparable: false,
    compare: ["gsap"],
  },
  {
    id: "horizontal",
    title: "Horizontal scroll",
    brief: "Panels move sideways as the inner scroller advances.",
    category: "advanced",
    supportedLibraries: ["gsap"],
    controls: ["time"],
    comparable: false,
    compare: ["gsap"],
  },
  {
    id: "landing",
    title: "Landing sequence",
    brief: "Eyebrow, headline, line, and action, in that order.",
    category: "advanced",
    supportedLibraries: ["gsap"],
    controls: ["time"],
    comparable: false,
    compare: ["gsap"],
  },
  {
    id: "pointer",
    title: "Pointer follow",
    brief: "A short trail springs toward the pointer.",
    category: "advanced",
    supportedLibraries: ["react-spring"],
    controls: ["spring"],
    comparable: false,
    compare: ["react-spring"],
  },
  {
    id: "drag",
    title: "Drag",
    brief: "Pull the mark around the stage.",
    category: "advanced",
    supportedLibraries: ["motion", "gsap"],
    controls: ["time"],
    comparable: true,
    compare: ["motion", "gsap"],
  },
  {
    id: "playback",
    title: "Vector playback",
    brief: "Two original clips: a loader and a success mark.",
    category: "advanced",
    supportedLibraries: ["lottie"],
    controls: ["lottie"],
    comparable: false,
    compare: ["lottie"],
  },
];

export function getScenario(id: string): ScenarioDefinition | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}

export function scenariosIn(category: ScenarioDefinition["category"]): ScenarioDefinition[] {
  return scenarios.filter((scenario) => scenario.category === category);
}

export function supports(scenario: ScenarioDefinition, library: LibraryId): boolean {
  return scenario.supportedLibraries.includes(library);
}

export const categoryPath = {
  playground: "/playground",
  component: "/components",
  advanced: "/advanced",
} as const;

export function scenarioHref(scenario: ScenarioDefinition, library?: LibraryId): string {
  if (scenario.category !== "playground") return `${categoryPath[scenario.category]}/${scenario.id}`;
  const chosen = library && supports(scenario, library) ? library : scenario.supportedLibraries[0];
  return `${categoryPath.playground}/${chosen}/${scenario.id}`;
}

export function preferredScenario(library: LibraryId, currentId: string): string {
  const current = getScenario(currentId);
  if (current && supports(current, library)) return current.id;
  const sameCategory = current
    ? scenarios.find((item) => item.category === current.category && supports(item, library))
    : undefined;
  return sameCategory?.id ?? scenarios.find((item) => supports(item, library))?.id ?? currentId;
}
