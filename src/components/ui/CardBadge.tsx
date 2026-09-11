"use client";

import type { ReactNode } from "react";
import { hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * A small tinted pill that rides inline in the card's kicker row — "BUNDLE ·
 * HOT", "TIER 6 · Highly recommended" — instead of overlapping the card's top
 * edge. Keeps the badge legible without needing extra reserved space above
 * the card or risking it colliding with the heading underneath it.
 */
export function CardBadge({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color: { base: string; light: string };
  className?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-3 w-px bg-white/15" aria-hidden />
      <span
        className={cn(
          "rounded-full border px-2 py-[3px] text-[10px] leading-none font-bold tracking-[0.08em] whitespace-nowrap uppercase",
          className,
        )}
        style={{
          background: `linear-gradient(180deg, ${hexA(color.base, 0.4)}, ${hexA(color.base, 0.18)})`,
          borderColor: hexA(color.light, 0.42),
          color: color.light,
        }}
      >
        {children}
      </span>
    </span>
  );
}
