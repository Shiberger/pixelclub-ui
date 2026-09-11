"use client";

import type { Pack } from "@/data/types";
import { THEME, type ThemeName, cardSkinFlat, hexA, itemPattern } from "@/lib/theme";
import { BuyButton, IconButton } from "@/components/ui/Buttons";
import { CardBadge } from "@/components/ui/CardBadge";

/**
 * One accent per product group instead of per pack — a shelf of "Keys" (say)
 * reads as one coherent green section instead of a random magenta/green/cyan
 * jumble, matching how the reference groups everything under one theme.
 */
const GROUP_THEME: Record<string, ThemeName> = {
  Keys: "green",
  Enchants: "violet",
  Skins: "magenta",
  Boosters: "cyan",
  "Claim Protection": "gold",
};

export function PackCard({ pack, onBuy }: { pack: Pack; onBuy: (p: Pack) => void }) {
  const t = THEME[GROUP_THEME[pack.group] ?? pack.theme];
  const best = pack.valueTag === "BEST Value!";

  return (
    <div className="relative pt-5">
      {pack.valueTag && <CardBadge color={best ? THEME.gold : THEME.cyan}>{pack.valueTag}</CardBadge>}
      <div className="card-hover relative overflow-hidden rounded-[14px] border-2" style={cardSkinFlat(t)}>
        <div className="pointer-events-none absolute inset-0 opacity-[.10]" style={{ backgroundImage: itemPattern(t.light), backgroundSize: "52px 52px" }} />
        <div className="anim-pulse-glow pointer-events-none absolute -top-10 -right-10 size-[140px] rounded-full blur-[46px] opacity-40" style={{ background: t.base }} />

        <div className="relative z-10 h-[188px] px-3.5 pt-3">
          <h3 className="font-display txt-stroke-sm text-[19px] leading-tight" style={{ color: t.light, textShadow: `0 0 12px ${hexA(t.base, .9)}` }}>
            {pack.name}
          </h3>
          <p className="text-[13px] font-semibold text-white/78">{pack.blurb}</p>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center">
            <div className="anim-pulse-glow absolute bottom-0 size-[170px] rounded-full blur-[40px]" style={{ background: hexA(t.light, .5) }} />
            {pack.sprite ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pack.sprite} alt="" className="pixelated relative h-[104px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,.8)]" loading="lazy" />
            ) : (
              <span className="relative text-[68px]">{pack.emoji}</span>
            )}
            <span className="font-display txt-stroke-sm relative -ml-2 mb-2 text-[22px] text-white">
              {pack.qty.toLocaleString("en-US")}x
            </span>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 border-t-2 border-black/50 bg-black/55 px-3 py-3.5">
          <IconButton title="Gift to a friend" theme="violet" size={50}><span className="text-[19px]">🎁</span></IconButton>
          <BuyButton price={pack.price} onClick={() => onBuy(pack)} height={50} fontSize={18} className="min-w-0 flex-1" />
        </div>
      </div>
    </div>
  );
}
