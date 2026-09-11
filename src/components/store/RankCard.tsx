"use client";

import type { Rank } from "@/data/types";
import { THEME, cardSkinFlat, hexA, itemPattern } from "@/lib/theme";
import { BuyButton, IconButton } from "@/components/ui/Buttons";
import { CardBadge } from "@/components/ui/CardBadge";

/**
 * "Gamepass" row tile, 2-up per shelf: a bare, oversized icon on the left
 * (no frame — just a soft glow behind it), name/blurb/perks filling the
 * middle, and a bottom bar with the buy button parked on the right —
 * echoes the Gamepasses layout in Store_4.png. Kept to 2 columns (rather
 * than one full-width row) so the hover pop-out has room to scale up
 * without spilling past the panel edges.
 */
export function RankCard({ rank, onBuy }: { rank: Rank; onBuy: (r: Rank) => void }) {
  const t = THEME[rank.theme];

  return (
    <div className="relative flex flex-col pt-5">
      {rank.highlight && <CardBadge color={THEME.gold}>★ {rank.highlight}</CardBadge>}
      <div className="card-hover relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[14px] border-2" style={cardSkinFlat(t)}>
        <div className="pointer-events-none absolute inset-0 opacity-[.10]" style={{ backgroundImage: itemPattern(t.light), backgroundSize: "56px 56px" }} />
        <div className="anim-pulse-glow pointer-events-none absolute -top-12 -right-12 size-[180px] rounded-full blur-[55px] opacity-40" style={{ background: t.base }} />

        <div className="relative z-10 flex flex-1 items-start gap-4 p-4">
          <div className="relative grid size-[92px] shrink-0 place-items-center">
            <div className="anim-pulse-glow absolute inset-0 rounded-full blur-[22px]" style={{ background: hexA(t.base, 0.5) }} />
            <span className="relative text-[58px] leading-none" style={{ filter: `drop-shadow(0 3px 7px rgba(0,0,0,.6)) drop-shadow(0 0 14px ${hexA(t.base, .9)})` }}>
              {rank.icon}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display txt-stroke-sm text-[21px] leading-tight" style={{ color: t.light, textShadow: `0 0 14px ${hexA(t.base, .85)}` }}>
              {rank.name}
            </h3>
            <p className="mt-1 mb-2 text-[13.5px] leading-snug font-semibold text-white/80">{rank.blurb}</p>
            <ul className="space-y-1">
              {rank.perks.map((p) => (
                <li key={p} className="flex items-start gap-1.5 text-[13px] leading-tight font-semibold text-white/95">
                  <span className="mt-[4px] size-[5px] shrink-0 rounded-full" style={{ background: t.base, boxShadow: `0 0 5px ${hexA(t.base, .9)}` }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-2.5 border-t-2 border-black/50 bg-black/55 px-4 py-3">
          <div className="flex-1" />
          <IconButton title="Gift to a friend" theme="violet" size={46}><span className="text-[18px]">🎁</span></IconButton>
          <BuyButton price={rank.price} onClick={() => onBuy(rank)} height={46} fontSize={17} className="min-w-[170px]" />
        </div>
      </div>
    </div>
  );
}
