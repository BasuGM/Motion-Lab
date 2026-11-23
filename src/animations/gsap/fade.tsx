"use client";

import { durationSeconds, gsapEase, repeatCount } from "@/animations/eases";
import type { DemoProps } from "@/types/animation";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function useGsapFromTo(
  props: DemoProps,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
) {
  const ref = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const { config, playing, playToken, reducedMotion } = props;
  const latest = useRef({ from, to, playing });
  const signature = JSON.stringify([from, to, playToken, config, reducedMotion]);

  useEffect(() => {
    if (!ref.current) return;
    latest.current = { from, to, playing };
    const current = latest.current;
    if (reducedMotion) {
      gsap.set(ref.current, { opacity: 1, x: 0, scale: 1, rotation: 0 });
      return;
    }
    tween.current?.kill();
    tween.current = gsap.fromTo(ref.current, current.from, {
      ...current.to,
      duration: durationSeconds(config),
      delay: config.delay,
      ease: gsapEase(config.ease),
      repeat: repeatCount(config),
      yoyo: config.direction === "alternate",
      paused: !current.playing,
    });
    return () => {
      tween.current?.kill();
    };
    // signature already serializes from, to, playToken, and config
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, config, reducedMotion]);

  useEffect(() => {
    if (!tween.current || reducedMotion) return;
    if (playing) tween.current.play();
    else tween.current.pause();
  }, [playing, reducedMotion]);

  return ref;
}

const fadeFrom = { opacity: 0.15 };
const fadeTo = { opacity: 1 };

export default function FadeGsap(props: DemoProps) {
  const ref = useGsapFromTo(props, fadeFrom, fadeTo);
  return (
    <div ref={ref} className="grid size-16 place-items-center bg-paper-ink text-paper">
      <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
    </div>
  );
}
