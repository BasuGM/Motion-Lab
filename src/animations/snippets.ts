import type { Complexity, LibraryId, SnippetRecord } from "@/types/animation";

function record(code: string, complexity: Complexity, note: string): SnippetRecord {
  const trimmed = code.trim();
  return {
    code: trimmed,
    lines: trimmed.split("\n").length,
    complexity,
    note,
  };
}

const motionFade = record(
  `import { motion } from "motion/react";

export function Fade({ play }: { play: boolean }) {
  return (
    <motion.div
      animate={{ opacity: play ? 1 : 0.15 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
    />
  );
}`,
  "low",
  "The target lives in JSX. Replay is a prop change, not a timeline handle.",
);

const gsapFade = record(
  `import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Fade({ scope }: { scope: React.RefObject<HTMLDivElement | null> }) {
  useGSAP(() => {
    gsap.fromTo(".mark", { opacity: 0.15 }, { opacity: 1, duration: 0.7, yoyo: true, repeat: -1 });
  }, { scope });
  return <div className="mark" />;
}`,
  "moderate",
  "You own the tween. useGSAP reverts it when the scope unmounts.",
);

const springFade = record(
  `import { animated, useSpring } from "@react-spring/web";

export function Fade() {
  const [styles, api] = useSpring(() => ({ opacity: 1 }));
  api.start({ from: { opacity: 0.15 }, to: { opacity: 1 }, config: { tension: 180, friction: 16 } });
  return <animated.div style={styles} />;
}`,
  "moderate",
  "The spring can be interrupted. Duration is not the primary control.",
);

const lottieFade = record(
  `import { Lottie } from "lottie-react";
import fade from "./fade.json";

export function Fade() {
  return <Lottie src={fade} loop />;
}`,
  "low",
  "The motion is baked into the JSON. Code only plays it.",
);

export const snippets: Record<string, Partial<Record<LibraryId, SnippetRecord>>> = {
  fade: {
    motion: motionFade,
    gsap: gsapFade,
    "react-spring": springFade,
    lottie: lottieFade,
  },
  slide: {
    motion: record(
      `<motion.div animate={{ x: 84 }} transition={{ type: "spring", stiffness: 180, damping: 16 }} />`,
      "low",
      "x is a transform prop. Motion keeps it off layout.",
    ),
    gsap: record(
      `gsap.fromTo(el, { x: 0 }, { x: 84, duration: 0.7, ease: "power2.out", yoyo: true, repeat: -1 });`,
      "low",
      "A single fromTo. The distance matches the other columns.",
    ),
    "react-spring": record(
      `const [styles] = useSpring(() => ({ from: { x: 0 }, to: { x: 84 }, loop: { reverse: true } }));`,
      "moderate",
      "x is a spring value on animated.div.",
    ),
    lottie: record(
      `<Lottie src={slide} loop />`,
      "low",
      "Position keyframes are inside the file, not the React props.",
    ),
  },
  pop: {
    motion: record(
      `<motion.div animate={{ scale: 1.18, rotate: 16 }} transition={{ type: "spring" }} />`,
      "low",
      "Scale and rotate share one transition.",
    ),
    gsap: record(
      `gsap.to(el, { scale: 1.18, rotate: 16, duration: 0.7, yoyo: true, repeat: -1 });`,
      "low",
      "Both properties ride the same tween.",
    ),
    "react-spring": record(
      `useSpring(() => ({ from: { scale: 1, rotate: 0 }, to: { scale: 1.18, rotate: 16 }, loop: { reverse: true } }));`,
      "moderate",
      "One spring drives both channels.",
    ),
    lottie: record(`<Lottie src={pop} loop />`, "low", "Scale and rotation are authored keyframes."),
  },
  stagger: {
    motion: record(
      `variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
<motion.ul animate="show" transition={{ staggerChildren: 0.08 }} />`,
      "low",
      "staggerChildren belongs to the parent variant.",
    ),
    gsap: record(
      `gsap.from(".mark", { opacity: 0, y: 12, stagger: 0.08, duration: 0.5 });`,
      "low",
      "One tween, a stagger value, a selector.",
    ),
    "react-spring": record(
      `useTrail(5, { from: { opacity: 0, y: 12 }, to: { opacity: 1, y: 0 } });`,
      "moderate",
      "useTrail is the stagger primitive. Index order is the delay.",
    ),
    lottie: record(`<Lottie src={stagger} loop />`, "low", "Offsets are keyframe times, not React state."),
  },
  list: {
    "auto-animate": record(
      `const [parent] = useAutoAnimate({ duration: 250 });
<ul ref={parent}>{items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>`,
      "low",
      "The ref is the integration. Add and remove are ordinary state updates.",
    ),
    motion: record(
      `<AnimatePresence>
  {items.map((item) => (
    <motion.li key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
  ))}
</AnimatePresence>`,
      "moderate",
      "Keys, layout, and AnimatePresence are all required for exit.",
    ),
    "react-spring": record(
      `useTransition(items, { keys: (item) => item.id, from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 } });`,
      "high",
      "The transition hook returns a render function. Keys must be stable.",
    ),
    gsap: record(
      `const state = Flip.getState(rows);
setItems(next);
Flip.from(state, { duration: 0.4, ease: "power2.out" });`,
      "high",
      "Flip records geometry before React commits, then animates to the new layout.",
    ),
  },
  modal: {
    motion: record(
      `<AnimatePresence>
  {open && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} />}
</AnimatePresence>`,
      "moderate",
      "Exit only runs inside AnimatePresence.",
    ),
    gsap: record(
      `const tl = gsap.timeline();
tl.from(panel, { y: 12, opacity: 0, duration: 0.35 });`,
      "moderate",
      "Open builds a timeline. Close plays it in reverse.",
    ),
    "react-spring": record(
      `useTransition(open, { from: { opacity: 0, y: 8 }, enter: { opacity: 1, y: 0 }, leave: { opacity: 0, y: 8 } });`,
      "moderate",
      "A boolean is the transition item.",
    ),
    "auto-animate": record(
      `<div ref={parent}>{open ? <div role="dialog">Panel</div> : null}</div>`,
      "low",
      "Mount and unmount are enough. There is no exit timeline to design.",
    ),
  },
  accordion: {
    motion: record(
      `<motion.div animate={{ height: open ? "auto" : 0 }} transition={{ duration: 0.35 }} />`,
      "low",
      "height: auto is a Motion feature. CSS alone cannot tween it cleanly.",
    ),
    gsap: record(
      `gsap.to(body, { height: open ? "auto" : 0, duration: 0.35 });`,
      "moderate",
      "GSAP measures auto height for you.",
    ),
    "react-spring": record(
      `useSpring({ height: open ? "auto" : 0, config: { tension: 180, friction: 18 } });`,
      "moderate",
      "The animated div receives the spring height.",
    ),
    "auto-animate": record(
      `<div ref={parent}>{open ? <p>Body</p> : null}</div>`,
      "low",
      "The body is added or removed. AutoAnimate interpolates the resulting box.",
    ),
  },
  "ui-button": {
    motion: record(
      `<motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>Compare</motion.button>`,
      "low",
      "Hover and press are props. No effect required.",
    ),
    "react-spring": record(
      `const [styles, api] = useSpring(() => ({ scale: 1 }));
<button onPointerDown={() => api.start({ scale: 0.97 })} style={styles} />`,
      "moderate",
      "You wire pointer events to api.start. The spring settles when you release.",
    ),
  },
  "ui-dropdown": {
    motion: record(
      `{open && (
  <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} />
)}`,
      "low",
      "The menu is conditional. Presence handles the leave.",
    ),
    gsap: record(
      `gsap.fromTo(menu, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.2 });`,
      "moderate",
      "Run the tween after the menu mounts.",
    ),
  },
  "ui-accordion": {
    motion: record(
      `<motion.div animate={{ height: open === id ? "auto" : 0 }} />`,
      "low",
      "One piece of state, height follows.",
    ),
    "react-spring": record(
      `useSpring({ height: open ? "auto" : 0 });`,
      "moderate",
      "Same model as the playground accordion, with product copy.",
    ),
    "auto-animate": record(
      `<div ref={parent}>{open ? <div>Body</div> : null}</div>`,
      "low",
      "No height math.",
    ),
  },
  "ui-tabs": {
    motion: record(
      `{active && <motion.span layoutId="tab" className="underline" />}
<AnimatePresence mode="wait">
  <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
</AnimatePresence>`,
      "moderate",
      "layoutId slides the underline. The panel crossfades on its key.",
    ),
    "react-spring": record(
      `useTransition(tab, { from: { opacity: 0 }, enter: { opacity: 1 }, leave: { opacity: 0 } });`,
      "moderate",
      "The underline is a spring width on the active trigger.",
    ),
  },
  "ui-toast": {
    motion: record(
      `<motion.li initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} />`,
      "low",
      "Each toast is a list item with an exit.",
    ),
    gsap: record(
      `gsap.from(toast, { x: 16, opacity: 0, duration: 0.3 });`,
      "moderate",
      "Dismiss plays a short tween, then removes the node from state.",
    ),
  },
  "ui-modal": {
    motion: record(
      `<motion.div className="overlay" animate={{ opacity: 1 }} />
<motion.div role="dialog" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} />`,
      "moderate",
      "Overlay and panel are two elements in one presence.",
    ),
    gsap: record(
      `const tl = gsap.timeline();
tl.to(overlay, { opacity: 1, duration: 0.2 }).from(panel, { y: 10, opacity: 0, duration: 0.3 }, "<");`,
      "moderate",
      "The timeline overlaps the panel with the overlay.",
    ),
    "react-spring": record(
      `useTransition(open, { from: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0 }, leave: { opacity: 0 } });`,
      "moderate",
      "One transition feeds both layers.",
    ),
  },
  "ui-sidenav": {
    motion: record(
      `<motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} />`,
      "low",
      "A translate is enough. The page underneath stays put.",
    ),
    gsap: record(
      `gsap.fromTo(drawer, { xPercent: -100 }, { xPercent: 0, duration: 0.4, ease: "power2.out" });`,
      "moderate",
      "xPercent avoids measuring the drawer width in your code.",
    ),
  },
  "ui-card": {
    motion: record(
      `<motion.article layout onClick={() => setOpen((v) => !v)}>
  {open && <motion.p layout>Detail</motion.p>}
</motion.article>`,
      "moderate",
      "layout measures the card before and after the extra line.",
    ),
    "react-spring": record(
      `useSpring({ height: open ? 148 : 96 });`,
      "moderate",
      "A fixed height pair is simpler than measuring auto.",
    ),
  },
  "ui-gallery": {
    motion: record(
      `<motion.button layoutId={\`frame-\${id}\`} />
<motion.div layoutId={\`frame-\${active}\`} />`,
      "moderate",
      "Shared layoutId moves the frame between thumb and stage.",
    ),
  },
  "ui-skeleton": {
    motion: record(
      `<motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />`,
      "low",
      "A keyframe array loops without a spring.",
    ),
    gsap: record(
      `gsap.to(bar, { opacity: 0.4, duration: 0.7, yoyo: true, repeat: -1 });`,
      "low",
      "yoyo is the pulse.",
    ),
  },
  "ui-list": {
    "auto-animate": record(
      `const [parent] = useAutoAnimate();
<ul ref={parent}>{rows.map((row) => <li key={row.id}>{row.label}</li>)}</ul>`,
      "low",
      "This is the library’s whole job.",
    ),
    motion: record(
      `<motion.li layout key={row.id} exit={{ opacity: 0, height: 0 }} />`,
      "moderate",
      "layout plus exit covers reorder and removal.",
    ),
    "react-spring": record(
      `useTransition(rows, { keys: (row) => row.id, enter: { opacity: 1 }, leave: { opacity: 0 } });`,
      "high",
      "Same hook as the playground list, with richer row markup.",
    ),
    gsap: record(
      `Flip.from(Flip.getState(items), { duration: 0.35 });`,
      "high",
      "Read geometry, commit React, then Flip.from.",
    ),
  },
  scroll: {
    gsap: record(
      `gsap.from(marks, {
  y: 24, opacity: 0, stagger: 0.08,
  scrollTrigger: { trigger: marks[0], scroller, start: "top 80%" },
});`,
      "high",
      "The scroller is the stage, not the window, so the demo stays in frame.",
    ),
    motion: record(
      `<motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ root: scroller, once: true }} />`,
      "low",
      "whileInView replaces a scroll listener.",
    ),
  },
  parallax: {
    gsap: record(
      `gsap.to(back, { y: 40, scrollTrigger: { scroller, scrub: true } });
gsap.to(front, { y: -30, scrollTrigger: { scroller, scrub: true } });`,
      "high",
      "scrub ties progress to scroll position.",
    ),
    motion: record(
      `const { scrollYProgress } = useScroll({ container: scroller });
const y = useTransform(scrollYProgress, [0, 1], [0, -40]);`,
      "moderate",
      "useScroll reads the stage. useTransform maps progress to pixels.",
    ),
  },
  timeline: {
    gsap: record(
      `const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".a", { x: 40 }).to(".b", { scale: 1.2 }, "-=0.2").to(".c", { rotate: 12 });`,
      "moderate",
      "Labels and overlaps are the reason to pick GSAP.",
    ),
  },
  "text-reveal": {
    gsap: record(
      `const split = SplitText.create(line, { type: "words" });
gsap.from(split.words, { y: 16, opacity: 0, stagger: 0.04 });`,
      "moderate",
      "SplitText wraps words. revert() puts the sentence back.",
    ),
    motion: record(
      `{words.map((word, i) => (
  <motion.span key={word} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.04 }} />
))}`,
      "low",
      "Splitting on spaces is enough when you do not need line breaks.",
    ),
  },
  "svg-path": {
    gsap: record(
      `const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
gsap.to(path, { strokeDashoffset: 0, duration: 1.4, repeat: -1, yoyo: true });`,
      "moderate",
      "The dash is the measured length of the path, so the stroke draws from empty to full.",
    ),
  },
  horizontal: {
    gsap: record(
      `gsap.to(track, {
  x: () => -(track.scrollWidth - scroller.clientWidth),
  scrollTrigger: { scroller, scrub: true },
});`,
      "high",
      "The horizontal move is driven by the vertical scroller inside the stage.",
    ),
  },
  landing: {
    gsap: record(
      `const tl = gsap.timeline();
tl.from(".eyebrow", { y: 8, opacity: 0 })
  .from(".headline", { y: 16, opacity: 0 })
  .from(".rule", { scaleX: 0 })
  .from(".action", { opacity: 0 }, "-=0.1");`,
      "moderate",
      "One timeline, four beats, no extra state.",
    ),
  },
  pointer: {
    "react-spring": record(
      `const [trail, api] = useTrail(4, () => ({ x: 0, y: 0 }));
onPointerMove={(event) => api.start({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY })};`,
      "moderate",
      "Four marks share one target. The trail is the stagger between them.",
    ),
  },
  drag: {
    motion: record(
      `<motion.div drag dragConstraints={bounds} dragElastic={0.15} />`,
      "low",
      "drag and dragConstraints are the whole feature.",
    ),
    gsap: record(
      `Draggable.create(mark, { bounds: stage, inertia: false });`,
      "moderate",
      "Draggable is a plugin. Kill the instance on cleanup.",
    ),
  },
  playback: {
    lottie: record(
      `const ref = useRef<LottieHandle>(null);
ref.current?.setSpeed(speed);
ref.current?.play();
<Lottie lottieRef={ref} src={clip} loop={loop} autoplay={false} />`,
      "low",
      "Speed and direction hit the player. The drawing does not change.",
    ),
  },
};

export function getSnippet(scenario: string, library: LibraryId): SnippetRecord | undefined {
  return snippets[scenario]?.[library];
}
