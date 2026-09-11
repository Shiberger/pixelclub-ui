"use client";

import type { Pack } from "@/data/types";
import { THEME, cardSkin, hexA } from "@/lib/theme";
import { BuyButton, IconButton } from "@/components/ui/Buttons";

export function PackCard({ pack, onBuy }: { pack: Pack; onBuy: (p: Pack) => void }) {
  const t = THEME[pack.theme];
  const best = pack.valueTag === "BEST Value!";

  return (
    <div>
      <div
        className="txt-stroke-xs h-[16px] text-[12px] font-black"
        style={{ color: best ? THEME.gold.light : THEME.cyan.light }}
      >
        {pack.valueTag ?? ""}
      </div>
      <div className="overflow-hidden rounded-[12px] border-2" style={cardSkin(t)}>
        <div className="relative h-[108px] px-3 pt-2">
          <h3 className="font-display txt-stroke-sm text-[18px] leading-tight" style={{ color: t.light, textShadow: `0 0 12px ${hexA(t.base, .9)}` }}>
            {pack.name}
          </h3>
          <p className="text-[11.5px] font-semibold text-white/70">{pack.blurb}</p>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center">
            <div className="anim-pulse-glow absolute bottom-0 size-[120px] rounded-full blur-[34px]" style={{ background: hexA(t.light, .5) }} />
            {pack.sprite ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pack.sprite} alt="" className="pixelated relative h-[66px] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,.8)]" loading="lazy" />
            ) : (
              <span className="relative text-[48px]">{pack.emoji}</span>
            )}
            <span className="font-display txt-stroke-sm relative -ml-2 mb-1 text-[19px] text-white">
              {pack.qty.toLocaleString("en-US")}x
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t-2 border-black/50 bg-black/55 px-2.5 py-2">
          <IconButton title="Gift to a friend" theme="violet" size={36}><span className="text-[15px]">🎁</span></IconButton>
          <BuyButton price={pack.price} onClick={() => onBuy(pack)} height={36} fontSize={15} className="min-w-0 flex-1" />
        </div>
      </div>
    </div>
  );
}
