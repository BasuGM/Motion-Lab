export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-[1200px] px-6 pt-12 pb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-foreground/75">{lede}</p>
    </header>
  );
}
