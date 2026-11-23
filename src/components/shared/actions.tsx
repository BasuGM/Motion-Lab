import Link from "next/link";
import { cn } from "cn";

const tones = {
  primary:
    "bg-signal text-ink hover:bg-signal/90",
  quiet:
    "border border-border bg-transparent text-foreground hover:bg-muted",
  paper:
    "border border-hairline bg-transparent text-paper-ink hover:bg-paper-ink/5",
} as const;

const base =
  "inline-flex h-10 items-center justify-center px-4 text-sm font-medium transition-colors duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink disabled:opacity-50";

export function ActionLink({
  href,
  tone = "primary",
  className,
  children,
  onClick,
}: {
  href: string;
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link href={href} className={cn(base, tones[tone], className)} onClick={onClick}>
      {children}
    </Link>
  );
}

export function ActionButton({
  tone = "paper",
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { tone?: keyof typeof tones }) {
  return <button type={type} className={cn(base, tones[tone], className)} {...props} />;
}
