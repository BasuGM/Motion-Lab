import { paramsFor, ScenarioRoute } from "@/features/playground/scenario-route";

export function generateStaticParams() {
  return paramsFor("playground");
}

export default function Page({ params }: { params: Promise<{ library: string; scenario: string }> }) {
  return <ScenarioRoute category="playground" params={params} />;
}
