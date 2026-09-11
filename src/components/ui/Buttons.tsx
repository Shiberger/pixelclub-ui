"use client";

import type { ReactNode } from "react";
import type { Price } from "@/data/types";
import { THEME, type ThemeName, hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

const PRICE_ICON: Record<Price["kind"], string> = {
  point: "🪙",
};

export function formatPrice(p: Price) {
  return p.amount.toLocaleString("en-US");
}

/** The green price button that closes every purchasable card. */
export function BuyButton({
  price,
  label = "Buy",
  onClick,
  disabled,
  className,
  theme = "green",
  height = 42,
  fontSize = 16,
}: {
  price?: Price;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  theme?: ThemeName;
  /** Override the button's pixel height (and, by extension, its font/price size) — for scaling with an oversized card. */
  height?: number;
  fontSize?: number;
}) {
  const t = THEME[theme];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "pressable bevel-sm font-display txt-stroke-sm relative flex min-w-[132px] items-center justify-between gap-3 rounded-[9px] border-2 border-black/70 px-4 text-white disabled:pointer-events-none disabled:opacity-45 disabled:grayscale",
        className,
      )}
      style={{ background: `linear-gradient(180deg, ${t.light}, ${t.base} 52%, ${t.dark})`, height, fontSize }}
    >
      <span>{label}</span>
      {price && (
        <span className="flex items-center gap-1 tabular-nums">
          {price.was && (
            <s className="txt-stroke-xs mr-1 opacity-70" style={{ fontSize: fontSize * 0.75 }}>{formatPrice({ ...price, amount: price.was })}</s>
          )}
          {formatPrice(price)}
          <span style={{ WebkitTextStroke: "0", fontSize: fontSize * 0.8 }}>{PRICE_ICON[price.kind]}</span>
        </span>
      )}
    </button>
  );
}

/** Small square utility button (preview eye, gift, filters…). */
export function IconButton({
  children,
  onClick,
  theme = "violet",
  title,
  size = 42,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  theme?: ThemeName;
  title?: string;
  size?: number;
  className?: string;
}) {
  const t = THEME[theme];
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cn("pressable bevel-sm grid shrink-0 place-items-center rounded-[9px] border-2 border-black/70 text-white", className)}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(180deg, ${hexA(t.light, .95)}, ${t.base} 52%, ${t.dark})`,
      }}
    >
      {children}
    </button>
  );
}

/** Dark neutral button (Claim All, secondary actions). */
export function GhostButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "pressable bevel-sm font-display txt-stroke-sm h-[42px] rounded-[9px] border-2 border-black/70 bg-[linear-gradient(180deg,#5a5a6e,#33333f_55%,#22222c)] px-5 text-[16px] text-white disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}
