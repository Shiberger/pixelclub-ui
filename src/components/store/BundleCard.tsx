"use client";

import type { Bundle } from "@/data/types";
import { THEME, cardSkin, hexA } from "@/lib/theme";
import { ItemChip } from "@/components/ui/ItemChip";
import { BuyButton, IconButton } from "@/components/ui/Buttons";

export function BundleCard({ bundle, onBuy }: { bundle: Bundle; onBuy: (b: Bundle) => void }) {
  const t = THEME[bundle.theme];

  return (
    <div className="relative mb-4 rounded-[12px] border-2 pt-3 pb-0" style={cardSkin(t)}>
      {/* showcase artwork bleeding off the right edge */}
      {bundle.showcase && (
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[46%] overflow-hidden rounded-r-[10px]">
          {/* starburst behind the artwork, as on the reference cards */}
          <div
            className="anim-spin-slow absolute top-1/2 right-2 size-[330px] -translate-y-1/2 opacity-55"
            style={{
              background: `conic-gradient(from 0deg, ${hexA(t.light, .5)} 0deg 8deg, transparent 8deg 30deg, ${hexA(t.light, .35)} 30deg 36deg, transparent 36deg 60deg)`,
              maskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
            }}
          />
          <div
            className="anim-pulse-glow absolute top-1/2 right-10 size-[210px] -translate-y-1/2 rounded-full blur-[46px]"
            style={{ background: hexA(t.light, 0.5) }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bundle.showcase.src}
            alt=""
            className="anim-float absolute top-1/2 right-8 h-[158px] -translate-y-1/2 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,.8)]"
            loading="lazy"
          />
        </div>
      )}

      <div className="relative z-10 px-4">
        <div className="flex items-center gap-2">
          <h3
            className="font-display txt-stroke-sm text-[22px] leading-tight"
            style={{ color: t.light, textShadow: `0 0 14px ${hexA(t.base, 0.9)}` }}
          >
            {bundle.name}
          </h3>
          {bundle.badge && (
            <span className="txt-stroke-xs rounded-[5px] border border-black/60 px-1.5 py-[1px] text-[10px] font-black"
              style={{ background: `linear-gradient(180deg,${THEME.red.base},${THEME.red.dark})` }}>
              {bundle.badge}
            </span>
          )}
        </div>
        <p className="mb-2.5 text-[12.5px] font-semibold text-white/75">{bundle.tagline}</p>

        <div className="scroll-x no-scrollbar relative w-fit max-w-[72%] rounded-[9px] border border-white/10 bg-black/45 p-2">
          <div className="flex gap-1.5">
            {bundle.contents.map((c, i) => (
              <ItemChip key={`${c.id}-${i}`} stack={c} size={62} />
            ))}
          </div>
        </div>
      </div>

      {/* footer action bar */}
      <div className="relative z-10 mt-3 flex items-center gap-2 rounded-b-[10px] border-t-2 border-black/50 bg-black/55 px-3 py-2.5">
        <IconButton title="Preview contents" theme="cyan" onClick={() => onBuy(bundle)}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
          </svg>
        </IconButton>

        <div className="flex-1" />

        {bundle.purchasesLeft !== undefined && (
          <span className="mr-1 rounded-[5px] bg-black/70 px-2 py-[3px] text-[11px] font-bold text-[var(--text-mid)]">
            Purchases Left: {bundle.purchasesLeft}
          </span>
        )}
        <IconButton title="Gift to a friend" theme="violet">
          <span className="text-[17px]">🎁</span>
        </IconButton>
        <BuyButton price={bundle.price} onClick={() => onBuy(bundle)} className="min-w-[150px]" />
      </div>
    </div>
  );
}
