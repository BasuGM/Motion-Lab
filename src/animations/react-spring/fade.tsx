"use client";

import type { AnimationConfig, DemoProps } from "@/types/animation";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";

export function springConfig(config: AnimationConfig) {
  return {
    tension: config.stiffness * config.speed,
    friction: config.damping,
    mass: config.mass,
  };
}

export function loopFor(config: AnimationConfig) {
  if (config.repeat === 0 && config.direction !== "alternate") return undefined;
  if (config.direction === "alternate" || config.repeat < 0) return { reverse: config.direction !== "normal" };
  return true;
}

export function useSpringPlay(
  props: DemoProps,
  from: Record<string, number>,
  to: Record<string, number>,
) {
  const [styles, api] = useSpring(() => ({ ...to }));
  const latest = useRef({ from, to, props });
  const signature = JSON.stringify([from, to, props.playToken, props.config, props.reducedMotion]);

  useEffect(() => {
    latest.current = { from, to, props };
    const current = latest.current;
    if (current.props.reducedMotion) {
      api.set(current.to);
      return;
    }
    if (!current.props.playing) {
      api.pause();
      return;
    }
    void api.start({
      from: current.from,
      to: current.to,
      delay: current.props.config.delay * 1000,
      loop: loopFor(current.props.config),
      config: springConfig(current.props.config),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, api]);

  useEffect(() => {
    latest.current = { from, to, props };
    if (props.reducedMotion) return;
    if (props.playing) api.resume();
    else api.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.playing, props.reducedMotion, api]);

  return styles;
}

export default function FadeSpring(props: DemoProps) {
  const styles = useSpringPlay(props, { opacity: 0.15 }, { opacity: 1 });
  return (
    <animated.div style={styles} className="grid size-16 place-items-center bg-paper-ink text-paper">
      <span className="font-mono text-[10px] tracking-[0.16em]">ML</span>
    </animated.div>
  );
}
