export interface Article {
  slug: string;
  title: string;
  lede: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
}

export const articles: Article[] = [
  {
    slug: "overview",
    title: "How to use this bench",
    lede: "MotionLab compares five React animation libraries without pretending they share one API.",
    sections: [
      {
        heading: "Two kinds of demo",
        paragraphs: [
          "Comparable scenarios use the same brief: a fade, a slide, a list, a modal. Read them side by side when you are choosing a default for product UI.",
          "Signature demos stay with the library that is actually good at the job. Lottie plays a file. GSAP runs a timeline. AutoAnimate never grows a playhead.",
        ],
      },
      {
        heading: "What the numbers mean",
        paragraphs: [
          "Line counts are the curated snippet on the page, counted by splitting that snippet. They are a reading aid, not a scientific complexity score.",
          "Bundle figures come from an esbuild fixture of one fade (or the closest honest import). Runtime frames are sampled in your browser, on your machine, for that session.",
        ],
      },
    ],
  },
  {
    slug: "motion",
    title: "Motion",
    lede: "Declarative gestures, layout, and presence. Import from motion/react.",
    sections: [
      {
        heading: "Install",
        paragraphs: ["pnpm add motion", "Keep the animated tree in a client component. The import path is motion/react, not framer-motion."],
      },
      {
        heading: "Where it fits",
        paragraphs: [
          "Hover, press, drag, shared layout, and enter/exit are short to write because the props sit on the element.",
          "A long cinematic sequence with labels is easier to read as a GSAP timeline. Use Motion for the interface, not for a sixty-second film.",
        ],
      },
      {
        heading: "React practice",
        paragraphs: [
          "AnimatePresence is required for exit animations. Keys must be stable.",
          "layout and layoutId measure the DOM. Do not put them on a list of hundreds of rows without checking the cost.",
        ],
      },
    ],
  },
  {
    slug: "gsap",
    title: "GSAP",
    lede: "Timelines, scroll, SVG, and Flip. The imperative library in a React tree.",
    sections: [
      {
        heading: "Install",
        paragraphs: [
          "pnpm add gsap @gsap/react",
          "Plugins including ScrollTrigger, Flip, Draggable, DrawSVG, and SplitText ship in the public package. Register each one you use.",
        ],
      },
      {
        heading: "Where it fits",
        paragraphs: [
          "Sequences with overlaps, scroll-scrubbed scenes, and stroke drawing. The timeline is the reason to pick it.",
          "A button hover is less code in Motion. Do not reach for a timeline to scale a button by three percent.",
        ],
      },
      {
        heading: "React practice",
        paragraphs: [
          "Create tweens in useGSAP, scoped to a ref, so they revert on unmount. Do not call gsap in render.",
          "The standard license allows this coded bench. It is not a general visual animation builder.",
        ],
      },
    ],
  },
  {
    slug: "react-spring",
    title: "React Spring",
    lede: "Springs you can interrupt. Pointer follow, trails, and transitions.",
    sections: [
      {
        heading: "Install",
        paragraphs: ["pnpm add @react-spring/web", "Render with animated.div, or animated(Component). Start updates through the spring ref."],
      },
      {
        heading: "Where it fits",
        paragraphs: [
          "The target moves before the last animation finished: a pointer, a drag release, a value that chases input.",
          "Duration and easing are the wrong first question. Stiffness, damping, and mass are the API.",
        ],
      },
      {
        heading: "React practice",
        paragraphs: [
          "useTransition needs stable keys. useTrail is the stagger. Do not rebuild the spring on every pointer event; call api.start.",
        ],
      },
    ],
  },
  {
    slug: "lottie",
    title: "Lottie",
    lede: "Play a JSON file a designer already finished.",
    sections: [
      {
        heading: "Install",
        paragraphs: ["pnpm add lottie-react", "Commit the JSON. This bench uses original clips in src/animations/lottie/assets, not third-party artwork."],
      },
      {
        heading: "Where it fits",
        paragraphs: [
          "Loaders, success states, and illustrations whose motion was authored in After Effects or a similar tool.",
          "It will not grow a drag interaction because you passed x. Speed, direction, and loop are the runtime controls.",
        ],
      },
      {
        heading: "Performance",
        paragraphs: [
          "Playback walks the shape tree on the JavaScript thread. A small loader is cheap. A hero full of masks is not.",
        ],
      },
    ],
  },
  {
    slug: "auto-animate",
    title: "AutoAnimate",
    lede: "One ref. Children animate when they are added, removed, or reordered.",
    sections: [
      {
        heading: "Install",
        paragraphs: ["pnpm add @formkit/auto-animate", "useAutoAnimate from @formkit/auto-animate/react. Attach the ref to the parent whose children change."],
      },
      {
        heading: "Where it fits",
        paragraphs: [
          "Lists, form rows, and accordions where the motion is 'something appeared'.",
          "There is no timeline, no path, and no spring. If you need a playhead, this is the wrong library.",
        ],
      },
      {
        heading: "React practice",
        paragraphs: ["Keys still matter. The library animates DOM changes it can see. Reduced motion and missing Web Animations support should leave the UI usable, which this bench does."],
      },
    ],
  },
  {
    slug: "choosing",
    title: "Choosing a library",
    lede: "Pick from the interaction, not from a bundle-size leaderboard.",
    sections: [
      {
        heading: "A short rule",
        paragraphs: [
          "Interface gestures and layout: Motion. Physics that must be interrupted: React Spring. Scroll, SVG, and sequences: GSAP. A file from design: Lottie. Add and remove: AutoAnimate.",
          "Most products need one primary library and, sometimes, Lottie for illustrations. Two timeline libraries in one app is a tax.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Do not wrap all five in a shared animate() helper. The comparison becomes a lie, and the helper becomes the thing you maintain.",
          "Do not treat a session FPS number as a purchase decision. Read the method on the benchmarks page.",
        ],
      },
    ],
  },
  {
    slug: "performance",
    title: "Performance",
    lede: "What this bench measures, and what it refuses to claim.",
    sections: [
      {
        heading: "Bundle",
        paragraphs: [
          "pnpm bench:size bundles one fixture per library with esbuild, externals React, and records raw and gzip bytes.",
          "AutoAnimate’s fixture is the list helper, not a fake fade. Lottie’s fixture includes the player and one JSON clip.",
        ],
      },
      {
        heading: "Runtime",
        paragraphs: [
          "The benchmarks page mounts fifty opacity and transform animations, samples requestAnimationFrame for two seconds, and counts long tasks when the browser exposes them.",
          "Memory appears only when performance.memory exists, which is Chromium and non-standard. The result is this machine, this browser, this session.",
        ],
      },
    ],
  },
  {
    slug: "react",
    title: "React integration",
    lede: "Client components, effects, and reduced motion.",
    sections: [
      {
        heading: "Where animation runs",
        paragraphs: [
          "Demos are client components. Tweens start in effects or in library hooks, never during render.",
          "Routes load one library module at a time. The home page does not import GSAP, Spring, Lottie, and AutoAnimate up front.",
        ],
      },
      {
        heading: "Accessibility",
        paragraphs: [
          "The header switches light, dark, and system. Reduced motion is the operating system's motion setting, not the theme.",
          "prefers-reduced-motion is read in the stage and passed into every demo. The header shows when the setting is on.",
          "Transport controls are buttons with names. Space and R work when the stage itself is focused, so they do not steal keys from the inspector.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
