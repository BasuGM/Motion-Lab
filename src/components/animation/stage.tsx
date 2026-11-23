"use client";

import { Pause, Play, RotateCcw, Square } from "lucide-react";
import { useTimecode } from "@/hooks/use-timecode";
import { Pip } from "@/components/shared/pip";
import { getLibrary } from "@/animations/libraries";
import type { LibraryId } from "@/types/animation";
import { cn } from "cn";

function CropMarks() {
  const corner = "pointer-events-none absolute size-3 border-paper-ink/40";
  return (
    <>
      <span className={cn(corner, "top-3 left-3 border-t border-l")} />
      <span className={cn(corner, "top-3 right-3 border-t border-r")} />
      <span className={cn(corner, "bottom-3 left-3 border-b border-l")} />
      <span className={cn(corner, "bottom-3 right-3 border-b border-r")} />
    </>
  );
}

export function Stage({
  library,
  title,
  frame = "01",
  children,
  playing,
  playToken,
  onToggle,
  onReplay,
  onReset,
  showTransport = true,
  scroll = false,
  className,
}: {
  library: LibraryId;
  title: string;
  frame?: string;
  children: React.ReactNode;
  playing: boolean;
  playToken: number;
  onToggle: () => void;
  onReplay: () => void;
  onReset: () => void;
  showTransport?: boolean;
  scroll?: boolean;
  className?: string;
}) {
  const profile = getLibrary(library);

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === " ") {
      event.preventDefault();
      onToggle();
    }
    if (event.key === "r" || event.key === "R") {
      event.preventDefault();
      onReplay();
    }
  }

  return (
    <section
      aria-label={`${profile.name} ${title} stage`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "border border-hairline bg-paper text-paper-ink shadow-[var(--stage-shadow)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ink",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Pip id={library} />
          <span className="truncate text-sm">{profile.name}</span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.08em] text-paper-muted tabular-nums">
          {title} · {frame}
        </span>
      </div>
      <div className={cn("relative px-8 sm:px-12", scroll ? "h-[460px] py-6" : "min-h-[300px] py-12 sm:py-14")}>
        <CropMarks />
        <div className={cn("relative", scroll ? "h-full" : "flex min-h-[220px] items-center justify-center")}>{children}</div>
      </div>
      {showTransport ? (
        <div className="flex items-center gap-1 border-t border-hairline px-3 py-2">
          <TransportButton label={playing ? "Pause" : "Play"} onClick={onToggle}>
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </TransportButton>
          <TransportButton label="Replay" onClick={onReplay}>
            <RotateCcw className="size-4" />
          </TransportButton>
          <TransportButton label="Reset" onClick={onReset}>
            <Square className="size-3.5" />
          </TransportButton>
          <Timecode key={playToken} playing={playing} />
          <span className="hidden font-mono text-[10px] tracking-wide text-paper-muted sm:inline">
            <kbd className="border border-hairline px-1">Space</kbd>{" "}
            <kbd className="border border-hairline px-1">R</kbd>
          </span>
        </div>
      ) : null}
    </section>
  );
}

function Timecode({ playing }: { playing: boolean }) {
  const timecode = useTimecode(playing);
  return <span className="ml-auto font-mono text-[12px] text-paper-muted tabular-nums">{timecode}</span>;
}

function TransportButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center text-paper-ink transition-colors duration-100 hover:bg-paper-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink"
    >
      {children}
    </button>
  );
}
