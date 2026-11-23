"use client";

import { useState } from "react";

export interface DemoItem {
  id: string;
  label: string;
  meta: string;
}

const seed: DemoItem[] = [
  { id: "fade", label: "Fade", meta: "Opacity" },
  { id: "slide", label: "Slide", meta: "Translate" },
  { id: "pop", label: "Pop", meta: "Scale" },
];

let extra = 0;

export function useDemoList() {
  const [items, setItems] = useState<DemoItem[]>(seed);

  function add() {
    extra += 1;
    const names = ["Hold", "Trail", "Mark", "Beat"];
    setItems((current) => [
      ...current,
      { id: `extra-${extra}`, label: names[extra % names.length], meta: "New" },
    ]);
  }

  function remove() {
    setItems((current) => (current.length > 1 ? current.slice(0, -1) : current));
  }

  function shuffle() {
    setItems((current) => [...current].sort(() => Math.random() - 0.5));
  }

  return { items, add, remove, shuffle };
}
