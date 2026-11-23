"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect, useRef } from "react";
import type { AnimationConfig, DemoProps } from "@/types/animation";

export function motionTransition(config: AnimationConfig) {
  return {
    type: "spring" as const,
    stiffness: config.stiffness * config.speed,
    damping: config.damping,
    mass: config.mass,
    delay: config.delay,
    duration: config.duration / config.speed,
    repeat: config.repeat < 0 ? Infinity : config.repeat,
    repeatType: config.direction === "alternate" ? ("reverse" as const) : ("loop" as const),
  };
}

export function MarkMotion(props: DemoProps & { from: Record<string, number>; to: Record<string, number> }) {
  const controls = useAnimationControls();
  const { playing, playToken, reducedMotion, config, from, to } = props;
  const latest = useRef({ from, to, config, reducedMotion, playing });
  const signature = JSON.stringify([from, to, playToken, reducedMotion, config]);

  useEffect(() => {
    latest.current = { from, to, config, reducedMotion, playing };
    const current = latest.current;
    if (current.reducedMotion) {
      controls.set(current.to);
      return;
    }
    controls.set(current.from);
    if (!current.playing) return;
    void controls.start({ ...current.to, transition: motionTransition(current.config) });
    // signature serializes from, to, and config
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, controls]);

  useEffect(() => {
    latest.current = { from, to, config, reducedMotion, playing };
    const current = latest.current;
    if (current.reducedMotion) return;
    if (playing) {
      void controls.start({ ...current.to, transition: motionTransition(current.config) });
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, controls]);

  return (
    <motion.div
      animate={controls}
      className="grid size-16 place-items-center bg-paper-ink text-paper"
    >
      <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
    </motion.div>
  );
}

const fadeFrom = { opacity: 0.15 };
const fadeTo = { opacity: 1 };

export default function FadeMotion(props: DemoProps) {
  return <MarkMotion {...props} from={fadeFrom} to={fadeTo} />;
}
