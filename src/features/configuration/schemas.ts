import { z } from "zod";
import { directions, easeNames, type LibraryId } from "@/types/animation";

export const timeSchema = z.object({
  duration: z.number().min(0.05).max(5),
  delay: z.number().min(0).max(2),
  ease: z.enum(easeNames),
  repeat: z.number().int().min(-1).max(20),
  direction: z.enum(directions),
  speed: z.number().min(0.25).max(3),
});

export const transformSchema = z.object({
  x: z.number().min(-160).max(160),
  y: z.number().min(-120).max(120),
  scale: z.number().min(0.5).max(2),
  rotate: z.number().min(-180).max(180),
});

export const springSchema = z.object({
  stiffness: z.number().min(1).max(500),
  damping: z.number().min(1).max(80),
  mass: z.number().min(0.1).max(10),
});

export const lottieSchema = z.object({
  speed: z.number().min(0.25).max(3),
  direction: z.enum(directions),
  loop: z.boolean(),
});

export const listSchema = z.object({
  duration: z.number().min(0.05).max(2),
  ease: z.enum(easeNames),
});

export const motionSchema = timeSchema.merge(transformSchema).merge(springSchema);

export function schemaFor(library: LibraryId) {
  switch (library) {
    case "motion":
    case "react-spring":
      return motionSchema;
    case "gsap":
      return timeSchema.merge(transformSchema);
    case "lottie":
      return lottieSchema;
    case "auto-animate":
      return listSchema;
  }
}
