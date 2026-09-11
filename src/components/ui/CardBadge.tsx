"use client";

import type { ReactNode } from "react";
import { hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Overlapping label ("Recommended", "Best value") — a soft tinted pill riding
 * the card's top edge. Rendered as a sibling of the card inside a `relative`
 * wrapper that reserves `pt-4`, so its presence never changes card height.
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
    <div
      className={cn(
        "absolute top-0 left-5 z-30 rounded-full border px-3 py-[5px] backdrop-blur-md",
        className,
      )}
      style={{
        background: `linear-gradient(180deg, ${hexA(color.base, 0.42)}, ${hexA(color.base, 0.2)})`,
        borderColor: hexA(color.light, 0.42),
        boxShadow: `0 8px 18px -8px ${hexA(color.base, 0.9)}`,
      }}
    >
      <span
        className="text-[10.5px] leading-none font-bold tracking-[0.1em] whitespace-nowrap uppercase"
        style={{ color: color.light }}
      >
        {children}
      </span>
    </div>
  );
}
