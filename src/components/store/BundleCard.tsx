"use client";

import type { Bundle } from "@/data/types";
import { THEME, cardSkin, hexA } from "@/lib/theme";
import { ItemChip } from "@/components/ui/ItemChip";
import { BuyButton, IconButton } from "@/components/ui/Buttons";

export function BundleCard({ bundle, onBuy }: { bundle: Bundle; onBuy: (b: Bundle) => void }) {
  const t = THEME[bundle.theme];

  return (
    <div className="relative mt-2 mb-7 rounded-[12px] border-2 pt-3 pb-0" style={cardSkin(t)}>
      {/* showcase artwork — the hero draw, sized to dominate the card and pop past its edges */}
      {bundle.showcase && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[54%] overflow-hidden rounded-r-[10px]">
            {/* starburst behind the artwork, as on the reference cards */}
            <div
              className="anim-spin-slow absolute top-1/2 right-0 size-[400px] -translate-y-1/2 opacity-60"
              style={{
                background: `conic-gradient(from 0deg, ${hexA(t.light, .55)} 0deg 8deg, transparent 8deg 30deg, ${hexA(t.light, .4)} 30deg 36deg, transparent 36deg 60deg)`,
                maskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
              }}
            />
            <div
              className="anim-pulse-glow absolute top-1/2 right-4 size-[260px] -translate-y-1/2 rounded-full blur-[54px]"
              style={{ background: hexA(t.light, 0.55) }}
            />
          </div>

          {/* character breaks past the card's own top/right edge for a "trophy shot" feel */}
          <div className="pointer-events-none absolute top-[-22px] right-[-4px] z-[6] rotate-[-3deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bundle.showcase.src}
              alt=""
              className="anim-float h-[226px] w-auto object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,.9)]"
              loading="lazy"
            />
          </div>
        </>
      )}

      <div className="relative z-10 max-w-[56%] px-4">
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

        <div className="scroll-x no-scrollbar relative w-fit max-w-full rounded-[9px] border border-white/10 bg-black/45 p-2">
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
