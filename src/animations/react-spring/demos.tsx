"use client";

import FadeSpring, { loopFor, springConfig, useSpringPlay } from "@/animations/react-spring/fade";
import { useDemoList } from "@/animations/use-demo-list";
import { useEntrance } from "@/animations/use-entrance";
import { PaperButton } from "@/components/animation/specimen";
import type { DemoProps } from "@/types/animation";
import { animated, useSpring, useTrail, useTransition } from "@react-spring/web";
import { useState } from "react";

export function SlideSpring(props: DemoProps) {
  const styles = useSpringPlay(props, { x: 0 }, { x: props.config.x });
  return (
    <animated.div style={styles} className="grid size-16 place-items-center bg-paper-ink text-paper">
      <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
    </animated.div>
  );
}

export function PopSpring(props: DemoProps) {
  const styles = useSpringPlay(props, { scale: 1, rotate: 0 }, { scale: props.config.scale, rotate: props.config.rotate });
  return (
    <animated.div style={styles} className="grid size-16 place-items-center bg-paper-ink text-paper">
      <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
    </animated.div>
  );
}

export function StaggerSpring({ config, playToken, reducedMotion }: DemoProps) {
  const marks = ["01", "02", "03", "04", "05"];
  const trail = useTrail(marks.length, {
    from: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 14 },
    to: { opacity: 1, y: 0 },
    reset: true,
    config: springConfig(config),
    loop: loopFor(config),
  });
  return (
    <div className="flex gap-3" key={playToken}>
      {trail.map((style, index) => (
        <animated.div key={marks[index]} style={style} className="grid size-12 place-items-center bg-paper-ink text-paper">
          <span className="font-mono text-[10px]">{marks[index]}</span>
        </animated.div>
      ))}
    </div>
  );
}

function SpringList({ props, rich = false }: { props: DemoProps; rich?: boolean }) {
  const { items, add, remove, shuffle } = useDemoList();
  const transitions = useTransition(items, {
    keys: (item) => item.id,
    from: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0 },
    config: springConfig(props.config),
  });
  return (
    <div className="w-full max-w-sm">
      <div className="mb-3 flex flex-wrap gap-2">
        <PaperButton onClick={add}>Add</PaperButton>
        <PaperButton onClick={remove}>Remove</PaperButton>
        <PaperButton onClick={shuffle}>Reorder</PaperButton>
      </div>
      <ul className="flex flex-col gap-2">
        {transitions((style, item) => (
          <animated.li key={item.id} style={style} className="flex items-center justify-between border border-hairline px-3 py-2">
            <span>{item.label}</span>
            <span className="font-mono text-[11px] text-paper-muted">{rich ? item.meta : item.id}</span>
          </animated.li>
        ))}
      </ul>
    </div>
  );
}

export function ListSpring(props: DemoProps) {
  return <SpringList props={props} />;
}

export function UiListSpring(props: DemoProps) {
  return <SpringList props={props} rich />;
}

export function ModalSpring({ config, reducedMotion, playToken }: DemoProps) {
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  const transitions = useTransition(open, {
    from: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 8 },
    config: springConfig(config),
  });
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <PaperButton onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Open"}</PaperButton>
      {transitions((style, item) =>
        item ? (
          <animated.div key="panel" role="dialog" aria-label="Sample panel" style={style} className="w-full border border-hairline px-4 py-5">
            <p className="font-serif text-2xl">Panel</p>
            <p className="mt-2 text-sm text-paper-muted">The spring can be reversed halfway.</p>
          </animated.div>
        ) : null,
      )}
    </div>
  );
}

export function AccordionSpring({ config, playToken, reducedMotion }: DemoProps) {
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  const styles = useSpring({ height: open ? "auto" : 0, config: springConfig(config) });
  return (
    <div className="w-full max-w-sm border border-hairline">
      <button type="button" className="flex w-full justify-between px-3 py-3" onClick={() => setOpen((value) => !value)}>
        <span>Mass</span>
        <span className="font-mono text-[11px] text-paper-muted">{open ? "Open" : "Shut"}</span>
      </button>
      <animated.div style={{ height: styles.height, overflow: "hidden" }}>
        <p className="px-3 pb-3 text-sm text-paper-muted">Heavier mass takes longer to settle.</p>
      </animated.div>
    </div>
  );
}

export function UiButtonSpring({ config }: DemoProps) {
  const [styles, api] = useSpring(() => ({ scale: 1 }));
  return (
    <animated.button
      type="button"
      style={styles}
      onPointerDown={() => void api.start({ scale: 0.97, config: springConfig(config) })}
      onPointerUp={() => void api.start({ scale: 1, config: springConfig(config) })}
      onPointerEnter={() => void api.start({ scale: 1.03, config: springConfig(config) })}
      onPointerLeave={() => void api.start({ scale: 1, config: springConfig(config) })}
      className="h-11 bg-paper-ink px-5 text-paper"
    >
      Compare fade
    </animated.button>
  );
}

const sections = [
  ["Time", "Springs do not think in seconds first."],
  ["Spring", "Stiffness, damping, and mass."],
  ["Trail", "useTrail staggers the same config."],
] as const;

export function UiAccordionSpring({ config }: DemoProps) {
  const [open, setOpen] = useState(0);
  return (
    <div className="w-full max-w-sm border border-hairline">
      {sections.map(([title, body], index) => (
        <AccordionRow key={title} title={title} body={body} open={open === index} config={config} onClick={() => setOpen(index)} />
      ))}
    </div>
  );
}

function AccordionRow({
  title,
  body,
  open,
  config,
  onClick,
}: {
  title: string;
  body: string;
  open: boolean;
  config: DemoProps["config"];
  onClick: () => void;
}) {
  const styles = useSpring({ height: open ? "auto" : 0, config: springConfig(config) });
  return (
    <div className="border-b border-hairline last:border-b-0">
      <button type="button" className="flex w-full justify-between px-3 py-3 text-left" onClick={onClick}>
        {title}
      </button>
      <animated.div style={{ height: styles.height, overflow: "hidden" }}>
        <p className="px-3 pb-3 text-sm text-paper-muted">{body}</p>
      </animated.div>
    </div>
  );
}

const tabs = ["Bench", "API", "Fit"] as const;
const tabCopy = {
  Bench: "Springs stay smooth when the target changes mid-way.",
  API: "useSpring, useTrail, useTransition.",
  Fit: "Pointer follow and interruptible UI.",
};

export function UiTabsSpring({ config }: DemoProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Bench");
  const transitions = useTransition(tab, {
    from: { opacity: 0, y: 6 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0 },
    config: springConfig(config),
  });
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-4 border-b border-hairline">
        {tabs.map((item) => (
          <button key={item} type="button" className={`px-1 py-2 text-sm ${tab === item ? "underline decoration-2 underline-offset-8" : ""}`} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="relative min-h-12 pt-4 text-sm">
        {transitions((style, item) => (
          <animated.p key={item} style={style} className="absolute">
            {tabCopy[item]}
          </animated.p>
        ))}
      </div>
    </div>
  );
}

export function UiModalSpring(props: DemoProps) {
  return <ModalSpring {...props} />;
}

export function UiCardSpring({ config }: DemoProps) {
  const [open, setOpen] = useState(false);
  const styles = useSpring({ height: open ? 148 : 88, config: springConfig(config) });
  return (
    <animated.article style={{ height: styles.height, overflow: "hidden" }} onClick={() => setOpen((value) => !value)} className="w-full max-w-xs cursor-pointer border border-hairline p-4">
      <h3 className="font-serif text-2xl">Specimen</h3>
      <p className="mt-2 text-sm text-paper-muted">A fixed pair of heights, driven by the spring.</p>
    </animated.article>
  );
}

export function PointerSpring({ config, reducedMotion }: DemoProps) {
  const sizes = [32, 24, 18, 12];
  const [trail, api] = useTrail(sizes.length, () => ({ x: 24, y: 24 }));
  return (
    <div
      className="relative h-56 w-full"
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        void api.start({
          x: event.clientX - rect.left - 16,
          y: event.clientY - rect.top - 16,
          config: springConfig(config),
        });
      }}
    >
      {trail.map((style, index) => (
        <animated.div key={sizes[index]} style={{ ...style, width: sizes[index], height: sizes[index] }} className="absolute bg-paper-ink" />
      ))}
      <p className="pointer-events-none absolute right-0 bottom-0 font-mono text-[11px] text-paper-muted">Move inside the stage</p>
    </div>
  );
}

export const demos = {
  fade: FadeSpring,
  slide: SlideSpring,
  pop: PopSpring,
  stagger: StaggerSpring,
  list: ListSpring,
  modal: ModalSpring,
  accordion: AccordionSpring,
  "ui-button": UiButtonSpring,
  "ui-accordion": UiAccordionSpring,
  "ui-tabs": UiTabsSpring,
  "ui-modal": UiModalSpring,
  "ui-card": UiCardSpring,
  "ui-list": UiListSpring,
  pointer: PointerSpring,
};
