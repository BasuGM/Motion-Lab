"use client";

import { durationSeconds, gsapEase } from "@/animations/eases";
import FadeGsap, { useGsapFromTo } from "@/animations/gsap/fade";
import { registerGsap } from "@/animations/gsap/register";
import { useDemoList, type DemoItem } from "@/animations/use-demo-list";
import { PaperButton } from "@/components/animation/specimen";
import type { DemoProps } from "@/types/animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { useEntrance } from "@/animations/use-entrance";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function Mark({ label = "ML" }: { label?: string }) {
  return (
    <div className="mark grid size-16 place-items-center bg-paper-ink text-paper">
      <span className="font-mono text-[10px] tracking-[0.16em]">{label}</span>
    </div>
  );
}

export function SlideGsap(props: DemoProps) {
  const ref = useGsapFromTo(props, { x: 0 }, { x: props.config.x });
  return (
    <div ref={ref}>
      <Mark />
    </div>
  );
}

export function PopGsap(props: DemoProps) {
  const ref = useGsapFromTo(props, { scale: 1, rotation: 0 }, { scale: props.config.scale, rotation: props.config.rotate });
  return (
    <div ref={ref}>
      <Mark />
    </div>
  );
}

export function StaggerGsap({ config, playToken, reducedMotion }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    registerGsap();
    if (!root.current || reducedMotion) return;
    gsap.from(root.current.querySelectorAll(".mark"), {
      opacity: 0,
      y: 14,
      stagger: 0.08,
      duration: durationSeconds(config),
      delay: config.delay,
      ease: gsapEase(config.ease),
    });
  }, { scope: root, dependencies: [playToken, config, reducedMotion], revertOnUpdate: true });
  return (
    <div ref={root} className="flex gap-3">
      {["01", "02", "03", "04", "05"].map((label) => (
        <div key={label} className="mark grid size-12 place-items-center bg-paper-ink text-paper">
          <span className="font-mono text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ListGsap(props: DemoProps) {
  const view = useFlipRows(props, false);
  return view;
}

export function UiListGsap(props: DemoProps) {
  return useFlipRows(props, true);
}

function useFlipRows(props: DemoProps, rich: boolean) {
  registerGsap();
  const { items, add, remove, shuffle } = useDemoList();
  const parent = useRef<HTMLUListElement>(null);
  const pending = useRef<Flip.FlipState | null>(null);
  const [version, setVersion] = useState(0);

  function mutate(update: () => void) {
    if (parent.current) pending.current = Flip.getState(parent.current.querySelectorAll("[data-flip]"));
    update();
    setVersion((value) => value + 1);
  }

  useLayoutEffect(() => {
    if (!pending.current) return;
    Flip.from(pending.current, { duration: durationSeconds(props.config), ease: gsapEase(props.config.ease) });
    pending.current = null;
  }, [version, items, props.config]);

  return (
    <div className="w-full max-w-sm">
      <div className="mb-3 flex flex-wrap gap-2">
        <PaperButton onClick={() => mutate(add)}>Add</PaperButton>
        <PaperButton onClick={() => mutate(remove)}>Remove</PaperButton>
        <PaperButton onClick={() => mutate(shuffle)}>Reorder</PaperButton>
      </div>
      <ul ref={parent} className="flex flex-col gap-2">
        {items.map((item: DemoItem) => (
          <li key={item.id} data-flip className="flex items-center justify-between border border-hairline px-3 py-2">
            <span>{item.label}</span>
            <span className="font-mono text-[11px] text-paper-muted">{rich ? item.meta : item.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ModalGsap({ playToken, config, reducedMotion }: DemoProps) {
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  useGSAP(() => {
    if (!panel.current || !open || reducedMotion) return;
    gsap.fromTo(panel.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: durationSeconds(config), ease: gsapEase(config.ease) });
  }, { dependencies: [open, playToken, config, reducedMotion] });
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <PaperButton onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Open"}</PaperButton>
      {open ? (
        <div ref={panel} role="dialog" aria-label="Sample panel" className="w-full border border-hairline px-4 py-5">
          <p className="font-serif text-2xl">Panel</p>
          <p className="mt-2 text-sm text-paper-muted">A timeline can reverse this. Here the open plays forward.</p>
        </div>
      ) : null}
    </div>
  );
}

export function AccordionGsap({ playToken, config, reducedMotion }: DemoProps) {
  const body = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  useGSAP(() => {
    if (!body.current) return;
    if (reducedMotion) {
      gsap.set(body.current, { height: "auto" });
      return;
    }
    gsap.fromTo(
      body.current,
      { height: open ? 0 : "auto" },
      { height: open ? "auto" : 0, duration: durationSeconds(config), ease: gsapEase(config.ease) },
    );
  }, { dependencies: [open, playToken, config, reducedMotion] });
  return (
    <div className="w-full max-w-sm border border-hairline">
      <button type="button" className="flex w-full justify-between px-3 py-3" onClick={() => setOpen((value) => !value)}>
        <span>Duration</span>
        <span className="font-mono text-[11px] text-paper-muted">{open ? "Open" : "Shut"}</span>
      </button>
      <div ref={body} className="h-0 overflow-hidden">
        <p className="px-3 pb-3 text-sm text-paper-muted">GSAP measures auto height before it tweens.</p>
      </div>
    </div>
  );
}

export function UiDropdownGsap({ config }: DemoProps) {
  const menu = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(() => {
    if (!menu.current || !open) return;
    gsap.fromTo(menu.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.22, ease: gsapEase(config.ease) });
  }, { dependencies: [open, config.ease] });
  return (
    <div className="relative">
      <PaperButton onClick={() => setOpen((value) => !value)}>Library</PaperButton>
      {open ? (
        <ul ref={menu} className="absolute left-0 z-10 mt-2 w-44 border border-hairline bg-paper py-1 text-sm">
          {["Motion", "GSAP", "Spring"].map((item) => (
            <li key={item}>
              <button type="button" className="block w-full px-3 py-2 text-left" onClick={() => setOpen(false)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function UiToastGsap({ config }: DemoProps) {
  const [toasts, setToasts] = useState<string[]>([]);
  const list = useRef<HTMLUListElement>(null);
  useGSAP(() => {
    const node = list.current?.firstElementChild;
    if (!node) return;
    gsap.from(node, { x: 16, opacity: 0, duration: 0.3, ease: gsapEase(config.ease) });
  }, { dependencies: [toasts, config.ease] });
  return (
    <div className="flex w-full max-w-sm flex-col items-end gap-2">
      <PaperButton onClick={() => setToasts((current) => [`Saved ${current.length + 1}`, ...current].slice(0, 3))}>Notify</PaperButton>
      <ul ref={list} className="flex w-full flex-col gap-2">
        {toasts.map((toast) => (
          <li key={toast} className="flex items-center justify-between border border-hairline px-3 py-2 text-sm">
            {toast}
            <button type="button" className="font-mono text-[11px]" onClick={() => setToasts((current) => current.filter((item) => item !== toast))}>
              Close
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UiModalGsap(props: DemoProps) {
  return <ModalGsap {...props} />;
}

export function UiSidenavGsap({ config }: DemoProps) {
  const drawer = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  useGSAP(() => {
    if (!drawer.current || !open) return;
    gsap.fromTo(drawer.current, { xPercent: -100 }, { xPercent: 0, duration: durationSeconds(config), ease: gsapEase(config.ease) });
  }, { dependencies: [open, config] });
  return (
    <div className="relative h-48 w-full overflow-hidden border border-hairline">
      <PaperButton onClick={() => setOpen(true)}>Open drawer</PaperButton>
      {open ? (
        <aside ref={drawer} className="absolute inset-y-0 left-0 w-48 border-r border-hairline bg-paper p-4">
          <p className="font-serif text-2xl">Nav</p>
          <button type="button" className="mt-4 text-sm underline" onClick={() => setOpen(false)}>
            Close
          </button>
        </aside>
      ) : null}
    </div>
  );
}

export function UiSkeletonGsap({ reducedMotion, playToken }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current || reducedMotion) return;
    gsap.to(root.current.querySelectorAll(".bar"), { opacity: 0.35, duration: 0.7, yoyo: true, repeat: -1, stagger: 0.12 });
  }, { scope: root, dependencies: [playToken, reducedMotion], revertOnUpdate: true });
  return (
    <div ref={root} className="w-full max-w-sm space-y-3">
      {[88, 70, 52].map((width) => (
        <div key={width} className="bar h-3 bg-paper-ink/80" style={{ width: `${width}%` }} />
      ))}
    </div>
  );
}

export function ScrollGsap({ reducedMotion }: DemoProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    registerGsap();
    if (!root.current || !scroller.current || reducedMotion) return;
    root.current.querySelectorAll("[data-mark]").forEach((mark) => {
      gsap.from(mark, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: mark, scroller: scroller.current, start: "top 85%" },
      });
    });
  }, { dependencies: [reducedMotion] });
  return (
    <div ref={scroller} className="h-full w-full overflow-auto">
      <div ref={root} className="flex flex-col gap-16 px-6 py-10">
        {["Enter", "Hold", "Release", "Settle"].map((label) => (
          <div key={label} data-mark className="grid h-24 place-items-center border border-hairline">
            <span className="font-serif text-2xl">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParallaxGsap() {
  const scroller = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    registerGsap();
    if (!scroller.current || !back.current || !front.current) return;
    const shared = { scroller: scroller.current, start: "top top", end: "bottom bottom", scrub: true };
    gsap.to(back.current, { y: 80, ease: "none", scrollTrigger: { trigger: scroller.current, ...shared } });
    gsap.to(front.current, { y: -48, ease: "none", scrollTrigger: { trigger: scroller.current, ...shared } });
  }, { dependencies: [] });
  return (
    <div ref={scroller} className="relative h-full w-full overflow-auto">
      <div className="h-[720px]">
        <div ref={back} className="absolute top-16 left-8 font-serif text-5xl text-paper-ink/25">Far</div>
        <div ref={front} className="absolute top-40 left-16 border border-hairline px-6 py-8">
          <p className="font-serif text-3xl">Near</p>
        </div>
      </div>
    </div>
  );
}

export function TimelineGsap({ playToken, config, reducedMotion }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current || reducedMotion) return;
    const tl = gsap.timeline({ repeat: config.repeat < 0 ? -1 : config.repeat, yoyo: true });
    tl.to(".a", { x: 48, duration: durationSeconds(config), ease: gsapEase(config.ease) })
      .to(".b", { scale: 1.2, duration: durationSeconds(config) * 0.8 }, "-=0.2")
      .to(".c", { rotation: 16, duration: durationSeconds(config) * 0.8 });
  }, { scope: root, dependencies: [playToken, config, reducedMotion], revertOnUpdate: true });
  return (
    <div ref={root} className="flex items-center gap-4">
      <div className="a grid size-14 place-items-center bg-paper-ink text-paper"><span className="font-mono text-[10px]">A</span></div>
      <div className="b grid size-14 place-items-center bg-paper-ink text-paper"><span className="font-mono text-[10px]">B</span></div>
      <div className="c grid size-14 place-items-center bg-paper-ink text-paper"><span className="font-mono text-[10px]">C</span></div>
    </div>
  );
}

export function TextRevealGsap({ playToken, reducedMotion, config }: DemoProps) {
  const line = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    registerGsap();
    if (!line.current || reducedMotion) return;
    const split = SplitText.create(line.current, { type: "words" });
    gsap.from(split.words, { y: 16, opacity: 0, stagger: 0.04, duration: durationSeconds(config), ease: gsapEase(config.ease) });
    return () => split.revert();
  }, { dependencies: [playToken, config, reducedMotion] });
  return <p ref={line} className="max-w-md font-serif text-4xl leading-tight">Words arrive in the order you wrote them.</p>;
}

export function SvgPathGsap({ playToken, config, reducedMotion }: DemoProps) {
  const path = useRef<SVGPathElement>(null);
  useGSAP(() => {
    registerGsap();
    const el = path.current;
    if (!el) return;
    const length = el.getTotalLength();
    gsap.set(el, { strokeDasharray: length, strokeDashoffset: reducedMotion ? 0 : length });
    if (reducedMotion) return;
    gsap.to(el, {
      strokeDashoffset: 0,
      duration: Math.max(durationSeconds(config), 0.8),
      repeat: config.repeat < 0 ? -1 : config.repeat,
      yoyo: true,
      ease: gsapEase(config.ease),
    });
  }, { dependencies: [playToken, config, reducedMotion] });
  return (
    <svg viewBox="0 0 200 80" className="w-full max-w-sm">
      <path ref={path} d="M10 50 C 40 10, 70 10, 90 40 S 140 80, 190 20" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export function HorizontalGsap() {
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    registerGsap();
    if (!scroller.current || !track.current) return;
    gsap.to(track.current, {
      x: () => -(track.current!.scrollWidth - scroller.current!.clientWidth),
      ease: "none",
      scrollTrigger: { scroller: scroller.current, trigger: scroller.current, start: "top top", end: "bottom bottom", scrub: true },
    });
  }, { dependencies: [] });
  return (
    <div ref={scroller} className="h-full w-full overflow-auto">
      <div className="h-[180%]">
        <div className="sticky top-0 flex h-[420px] items-center overflow-hidden">
          <div ref={track} className="flex gap-4 px-6">
            {["One", "Two", "Three", "Four"].map((panel) => (
              <div key={panel} className="grid h-40 w-48 shrink-0 place-items-center border border-hairline">
                <span className="font-serif text-3xl">{panel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingGsap({ playToken, config, reducedMotion }: DemoProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current || reducedMotion) return;
    const tl = gsap.timeline();
    tl.from(".eyebrow", { y: 8, opacity: 0, duration: 0.3 })
      .from(".headline", { y: 16, opacity: 0, duration: durationSeconds(config) })
      .from(".rule", { scaleX: 0, duration: 0.35, transformOrigin: "left center" })
      .from(".action", { opacity: 0, duration: 0.25 }, "-=0.1");
  }, { scope: root, dependencies: [playToken, config, reducedMotion], revertOnUpdate: true });
  return (
    <div ref={root} className="max-w-md">
      <p className="eyebrow font-mono text-[11px] uppercase tracking-[0.16em] text-paper-muted">01 — Sequence</p>
      <h2 className="headline mt-3 font-serif text-4xl leading-tight">Five clocks, one stage.</h2>
      <div className="rule mt-4 h-px w-24 bg-paper-ink" />
      <button type="button" className="action mt-5 h-10 border border-hairline px-4 text-sm">Enter</button>
    </div>
  );
}

export function DragGsap() {
  const bounds = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerGsap();
    if (!bounds.current || !mark.current) return;
    const instance = Draggable.create(mark.current, { bounds: bounds.current })[0];
    return () => {
      instance?.kill();
    };
  }, []);
  return (
    <div ref={bounds} className="relative h-56 w-full">
      <div ref={mark} className="grid size-16 cursor-grab place-items-center bg-paper-ink text-paper">
        <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
      </div>
    </div>
  );
}

export const demos = {
  fade: FadeGsap,
  slide: SlideGsap,
  pop: PopGsap,
  stagger: StaggerGsap,
  list: ListGsap,
  modal: ModalGsap,
  accordion: AccordionGsap,
  "ui-dropdown": UiDropdownGsap,
  "ui-toast": UiToastGsap,
  "ui-modal": UiModalGsap,
  "ui-sidenav": UiSidenavGsap,
  "ui-skeleton": UiSkeletonGsap,
  "ui-list": UiListGsap,
  scroll: ScrollGsap,
  parallax: ParallaxGsap,
  timeline: TimelineGsap,
  "text-reveal": TextRevealGsap,
  "svg-path": SvgPathGsap,
  horizontal: HorizontalGsap,
  landing: LandingGsap,
  drag: DragGsap,
};
