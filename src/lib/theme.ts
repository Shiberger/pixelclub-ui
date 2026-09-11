import type { Rarity } from "@/data/types";

/** Accent ramps used by cards, borders and glows. */
export type ThemeName = "green" | "magenta" | "orange" | "cyan" | "gold" | "red" | "violet";

export const THEME: Record<ThemeName, { base: string; light: string; dark: string; glow: string }> = {
  green:   { base: "#7ed321", light: "#b6f552", dark: "#2f6b00", glow: "126,211,33" },
  magenta: { base: "#c026d3", light: "#f472ff", dark: "#5b0e6b", glow: "192,38,211" },
  orange:  { base: "#fb923c", light: "#fdba74", dark: "#7c2d12", glow: "251,146,60" },
  cyan:    { base: "#22d3ee", light: "#7ef0ff", dark: "#0e5568", glow: "34,211,238" },
  gold:    { base: "#fbbf24", light: "#fde68a", dark: "#78500a", glow: "251,191,36" },
  red:     { base: "#ef2b45", light: "#ff7d8d", dark: "#7a0d1c", glow: "239,43,69" },
  violet:  { base: "#8b5cf6", light: "#c4b5fd", dark: "#3b1b78", glow: "139,92,246" },
};

export const RARITY: Record<Rarity, { base: string; light: string; dark: string; glow: string; label: string }> = {
  common:    { base: "#9aa3b2", light: "#cbd5e1", dark: "#39404d", glow: "154,163,178", label: "Common" },
  uncommon:  { base: "#4ade80", light: "#a7f3c6", dark: "#14532d", glow: "74,222,128", label: "Uncommon" },
  rare:      { base: "#38bdf8", light: "#bae6fd", dark: "#0c4a6e", glow: "56,189,248", label: "Rare" },
  epic:      { base: "#c084fc", light: "#e9d5ff", dark: "#4c1d95", glow: "192,132,252", label: "Epic" },
  legendary: { base: "#fbbf24", light: "#fef08a", dark: "#713f12", glow: "251,191,36", label: "Legendary" },
  mythic:    { base: "#fb5a7d", light: "#fecdd3", dark: "#7f1d3a", glow: "251,90,125", label: "Mythic" },
};

/** Inline style object producing the signature gradient-card look. */
export function cardSkin(t: { base: string; light: string; dark: string; glow: string }, opacity = 1) {
  return {
    background: `linear-gradient(150deg, ${hexA(t.base, 0.34 * opacity)} 0%, ${hexA(t.dark, 0.5 * opacity)} 45%, rgba(8,8,14,.94) 100%)`,
    borderColor: hexA(t.base, 0.9),
    boxShadow: `inset 0 1px 0 ${hexA(t.light, 0.45)}, inset 0 -2px 0 rgba(0,0,0,.55), 0 0 18px rgba(${t.glow},.28), 0 6px 16px rgba(0,0,0,.6)`,
  } as const;
}

/**
 * Calmer card background for smaller, densely-packed cards (ranks, item
 * packs) — a faint top wash instead of a full saturated gradient, so a grid
 * of differently-themed cards reads as one coherent panel instead of a
 * clashing rainbow.
 */
export function cardSkinFlat(t: { base: string; light: string; dark: string; glow: string }, opacity = 1) {
  return {
    background: `linear-gradient(165deg, ${hexA(t.base, 0.16 * opacity)} 0%, ${hexA(t.dark, 0.4 * opacity)} 55%, rgba(9,9,14,.97) 100%)`,
    borderColor: hexA(t.base, 0.55),
    boxShadow: `inset 0 1px 0 ${hexA(t.light, 0.22)}, inset 0 -2px 0 rgba(0,0,0,.5), 0 4px 14px rgba(0,0,0,.55)`,
  } as const;
}

/** Faint tiled diamond motif used as a decorative watermark behind card content. */
export function itemPattern(hex: string) {
  const c = hex.replace("#", "%23");
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='${c}' stroke-width='1.6'%3E%3Cpath d='M16 4l11 11-11 11L5 15z'/%3E%3Cpath d='M49 34l11 11-11 11-11-11z'/%3E%3C/g%3E%3C/svg%3E")`;
}

export function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
