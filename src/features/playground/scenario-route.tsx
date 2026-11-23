import { notFound } from "next/navigation";
import { Explorer } from "@/features/playground/explorer";
import { isLibraryId } from "@/animations/libraries";
import { getScenario } from "@/animations/scenarios";
import { libraryIds, type ScenarioCategory } from "@/types/animation";
import { scenarios } from "@/animations/scenarios";

export function paramsFor(category: ScenarioCategory) {
  return scenarios
    .filter((scenario) => scenario.category === category)
    .flatMap((scenario) => libraryIds.map((library) => ({ library, scenario: scenario.id })));
}

export async function ScenarioRoute({
  category,
  params,
}: {
  category: ScenarioCategory;
  params: Promise<{ library: string; scenario: string }>;
}) {
  const { library, scenario } = await params;
  const definition = getScenario(scenario);
  if (!isLibraryId(library) || !definition || definition.category !== category) notFound();
  return <Explorer category={category} initialLibrary={library} scenario={scenario} />;
}
