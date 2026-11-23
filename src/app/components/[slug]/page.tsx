import { scenariosIn } from "@/animations/scenarios";
import { Explorer } from "@/features/playground/explorer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return scenariosIn("component").map((scenario) => ({ slug: scenario.id }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = scenariosIn("component").find((item) => item.id === slug);
  if (!scenario) notFound();
  return <Explorer category="component" initialLibrary={scenario.supportedLibraries[0]} scenario={scenario.id} />;
}
