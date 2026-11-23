"use client";

import { useState } from "react";
import { toast } from "sonner";

export function CodePanel({ code, label = "tsx" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Snippet copied");
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="overflow-hidden border border-hairline-ink bg-code text-paper">
      <div className="flex items-center justify-between border-b border-hairline-ink px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">{label}</span>
        <button
          type="button"
          onClick={() => void copy()}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-ink"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto p-4 font-mono text-[13px] leading-6">
        {lines.map((line, index) => (
          <div key={`${index}-${line}`} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
            <span className="text-right text-paper/30 tabular-nums">{index + 1}</span>
            <code className="whitespace-pre">{line.length > 0 ? line : " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
