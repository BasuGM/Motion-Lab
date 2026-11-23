import { ActionLink } from "@/components/shared/actions";
import type { Exclusion } from "@/types/animation";

export function NotAFit({ exclusion, onSamePage }: { exclusion: Exclusion; onSamePage?: () => void }) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-6 text-center">
      <p className="font-serif text-3xl text-paper-ink">Not a fit</p>
      <p className="mt-3 text-sm leading-relaxed text-paper-muted">{exclusion.reason}</p>
      <ActionLink
        href={exclusion.href}
        tone="paper"
        className="mt-5"
        onClick={
          onSamePage
            ? (event) => {
                event.preventDefault();
                onSamePage();
              }
            : undefined
        }
      >
        {exclusion.label}
      </ActionLink>
    </div>
  );
}
