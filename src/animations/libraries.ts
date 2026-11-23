import type { LibraryId, LibraryProfile } from "@/types/animation";

export const libraries: LibraryProfile[] = [
  {
    id: "motion",
    name: "Motion",
    packageName: "motion",
    purpose: "React gestures, layout, and state transitions.",
    install: "pnpm add motion",
    strengths: [
      "Declarative props that sit next to the markup",
      "Gestures, layout animation, and exit transitions",
      "Small API for everyday UI motion",
    ],
    limits: [
      "Long cinematic timelines get harder to read than GSAP",
      "Scroll choreography is lighter than ScrollTrigger",
    ],
    browserNotes: "Modern evergreen browsers. Transforms and opacity stay on the compositor when possible.",
    integrationNotes: "Import from motion/react. Keep animated components in client files. Prefer layout and gesture props over a hand-rolled timeline.",
    controls: ["time", "transform", "spring"],
    entry: "/playground/motion/fade",
  },
  {
    id: "gsap",
    name: "GSAP",
    packageName: "gsap",
    purpose: "Timelines, scroll, SVG, and coordinated sequences.",
    install: "pnpm add gsap @gsap/react",
    strengths: [
      "Precise timelines and labels",
      "ScrollTrigger, Flip, DrawSVG, and SplitText",
      "Framework-agnostic control of any DOM property",
    ],
    limits: [
      "Imperative tweens need cleanup on unmount",
      "The call site is less React-shaped than Motion or Spring",
    ],
    browserNotes: "Broad support, including older browsers GSAP still tests. Plugins ship in the public package.",
    integrationNotes: "Register plugins once. Use useGSAP with a scope ref so tweens revert when the component unmounts. Do not animate during render.",
    controls: ["time", "transform"],
    entry: "/playground/gsap/fade",
  },
  {
    id: "react-spring",
    name: "React Spring",
    packageName: "@react-spring/web",
    purpose: "Physics-based motion and interruptible gestures.",
    install: "pnpm add @react-spring/web",
    strengths: [
      "Springs that can be interrupted mid-flight",
      "useTrail and useTransition for lists",
      "Values that follow the pointer without a duration guess",
    ],
    limits: [
      "Duration-based easing is a second-class idea",
      "API surface is wider than a single fade needs",
    ],
    browserNotes: "Targets modern browsers through React DOM. Springs run on the JS thread.",
    integrationNotes: "animated.* components replace the host tag. Start and pause through the spring ref, not by rewriting state on every frame.",
    controls: ["time", "transform", "spring"],
    entry: "/advanced/pointer",
  },
  {
    id: "lottie",
    name: "Lottie",
    packageName: "lottie-react",
    purpose: "Playback of authored JSON vector animations.",
    install: "pnpm add lottie-react",
    strengths: [
      "Designer-authored motion stays intact",
      "Playback controls: speed, direction, loop",
      "Vector artwork that scales without a sprite sheet",
    ],
    limits: [
      "You cannot invent a new gesture from props",
      "File weight and JS playback cost sit on the main thread",
    ],
    browserNotes: "Renders via SVG or canvas depending on the renderer. This bench uses the default SVG renderer.",
    integrationNotes: "Keep the JSON local and pass it as src. Drive play, pause, and setSpeed from a ref inside an effect.",
    controls: ["lottie"],
    entry: "/advanced/playback",
  },
  {
    id: "auto-animate",
    name: "AutoAnimate",
    packageName: "@formkit/auto-animate",
    purpose: "Automatic transitions when children are added, removed, or reordered.",
    install: "pnpm add @formkit/auto-animate",
    strengths: [
      "One ref on a parent",
      "Useful for lists, forms, and accordions",
      "Almost no animation code to maintain",
    ],
    limits: [
      "No timelines, paths, or physics",
      "You do not get a playhead",
    ],
    browserNotes: "Uses the Web Animations API. Browsers without it show the DOM change with no transition.",
    integrationNotes: "Attach useAutoAnimate to the element whose children change. Duration and easing are the whole public surface that matters here.",
    controls: ["list"],
    entry: "/playground/auto-animate/list",
  },
];

export function getLibrary(id: LibraryId): LibraryProfile {
  const library = libraries.find((item) => item.id === id);
  if (!library) {
    throw new Error(`Unknown library: ${id}`);
  }
  return library;
}

export function isLibraryId(value: string): value is LibraryId {
  return libraries.some((library) => library.id === value);
}
