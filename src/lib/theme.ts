import type { Rarity } from "@/data/types";

/* ============================================================================
   Design 2.0 palette.

   Everything lives in the logo's violet family. The named accents below are
   deliberately close together in hue and value so a shelf of differently
   themed cards still reads as one premium surface instead of a rainbow — the
   accent only ever colours light (glow, wash, hairline), never a frame.
   ============================================================================ */

export type ThemeName =
  | "violet"
  | "magenta"
  | "gold"
  | "cyan"
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "gray";

export interface Accent {
  /** mid tone — hairlines, dots, fills */
  base: string;
  /** highlight — type, inner edge light */
  light: string;
  /** shadow tone — gradient tails */
  dark: string;
  /** "r,g,b" for rgba() glows */
  glow: string;
}

export const THEME: Record<ThemeName, Accent> = {
  /* the primary: logo violet */
  violet: { base: "#8b5cf6", light: "#cbb6ff", dark: "#230a4f", glow: "139,92,246" },
  /* lavender-pink highlight — the "exciting" accent */
  magenta: { base: "#cf3ce8", light: "#ffc9f2", dark: "#3d0b4a", glow: "207,60,232" },
  /* premium tier: warm lavender rather than gold */
  gold: { base: "#ef6adc", light: "#ffd6f5", dark: "#4a0f47", glow: "239,106,220" },
  /* cool accents, used sparingly */
  cyan: { base: "#56cffd", light: "#c2efff", dark: "#0b3a55", glow: "86,207,253" },
  blue: { base: "#6f8dff", light: "#c4cfff", dark: "#1a2270", glow: "111,141,255" },
  /* semantic */
  green: { base: "#3fdca4", light: "#b6f5dd", dark: "#0c4535", glow: "63,220,164" },
  red: { base: "#ff5f7a", light: "#ffc2cd", dark: "#4f0b20", glow: "255,95,122" },
  orange: { base: "#ffc978", light: "#ffe7c4", dark: "#4d2c0c", glow: "255,201,120" },
  gray: { base: "#8b81ae", light: "#d3cceb", dark: "#211c33", glow: "139,129,174" },
};

/** Rarity ramp — cool to warm, brightening toward mythic. No gold. */
export const RARITY: Record<Rarity, Accent & { label: string }> = {
  common: { base: "#8b81ae", light: "#d6d0ea", dark: "#1e1a2c", glow: "139,129,174", label: "Common" },
  uncommon: { base: "#3fdca4", light: "#b6f5dd", dark: "#0c3a2d", glow: "63,220,164", label: "Uncommon" },
  rare: { base: "#56cffd", light: "#c2efff", dark: "#0b3450", glow: "86,207,253", label: "Rare" },
  epic: { base: "#8b5cf6", light: "#cbb6ff", dark: "#2a0f5e", glow: "139,92,246", label: "Epic" },
  legendary: { base: "#ef6adc", light: "#ffd6f5", dark: "#45103f", glow: "239,106,220", label: "Legendary" },
  mythic: { base: "#ff9ae8", light: "#ffffff", dark: "#4d1250", glow: "255,154,232", label: "Mythic" },
};

export function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * The card surface: translucent violet glass with a directional wash of the
 * card's own accent in the top-left corner. One layer only — the accent lives
 * in the light, so cards of different themes still sit on the same material.
 */
export function surface(t: Accent, strength = 1) {
  return {
    background: `
      radial-gradient(120% 100% at 0% 0%, ${hexA(t.base, 0.2 * strength)} 0%, transparent 62%),
      linear-gradient(168deg, rgba(46,31,80,.7) 0%, rgba(17,12,32,.84) 52%, rgba(8,6,17,.92) 100%)
    `,
    borderColor: hexA(t.base, 0.22),
    boxShadow: `inset 0 1px 0 rgba(255,255,255,.14), 0 20px 46px -22px rgba(0,0,0,.92), 0 0 40px -16px ${hexA(t.base, 0.4 * strength)}`,
  } as const;
}

/** A quieter surface for dense grids — same material, half the light. */
export function surfaceQuiet(t: Accent) {
  return surface(t, 0.5);
}

/** Accent-tinted pill/chip fill. */
export function tint(t: Accent, a = 0.16) {
  return {
    background: `linear-gradient(180deg, ${hexA(t.base, a * 1.5)}, ${hexA(t.base, a * 0.6)})`,
    borderColor: hexA(t.base, 0.34),
    color: t.light,
  } as const;
}

/** Solid accent fill for primary actions. */
export function fill(t: Accent) {
  return {
    background: `linear-gradient(180deg, ${hexA(t.light, 0.95)} -40%, ${t.base} 34%, ${hexA(t.dark, 0.95)} 150%)`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,.42), inset 0 -1px 0 rgba(0,0,0,.3), 0 10px 26px -10px ${hexA(t.base, 0.8)}`,
  } as const;
}

/**
 * Tiled isometric-prism watermark — the logo's cube, reduced to a line motif.
 * Sits at very low opacity behind card content to give the glass a texture.
 */
export function prismField(hex: string) {
  const c = hex.replace("#", "%23");
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='84' viewBox='0 0 72 84'%3E%3Cg fill='none' stroke='${c}' stroke-width='1.1' stroke-linejoin='round'%3E%3Cpath d='M18 6l14 8v16l-14 8-14-8V14z'/%3E%3Cpath d='M18 14v16M18 14l14-8M18 14L4 6'/%3E%3Cpath d='M54 48l14 8v16l-14 8-14-8V56z'/%3E%3Cpath d='M54 56v16M54 56l14-8M54 56l-14-8'/%3E%3C/g%3E%3C/svg%3E")`;
}
