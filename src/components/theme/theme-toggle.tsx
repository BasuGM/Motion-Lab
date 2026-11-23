"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "cn";

const options = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
] as const;

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ labels = false }: { labels?: boolean }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div role="radiogroup" aria-label="Color theme" className={cn("flex border border-border", labels && "w-full")}>
      {options.map(({ id, label, icon: Icon }) => {
        const active = mounted && theme === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(id)}
            className={cn(
              "inline-flex h-8 items-center justify-center gap-2 text-foreground/70 transition-colors duration-100 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink",
              labels ? "flex-1 px-3 text-sm" : "size-8",
              active && "bg-muted text-foreground",
            )}
          >
            <Icon className="size-3.5" />
            {labels ? label : null}
          </button>
        );
      })}
    </div>
  );
}
