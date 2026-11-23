import type { Metadata } from "next";
import { Explorer } from "@/features/playground/explorer";

export const metadata: Metadata = { title: "Playground" };

export default function PlaygroundPage() {
  return <Explorer category="playground" initialLibrary="motion" scenario="fade" />;
}
