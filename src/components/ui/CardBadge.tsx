"use client";

import type { ReactNode } from "react";
import { hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Small ribbon-style label ("HIGHLY Recommended!", "BEST Value!") that
 * overlaps the top edge of its card instead of sitting in normal flow
 * above it — so its presence/absence never shifts the card's height or
 * throws off row alignment with sibling cards.
 *
 * Render it as a sibling of the card, inside a `relative` wrapper that
 * reserves `pt-5` above the card — NOT inside the card's own
 * `overflow-hidden` box, which would clip the part of the badge poking
 * above the card's top border. `top-0` here lines up with the top of
 * that reserved padding, letting the badge dip a few px into the card.
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
        "absolute top-0 left-4 z-30 rounded-full border-2 border-black/70 bg-black/75 px-3 py-[3px] backdrop-blur-[1px]",
        className,
      )}
      style={{ boxShadow: `0 0 10px ${hexA(color.base, .55)}, 0 2px 4px rgba(0,0,0,.6)` }}
    >
      <span
        className="txt-stroke-xs text-[12px] leading-none font-black whitespace-nowrap"
        style={{ color: color.light, textShadow: `0 0 6px ${hexA(color.base, 1)}, 0 0 14px ${hexA(color.base, .85)}` }}
      >
        {children}
      </span>
    </div>
  );
}
