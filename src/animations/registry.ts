import { getScenario, scenarios, supports } from "@/animations/scenarios";
import { getSnippet } from "@/animations/snippets";
import type { LibraryId, SnippetRecord } from "@/types/animation";

export function implementation(scenarioId: string, library: LibraryId): SnippetRecord | undefined {
  const scenario = getScenario(scenarioId);
  if (!scenario || !supports(scenario, library)) {
    return undefined;
  }
  return getSnippet(scenarioId, library);
}

export function missingSnippets(): string[] {
  const missing: string[] = [];
  for (const scenario of scenarios) {
    for (const library of scenario.supportedLibraries) {
      if (!getSnippet(scenario.id, library)) {
        missing.push(`${scenario.id}:${library}`);
      }
    }
  }
  return missing;
}
