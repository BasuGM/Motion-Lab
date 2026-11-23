"use client";

import { useEffect, useRef, useState } from "react";

export function useTimecode(playing: boolean): string {
  const [ms, setMs] = useState(0);
  const elapsed = useRef(0);
  const started = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      if (started.current !== null) {
        elapsed.current += performance.now() - started.current;
        started.current = null;
      }
      return;
    }

    started.current = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const origin = started.current ?? now;
      setMs(elapsed.current + (now - origin));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const total = Math.max(0, Math.floor(ms));
  const minutes = Math.floor(total / 60000);
  const seconds = Math.floor((total % 60000) / 1000);
  const tenths = Math.floor((total % 1000) / 100);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}
