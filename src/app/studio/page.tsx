import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { StudioScreen } from "@/features/configuration/studio-screen";

export const metadata: Metadata = { title: "Studio" };

export default function StudioPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Studio"
        title="Turn the knobs that exist."
        lede="The inspector changes with the library. AutoAnimate has no playhead. Lottie will not grow a new gesture because you dragged a slider."
      />
      <StudioScreen />
    </div>
  );
}
