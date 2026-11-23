"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "cn";

const nav = [
  { href: "/playground", label: "Playground" },
  { href: "/components", label: "Components" },
  { href: "/advanced", label: "Advanced" },
  { href: "/compare", label: "Compare" },
  { href: "/studio", label: "Studio" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/docs", label: "Docs" },
];

function active(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-6 px-6">
        <Link href="/" className="font-serif text-xl tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ink">
          MotionLab
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-foreground/70 transition-colors duration-100 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ink",
                active(pathname, item.href) && "text-foreground underline decoration-signal-ink decoration-2 underline-offset-8",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {reduced ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal-ink">Motion reduced</span>
          ) : null}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="grid size-10 place-items-center text-foreground lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl text-foreground">MotionLab</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4" aria-label="Mobile">
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} className="text-lg text-foreground">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="px-4">
                <ThemeToggle labels />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
