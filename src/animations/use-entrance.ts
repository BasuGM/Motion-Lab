"use client";

import { useEffect, useState } from "react";

export function useEntrance(playToken: number, reducedMotion: boolean) {
  const [open, setOpen] = useState(reducedMotion);
  const [seenToken, setSeenToken] = useState(playToken);
  const [armed, setArmed] = useState(!reducedMotion);

  if (seenToken !== playToken) {
    setSeenToken(playToken);
    setOpen(reducedMotion);
    setArmed(!reducedMotion);
  }

  useEffect(() => {
    if (!armed) return;
    const frame = requestAnimationFrame(() => {
      setArmed(false);
      setOpen(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [armed]);

  return [open, setOpen] as const;
}
