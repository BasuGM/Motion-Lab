import type { Metadata } from "next";
import { Explorer } from "@/features/playground/explorer";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsPage() {
  return <Explorer category="component" initialLibrary="motion" scenario="ui-button" />;
}
