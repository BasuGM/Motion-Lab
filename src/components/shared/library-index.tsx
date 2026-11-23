import Link from "next/link";
import { libraries } from "@/animations/libraries";
import { scenarios } from "@/animations/scenarios";
import { Pip } from "@/components/shared/pip";

const capabilities = [
  ["Gestures and layout", "Motion"],
  ["Timelines and scroll", "GSAP"],
  ["Physics", "React Spring"],
  ["Authored vector playback", "Lottie"],
  ["List and layout changes", "AutoAnimate"],
];

export function LibraryIndex() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-20">
      <ul className="border-y border-border">
        {libraries.map((library) => (
          <li key={library.id} className="border-b border-border last:border-b-0">
            <Link href={library.entry} className="grid gap-2 py-4 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
              <span className="flex items-center gap-3 font-medium">
                <Pip id={library.id} />
                {library.name}
              </span>
              <span className="text-foreground/70">{library.purpose}</span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Open</span>
            </Link>
          </li>
        ))}
      </ul>
      <dl className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {capabilities.map(([label, library]) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border py-3">
            <dt className="text-foreground/80">{label}</dt>
            <dd className="font-mono text-[12px] text-muted-foreground">{library}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 max-w-[62ch] text-sm text-muted-foreground">
        {scenarios.length} scenarios. Comparable pieces sit side by side. Signature pieces stay with the library that earns them.
      </p>
    </div>
  );
}
