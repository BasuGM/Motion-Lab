"use client";

import { autoEase } from "@/animations/eases";
import { useDemoList } from "@/animations/use-demo-list";
import { PaperButton } from "@/components/animation/specimen";
import type { DemoProps } from "@/types/animation";
import { useEntrance } from "@/animations/use-entrance";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

function options(props: DemoProps) {
  return { duration: (props.config.duration / props.config.speed) * 1000, easing: autoEase(props.config.ease) };
}

function Rows({ props, rich = false }: { props: DemoProps; rich?: boolean }) {
  const [parent] = useAutoAnimate<HTMLUListElement>(options(props));
  const { items, add, remove, shuffle } = useDemoList();
  return (
    <div className="w-full max-w-sm">
      <div className="mb-3 flex flex-wrap gap-2">
        <PaperButton onClick={add}>Add</PaperButton>
        <PaperButton onClick={remove}>Remove</PaperButton>
        <PaperButton onClick={shuffle}>Reorder</PaperButton>
      </div>
      <ul ref={parent} className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between border border-hairline px-3 py-2">
            <span>{item.label}</span>
            <span className="font-mono text-[11px] text-paper-muted">{rich ? item.meta : item.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ListAuto(props: DemoProps) {
  return <Rows props={props} />;
}

export function UiListAuto(props: DemoProps) {
  return <Rows props={props} rich />;
}

export function ModalAuto({ playToken, reducedMotion }: DemoProps) {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  return (
    <div ref={parent} className="flex w-full max-w-sm flex-col items-center gap-4">
      <PaperButton onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Open"}</PaperButton>
      {open ? (
        <div role="dialog" aria-label="Sample panel" className="w-full border border-hairline px-4 py-5">
          <p className="font-serif text-2xl">Panel</p>
          <p className="mt-2 text-sm text-paper-muted">Mounting the panel is the animation.</p>
        </div>
      ) : null}
    </div>
  );
}

export function AccordionAuto({ playToken, reducedMotion }: DemoProps) {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const [open, setOpen] = useEntrance(playToken, reducedMotion);
  return (
    <div className="w-full max-w-sm border border-hairline">
      <button type="button" className="flex w-full justify-between px-3 py-3" onClick={() => setOpen((value) => !value)}>
        <span>Children</span>
        <span className="font-mono text-[11px] text-paper-muted">{open ? "Open" : "Shut"}</span>
      </button>
      <div ref={parent}>
        {open ? <p className="px-3 pb-3 text-sm text-paper-muted">The body is added and removed. There is no playhead.</p> : null}
      </div>
    </div>
  );
}

const sections = [
  ["List", "Add and remove rows."],
  ["Form", "Show a field when the answer needs it."],
  ["Accordion", "Mount the body. Stop there."],
] as const;

export function UiAccordionAuto() {
  const [open, setOpen] = useState(0);
  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <div ref={parent} className="w-full max-w-sm border border-hairline">
      {sections.map(([title, body], index) => (
        <div key={title} className="border-b border-hairline px-3 py-3 last:border-b-0">
          <button type="button" className="flex w-full justify-between text-left" onClick={() => setOpen(index)}>
            {title}
          </button>
          {open === index ? <p className="pt-2 text-sm text-paper-muted">{body}</p> : null}
        </div>
      ))}
    </div>
  );
}

export const demos = {
  list: ListAuto,
  modal: ModalAuto,
  accordion: AccordionAuto,
  "ui-accordion": UiAccordionAuto,
  "ui-list": UiListAuto,
};
