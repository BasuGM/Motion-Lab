import type { LibraryId } from "@/types/animation";

export interface BundleRow {
  library: LibraryId;
  raw: number;
  gzip: number;
  workload: string;
}

export const bundleData: BundleRow[] = [
  {
    "library": "motion",
    "raw": 141847,
    "gzip": 48790,
    "workload": "fade one box"
  },
  {
    "library": "gsap",
    "raw": 72346,
    "gzip": 28481,
    "workload": "fade one box"
  },
  {
    "library": "react-spring",
    "raw": 43783,
    "gzip": 17778,
    "workload": "fade one box"
  },
  {
    "library": "lottie",
    "raw": 322329,
    "gzip": 84491,
    "workload": "player plus one clip"
  },
  {
    "library": "auto-animate",
    "raw": 12923,
    "gzip": 5144,
    "workload": "list helper, not a fade"
  }
];

export const measuredAt: string = "2026-11-23T12:24:15.657Z";
