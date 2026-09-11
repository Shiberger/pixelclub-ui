"use client";

import type { Pack } from "@/data/types";
import { THEME, type ThemeName, hexA, surfaceQuiet } from "@/lib/theme";
import { BuyButton, IconButton } from "@/components/ui/Buttons";
import { CardBadge } from "@/components/ui/CardBadge";
import { Bloom } from "@/components/ui/Motif";
import { GiftIcon } from "@/components/ui/icons";

/** One accent per product group, so each shelf reads as a single section. */
const GROUP_THEME: Record<string, ThemeName> = {
  Keys: "violet",
  Enchants: "magenta",
  Skins: "gold",
  Boosters: "cyan",
  "Claim Protection": "green",
};

export function PackCard({ pack, onBuy }: { pack: Pack; onBuy: (p: Pack) => void }) {
  const theme = GROUP_THEME[pack.group] ?? "violet";
  const t = THEME[theme];
  const best = pack.valueTag === "BEST Value!";

  return (
    <div className="relative pt-6">
      {pack.valueTag && (
        <CardBadge color={best ? THEME.magenta : THEME.cyan}>{best ? "Best value" : "Higher value"}</CardBadge>
      )}

      <div className="lift group relative overflow-hidden rounded-[22px] border" style={surfaceQuiet(t)}>
        {/* art stage */}
        <div className="relative h-[168px] overflow-hidden">
          <Bloom tone={t} size={190} opacity={0.4} className="bottom-[-40px] left-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 flex items-end justify-center pb-3">
            {pack.sprite ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pack.sprite}
                alt=""
                className="relative h-[124px] rounded-2xl object-contain ring-1 ring-white/10 drop-shadow-[0_12px_22px_rgba(0,0,0,.75)] transition-transform duration-300 group-hover:scale-[1.07]"
                loading="lazy"
              />
            ) : (
              <span className="relative text-[74px] transition-transform duration-300 group-hover:scale-[1.07]">
                {pack.emoji}
              </span>
            )}
          </div>

          <span
            className="num absolute top-3 right-3 rounded-full border px-2.5 py-1 text-[12px] leading-none font-bold backdrop-blur-md"
            style={{ borderColor: hexA(t.base, 0.4), background: hexA(t.dark, 0.5), color: t.light }}
          >
            ×{pack.qty.toLocaleString("en-US")}
          </span>
        </div>

        {/* copy */}
        <div className="relative px-4 pb-1">
          <h3 className="font-display-bold truncate text-[15px] leading-tight text-white" title={pack.name}>
            {pack.name}
          </h3>
          <p className="mt-1 line-clamp-2 h-[34px] text-[12px] leading-snug text-[var(--text-lo)]">{pack.blurb}</p>
        </div>

        <div className="relative mt-2 flex items-center gap-2.5 border-t border-white/8 bg-black/20 px-4 py-3">
          <IconButton title="Gift to a friend" theme="violet" size={38}>
            <GiftIcon className="size-4" />
          </IconButton>
          <BuyButton price={pack.price} onClick={() => onBuy(pack)} height={42} fontSize={14} theme={theme} className="min-w-0 flex-1" />
        </div>
      </div>
    </div>
  );
}
