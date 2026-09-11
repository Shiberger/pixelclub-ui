"use client";

import type { Rank } from "@/data/types";
import { type Accent, THEME, type ThemeName, hexA, prismField, surfaceQuiet } from "@/lib/theme";
import { BuyButton, IconButton } from "@/components/ui/Buttons";
import { CardBadge } from "@/components/ui/CardBadge";
import { Bloom, CaptureMark, PrismMark } from "@/components/ui/Motif";
import { GiftIcon } from "@/components/ui/icons";

/**
 * One accent per section, not per tier: a shelf of individually coloured ranks
 * reads as noise. "Ranks" runs violet, "Pixel Prime" runs ice — the tier
 * itself is communicated by the badge, the name and the price.
 */
const GROUP_THEME: Record<string, ThemeName> = {
  Ranks: "violet",
  "Pixel Prime": "cyan",
};

/**
 * The tier emblem — a prism held inside the capture ring, with one pip per
 * tier. Built from the motif rather than an emoji: the emoji set the data
 * carries (⭐🌌🌠🌑) reads as a row of unrelated stickers, and some render as
 * dark rectangles that fight the violet capsule.
 */
function RankEmblem({ tier, tone, size = 84 }: { tier: number; tone: Accent; size?: number }) {
  const pips = Math.min(tier, 6);
  /** higher tiers carry more light and a wider ring, so the shelf reads as a ladder */
  const lift = pips / 6;

  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <Bloom tone={tone} size={size * 1.1} opacity={0.28 + 0.32 * lift} className="inset-0 m-auto" />
      {pips >= 5 && (
        <CaptureMark size={size * 1.22} tone={tone} strokeWidth={0.4} className="absolute opacity-45" />
      )}
      <div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: hexA(tone.base, 0.45),
          background: `radial-gradient(120% 120% at 30% 18%, ${hexA(tone.light, 0.38)}, ${hexA(tone.dark, 0.88)} 72%)`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.35), inset 0 -8px 18px rgba(0,0,0,.45)",
        }}
      />
      <CaptureMark size={size} tone={tone} strokeWidth={0.5} className="absolute opacity-70" />
      <PrismMark
        size={size * (0.4 + 0.1 * lift)}
        tone={{ ...tone, base: tone.light }}
        strokeWidth={1.1}
        className="relative -translate-y-[6%]"
      />

      <div className="absolute bottom-[13%] flex gap-[3px]">
        {Array.from({ length: pips }, (_, i) => (
          <span
            key={i}
            className="size-[4px] rounded-full"
            style={{ background: tone.light, boxShadow: `0 0 5px ${hexA(tone.light, 0.9)}` }}
          />
        ))}
      </div>
    </div>
  );
}

export function RankCard({ rank, tier, onBuy }: { rank: Rank; tier: number; onBuy: (r: Rank) => void }) {
  const theme = GROUP_THEME[rank.group] ?? "violet";
  const t = THEME[theme];
  const isRank = rank.group === "Ranks";

  return (
    <div className="relative flex flex-col pt-7">
      {rank.highlight && <CardBadge color={THEME.magenta}>{rank.highlight}</CardBadge>}

      <div className="lift relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border" style={surfaceQuiet(t)}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[.05]"
          style={{ backgroundImage: prismField(t.light), backgroundSize: "72px 84px" }}
          aria-hidden
        />

        <div className="relative flex flex-1 items-start gap-4 p-5">
          <RankEmblem tier={tier} tone={t} />

          <div className="min-w-0 flex-1">
            <div className="kicker mb-1 leading-none">{isRank ? `Tier ${tier}` : "Membership"}</div>
            <h3 className="font-display-bold text-[21px] leading-tight text-white">{rank.name}</h3>
            <p className="mt-1 mb-3 text-[13px] leading-snug text-[var(--text-mid)]">{rank.blurb}</p>
            <ul className="space-y-1.5">
              {rank.perks.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[12.5px] leading-snug text-white/85">
                  <CaptureMark size={12} tone={t} strokeWidth={2.6} className="mt-[3px] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative flex items-center gap-2.5 border-t border-white/8 bg-black/20 px-5 py-3.5">
          <IconButton title="Gift to a friend" theme="violet" size={40}>
            <GiftIcon className="size-[18px]" />
          </IconButton>
          <div className="flex-1" />
          <BuyButton price={rank.price} onClick={() => onBuy(rank)} height={44} fontSize={15} theme={theme} className="min-w-[168px]" />
        </div>
      </div>
    </div>
  );
}
