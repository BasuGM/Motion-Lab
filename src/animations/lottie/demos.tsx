"use client";

import FadeLottie, { LottieClip } from "@/animations/lottie/fade";
import type { DemoProps } from "@/types/animation";
import { useState } from "react";
import pop from "@/animations/lottie/assets/pop.json";
import slide from "@/animations/lottie/assets/slide.json";
import stagger from "@/animations/lottie/assets/stagger.json";
import loader from "@/animations/lottie/assets/loader.json";
import success from "@/animations/lottie/assets/success.json";

export function SlideLottie(props: DemoProps) {
  return <LottieClip data={slide} props={props} />;
}

export function PopLottie(props: DemoProps) {
  return <LottieClip data={pop} props={props} />;
}

export function StaggerLottie(props: DemoProps) {
  return <LottieClip data={stagger} props={props} className="h-28 w-full max-w-sm" />;
}

export function PlaybackLottie(props: DemoProps) {
  const [clip, setClip] = useState<"loader" | "success">("loader");
  const data = clip === "loader" ? loader : success;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button type="button" className="h-9 border border-hairline px-3 text-sm" onClick={() => setClip("loader")}>
          Loader
        </button>
        <button type="button" className="h-9 border border-hairline px-3 text-sm" onClick={() => setClip("success")}>
          Success
        </button>
      </div>
      <LottieClip key={clip} data={data} props={props} />
    </div>
  );
}

export const demos = {
  fade: FadeLottie,
  slide: SlideLottie,
  pop: PopLottie,
  stagger: StaggerLottie,
  playback: PlaybackLottie,
};
