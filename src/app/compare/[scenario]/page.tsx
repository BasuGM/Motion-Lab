import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScenario, scenarios } from "@/animations/scenarios";
import { PageHeader } from "@/components/layout/page-header";
import { CompareBoard } from "@/features/comparison/compare-board";

export function generateStaticParams() {
  return scenarios.filter((scenario) => scenario.comparable).map((scenario) => ({ scenario: scenario.id }));
}

export const metadata: Metadata = { title: "Compare" };

export default async function ComparePage({ params }: { params: Promise<{ scenario: string }> }) {
  const { scenario } = await params;
  const definition = getScenario(scenario);
  if (!definition?.comparable) notFound();
  return (
    <div>
      <PageHeader
        eyebrow="Compare"
        title={definition.title}
        lede="Two or three implementations of the same brief. Lines and complexity come from the snippet you can read, not from a generated score."
      />
      <CompareBoard scenario={scenario} />
    </div>
  );
}
