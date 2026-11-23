"use client";

import type { DemoProps } from "@/types/animation";
import { Lottie, type LottieHandle } from "lottie-react";
import { useEffect, useRef } from "react";
import fade from "@/animations/lottie/assets/fade.json";

export function LottieClip({
  data,
  props,
  className = "size-32",
}: {
  data: object;
  props: DemoProps;
  className?: string;
}) {
  const ref = useRef<LottieHandle>(null);
  const { config, playing, reducedMotion } = props;
  const direction = config.direction === "reverse" ? "reverse" : "forward";
  const playback = useRef({ playing, reducedMotion });
  playback.current = { playing, reducedMotion };

  useEffect(() => {
    const player = ref.current;
    if (!player || reducedMotion) return;
    if (playing) player.play();
    else player.pause();
  }, [playing, reducedMotion]);

  return (
    <Lottie
      lottieRef={ref}
      src={data}
      loop={config.loop || config.repeat < 0}
      autoplay={false}
      speed={config.speed}
      direction={direction}
      className={className}
      subscriptions={{
        ready: () => {
          const player = ref.current;
          if (!player) return;
          const current = playback.current;
          if (current.reducedMotion) {
            player.seek({ percent: 100 });
            player.pause();
            return;
          }
          if (current.playing) player.play();
          else player.pause();
        },
      }}
    />
  );
}

export default function FadeLottie(props: DemoProps) {
  return <LottieClip data={fade} props={props} />;
}
