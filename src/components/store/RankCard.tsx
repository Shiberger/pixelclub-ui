"use client";

import type { Rank } from "@/data/types";
import { THEME, cardSkin, hexA } from "@/lib/theme";
import { BuyButton, IconButton } from "@/components/ui/Buttons";
import { cn } from "@/lib/cn";

export function RankCard({ rank, wide, onBuy }: { rank: Rank; wide?: boolean; onBuy: (r: Rank) => void }) {
  const t = THEME[rank.theme];

  return (
    <div className={cn("flex flex-col", wide && "col-span-2")}>
      {rank.highlight && (
        <div className="txt-stroke-xs mb-0.5 text-[12px] font-black" style={{ color: THEME.gold.light }}>
          {rank.highlight}
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border-2" style={cardSkin(t)}>
        <div className="flex flex-1 items-start gap-3 p-3">
          <div
            className="anim-pulse-glow grid size-[74px] shrink-0 place-items-center rounded-[10px] text-[40px]"
            style={{ background: hexA(t.base, 0.2), boxShadow: `0 0 22px ${hexA(t.base, 0.8)}` }}
          >
            {rank.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display txt-stroke-sm text-[21px] leading-tight" style={{ color: t.light, textShadow: `0 0 14px ${hexA(t.base, .9)}` }}>
              {rank.name}
            </h3>
            <p className="mb-1.5 text-[12.5px] font-semibold text-white/75">{rank.blurb}</p>
            <ul className="space-y-[2px]">
              {rank.perks.map((p) => (
                <li key={p} className="text-[12px] font-semibold text-white/90">• {p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t-2 border-black/50 bg-black/55 px-3 py-2.5">
          <div className="flex-1" />
          <IconButton title="Gift to a friend" theme="violet"><span className="text-[17px]">🎁</span></IconButton>
          <BuyButton price={rank.price} onClick={() => onBuy(rank)} className="min-w-[150px]" />
        </div>
      </div>
    </div>
  );
}
