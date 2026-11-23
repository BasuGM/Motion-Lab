import { cn } from "cn";
import type { LibraryId } from "@/types/animation";

const pipClass: Record<LibraryId, string> = {
  motion: "bg-pip-motion",
  gsap: "bg-pip-gsap",
  "react-spring": "bg-pip-spring",
  lottie: "bg-pip-lottie",
  "auto-animate": "bg-pip-auto",
};

export function Pip({ id, className }: { id: LibraryId; className?: string }) {
  return <span aria-hidden className={cn("inline-block size-1.5 shrink-0 rounded-full", pipClass[id], className)} />;
}
