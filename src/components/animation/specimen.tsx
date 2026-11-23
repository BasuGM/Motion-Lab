import { cn } from "cn";

export function Specimen({
  className,
  style,
  label = "ML",
}: {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "grid size-16 place-items-center bg-paper-ink text-paper",
        className,
      )}
      style={style}
    >
      <span className="font-mono text-[10px] tracking-[0.16em]">{label}</span>
    </div>
  );
}

export function PaperButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 border border-hairline bg-transparent px-3 text-sm text-paper-ink transition-colors duration-100 hover:bg-paper-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink"
    >
      {children}
    </button>
  );
}
