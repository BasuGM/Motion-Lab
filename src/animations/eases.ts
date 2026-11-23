import type { AnimationConfig, EaseName } from "@/types/animation";

export function gsapEase(ease: EaseName): string {
  switch (ease) {
    case "linear":
      return "none";
    case "easeIn":
      return "power2.in";
    case "easeOut":
      return "power2.out";
    case "easeInOut":
      return "power2.inOut";
    case "circOut":
      return "circ.out";
  }
}

export function durationSeconds(config: AnimationConfig): number {
  return config.duration / config.speed;
}

export function repeatCount(config: AnimationConfig): number {
  return config.repeat < 0 ? -1 : config.repeat;
}

export function autoEase(ease: EaseName): string {
  switch (ease) {
    case "linear":
      return "linear";
    case "easeIn":
      return "ease-in";
    case "easeOut":
      return "ease-out";
    case "easeInOut":
      return "ease-in-out";
    case "circOut":
      return "cubic-bezier(0, 0.55, 0.45, 1)";
  }
}
