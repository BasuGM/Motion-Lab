import type { Metadata } from "next";
import { Explorer } from "@/features/playground/explorer";

export const metadata: Metadata = { title: "Advanced" };

export default function AdvancedPage() {
  return <Explorer category="advanced" initialLibrary="gsap" scenario="scroll" />;
}
