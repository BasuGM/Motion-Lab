"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import FadeMotion, { MarkMotion, motionTransition } from "@/animations/motion/fade";
import { useDemoList } from "@/animations/use-demo-list";
import { useEntrance } from "@/animations/use-entrance";
import { PaperButton } from "@/components/animation/specimen";
import type { DemoProps } from "@/types/animation";

const slideFrom = { x: 0 };
const popFrom = { scale: 1, rotate: 0 };

export function SlideMotion(props: DemoProps) {
  return <MarkMotion {...props} from={slideFrom} to={{ x: props.config.x }} />;
}

export function PopMotion(props: DemoProps) {
  return <MarkMotion {...props} from={popFrom} to={{ scale: props.config.scale, rotate: props.config.rotate }} />;
}

export function StaggerMotion({ config, playing, playToken, reducedMotion }: DemoProps) {
  const marks = ["01", "02", "03", "04", "05"];
  return (
    <div className="flex gap-3">
      {marks.map((mark, index) => (
        <motion.div
          key={`${playToken}-${mark}`}
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 14 }}
          animate={playing || reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={reducedMotion ? { duration: 0 } : { ...motionTransition(config), delay: config.delay + index * 0.08 }}
          className="grid size-12 place-items-center bg-paper-ink text-paper"
        >
          <span className="font-mono text-[10px]">{mark}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ListBody({ props, rich = false }: { props: DemoProps; rich?: boolean }) {
  const { items, add, remove, shuffle } = useDemoList();
  return (
    <div className="w-full max-w-sm">
      <div className="mb-3 flex flex-wrap gap-2">
        <PaperButton onClick={add}>Add</PaperButton>
        <PaperButton onClick={remove}>Remove</PaperButton>
        <PaperButton onClick={shuffle}>Reorder</PaperButton>
      </div>
      <ul className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={motionTransition(props.config)}
              className="flex items-center justify-between border border-hairline px-3 py-2"
            >
              <span>{rich ? item.label : item.label}</span>
              <span className="font-mono text-[11px] text-paper-muted">{rich ? item.meta : item.id}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export function ListMotion(props: DemoProps) {
  return <ListBody props={props} />;
}

export function UiListMotion(props: DemoProps) {
  return <ListBody props={props} rich />;
}

export function ModalMotion({ reducedMotion, config, playToken }: DemoProps) {
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <PaperButton onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Open"}</PaperButton>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Sample panel"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={motionTransition({ ...config, repeat: 0 })}
            className="w-full border border-hairline bg-paper px-4 py-5"
          >
            <p className="font-serif text-2xl">Panel</p>
            <p className="mt-2 text-sm text-paper-muted">Enter and leave with the same component.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function AccordionMotion({ config, reducedMotion, playToken }: DemoProps) {
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  return (
    <div className="w-full max-w-sm border border-hairline">
      <button type="button" className="flex w-full items-center justify-between px-3 py-3 text-left" onClick={() => setOpen((value) => !value)}>
        <span>Duration</span>
        <span className="font-mono text-[11px] text-paper-muted">{open ? "Open" : "Shut"}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open || reducedMotion ? 1 : 0 }}
        transition={reducedMotion ? { duration: 0 } : motionTransition({ ...config, repeat: 0 })}
        className="overflow-hidden"
      >
        <p className="px-3 pb-3 text-sm text-paper-muted">Height animates to auto, which CSS transitions will not do.</p>
      </motion.div>
    </div>
  );
}

export function UiButtonMotion() {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="h-11 bg-paper-ink px-5 text-paper"
    >
      Compare fade
    </motion.button>
  );
}

export function UiDropdownMotion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <PaperButton onClick={() => setOpen((value) => !value)}>Library</PaperButton>
      <AnimatePresence>
        {open ? (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 z-10 mt-2 w-44 border border-hairline bg-paper py-1 text-sm"
          >
            {["Motion", "GSAP", "Spring"].map((item) => (
              <li key={item}>
                <button type="button" className="block w-full px-3 py-2 text-left hover:bg-paper-ink/5" onClick={() => setOpen(false)}>
                  {item}
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const sections = [
  ["Time", "Duration, delay, and repeat."],
  ["Spring", "Stiffness, damping, and mass."],
  ["Path", "Leave this to GSAP DrawSVG."],
] as const;

export function UiAccordionMotion({ config, reducedMotion }: DemoProps) {
  const [open, setOpen] = useState(0);
  return (
    <div className="w-full max-w-sm border border-hairline">
      {sections.map(([title, body], index) => (
        <div key={title} className="border-b border-hairline last:border-b-0">
          <button type="button" className="flex w-full justify-between px-3 py-3 text-left" onClick={() => setOpen(index)}>
            {title}
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === index ? "auto" : 0 }}
            transition={reducedMotion ? { duration: 0 } : motionTransition({ ...config, repeat: 0 })}
            className="overflow-hidden"
          >
            <p className="px-3 pb-3 text-sm text-paper-muted">{body}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

const tabs = ["Bench", "API", "Fit"] as const;
const tabCopy = {
  Bench: "Measure a fade, not a feeling.",
  API: "Props sit next to the markup.",
  Fit: "Gestures and layout, not long films.",
};

export function UiTabsMotion() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Bench");
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-4 border-b border-hairline">
        {tabs.map((item) => (
          <button key={item} type="button" className="relative px-1 py-2 text-sm" onClick={() => setTab(item)}>
            {item}
            {tab === item ? <motion.span layoutId="tab-rule" className="absolute right-0 -bottom-px left-0 h-0.5 bg-paper-ink" /> : null}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-4 text-sm">
          {tabCopy[tab]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function UiToastMotion() {
  const [toasts, setToasts] = useState<string[]>([]);
  return (
    <div className="flex w-full max-w-sm flex-col items-end gap-2">
      <PaperButton
        onClick={() => setToasts((current) => [`Saved ${current.length + 1}`, ...current].slice(0, 3))}
      >
        Notify
      </PaperButton>
      <ul className="flex w-full flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.li
              key={toast}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              className="flex items-center justify-between border border-hairline px-3 py-2 text-sm"
            >
              {toast}
              <button type="button" className="font-mono text-[11px]" onClick={() => setToasts((current) => current.filter((item) => item !== toast))}>
                Close
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export function UiModalMotion(props: DemoProps) {
  return <ModalMotion {...props} />;
}

export function UiSidenavMotion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-48 w-full overflow-hidden border border-hairline">
      <PaperButton onClick={() => setOpen(true)}>Open drawer</PaperButton>
      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 w-48 border-r border-hairline bg-paper p-4"
          >
            <p className="font-serif text-2xl">Nav</p>
            <button type="button" className="mt-4 text-sm underline" onClick={() => setOpen(false)}>
              Close
            </button>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function UiCardMotion() {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout onClick={() => setOpen((value) => !value)} className="w-full max-w-xs cursor-pointer border border-hairline p-4">
      <motion.h3 layout className="font-serif text-2xl">
        Specimen
      </motion.h3>
      {open ? (
        <motion.p layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-paper-muted">
          The card grows because layout measured both states.
        </motion.p>
      ) : null}
    </motion.article>
  );
}

const frames = [
  { id: "a", label: "Ink", className: "bg-paper-ink" },
  { id: "b", label: "Signal", className: "bg-[oklch(0.72_0.17_55)]" },
  { id: "c", label: "Field", className: "bg-[oklch(0.78_0.04_90)]" },
];

export function UiGalleryMotion() {
  const [active, setActive] = useState(frames[0]);
  return (
    <div className="w-full max-w-sm">
      <motion.div layoutId={`frame-${active.id}`} className={`grid h-40 place-items-center text-paper ${active.className}`}>
        <span className="font-serif text-3xl">{active.label}</span>
      </motion.div>
      <div className="mt-3 flex gap-2">
        {frames.map((frame) => (
          <button key={frame.id} type="button" onClick={() => setActive(frame)} className="relative h-12 flex-1">
            {active.id === frame.id ? null : (
              <motion.span layoutId={`frame-${frame.id}`} className={`absolute inset-0 ${frame.className}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function UiSkeletonMotion({ reducedMotion }: DemoProps) {
  return (
    <div className="w-full max-w-sm space-y-3">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          animate={reducedMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.3, repeat: Infinity, delay: item * 0.12 }}
          className="h-3 bg-paper-ink/80"
          style={{ width: `${88 - item * 18}%` }}
        />
      ))}
    </div>
  );
}

export function ScrollMotion({ reducedMotion }: DemoProps) {
  const scroller = useRef<HTMLDivElement>(null);
  return (
    <div ref={scroller} className="h-full w-full overflow-auto">
      <div className="flex flex-col gap-16 px-6 py-10">
        {["Enter", "Hold", "Release", "Settle"].map((label) => (
          <motion.div
            key={label}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ root: scroller, amount: 0.6 }}
            className="grid h-24 place-items-center border border-hairline"
          >
            <span className="font-serif text-2xl">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ParallaxMotion() {
  const scroller = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scroller });
  const back = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const front = useTransform(scrollYProgress, [0, 1], [0, -48]);
  return (
    <div ref={scroller} className="relative h-full w-full overflow-auto">
      <div className="h-[720px]">
        <motion.div style={{ y: back }} className="absolute top-16 left-8 font-serif text-5xl text-paper-ink/25">
          Far
        </motion.div>
        <motion.div style={{ y: front }} className="absolute top-40 left-16 border border-hairline px-6 py-8">
          <p className="font-serif text-3xl">Near</p>
        </motion.div>
      </div>
    </div>
  );
}

export function TextRevealMotion({ playToken, reducedMotion }: DemoProps) {
  const words = "Words arrive in the order you wrote them.".split(" ");
  return (
    <p className="max-w-md font-serif text-4xl leading-tight">
      {words.map((word, index) => (
        <motion.span
          key={`${playToken}-${word}`}
          className="mr-[0.3em] inline-block"
          initial={reducedMotion ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.04, duration: 0.4 }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function DragMotion() {
  const bounds = useRef<HTMLDivElement>(null);
  return (
    <div ref={bounds} className="relative h-56 w-full">
      <motion.div drag dragConstraints={bounds} dragElastic={0.16} className="grid size-16 cursor-grab place-items-center bg-paper-ink text-paper active:cursor-grabbing">
        <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
      </motion.div>
    </div>
  );
}

export const demos = {
  fade: FadeMotion,
  slide: SlideMotion,
  pop: PopMotion,
  stagger: StaggerMotion,
  list: ListMotion,
  modal: ModalMotion,
  accordion: AccordionMotion,
  "ui-button": UiButtonMotion,
  "ui-dropdown": UiDropdownMotion,
  "ui-accordion": UiAccordionMotion,
  "ui-tabs": UiTabsMotion,
  "ui-toast": UiToastMotion,
  "ui-modal": UiModalMotion,
  "ui-sidenav": UiSidenavMotion,
  "ui-card": UiCardMotion,
  "ui-gallery": UiGalleryMotion,
  "ui-skeleton": UiSkeletonMotion,
  "ui-list": UiListMotion,
  scroll: ScrollMotion,
  parallax: ParallaxMotion,
  "text-reveal": TextRevealMotion,
  drag: DragMotion,
};
