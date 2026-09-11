"use client";

import type { ReactNode } from "react";
import type { Price } from "@/data/types";
import { THEME, type ThemeName, fill, hexA } from "@/lib/theme";
import { PointToken } from "./icons";
import { cn } from "@/lib/cn";

export function formatPrice(p: Price) {
  return p.amount.toLocaleString("en-US");
}

/**
 * The primary action: a filled violet pill. The price sits in its own recessed
 * capsule on the right so the label stays readable at a glance, and a single
 * slow specular pass keeps it feeling alive without shouting.
 */
export function BuyButton({
  price,
  label = "Buy",
  onClick,
  disabled,
  className,
  theme = "violet",
  height = 44,
  fontSize = 15,
}: {
  price?: Price;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  theme?: ThemeName;
  height?: number;
  fontSize?: number;
}) {
  const t = THEME[theme];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "press sheen ring-focus font-display relative flex min-w-[136px] items-center justify-center gap-3 rounded-full px-5 text-white",
        "disabled:pointer-events-none disabled:opacity-40 disabled:saturate-50",
        className,
      )}
      style={{ ...fill(t), height, fontSize, fontWeight: 600 }}
    >
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      {price && (
        <span
          className="num relative z-10 flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
          style={{ background: hexA("#1a0b33", 0.42), fontSize: fontSize * 0.95 }}
        >
          {price.was && (
            <s className="opacity-55" style={{ fontSize: fontSize * 0.78 }}>
              {formatPrice({ ...price, amount: price.was })}
            </s>
          )}
          {formatPrice(price)}
          <PointToken size={fontSize * 1.05} />
        </span>
      )}
    </button>
  );
}

/** Circular glass utility button — preview, gift, paging. */
export function IconButton({
  children,
  onClick,
  theme = "violet",
  title,
  size = 44,
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
      className={cn(
        "press ring-focus grid shrink-0 place-items-center rounded-full border transition-colors",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(180deg, ${hexA(t.base, 0.24)}, ${hexA(t.base, 0.08)})`,
        borderColor: hexA(t.base, 0.36),
        color: t.light,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.16), 0 8px 20px -12px ${hexA(t.base, 0.8)}`,
      }}
    >
      {children}
    </button>
  );
}

/** Neutral glass pill for secondary actions. */
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
        "press ring-focus glass-tile font-display h-11 rounded-full px-5 text-[14px] text-[var(--text-mid)]",
        "hover:text-white disabled:pointer-events-none disabled:opacity-35",
        className,
      )}
    >
      {children}
    </button>
  );
}
