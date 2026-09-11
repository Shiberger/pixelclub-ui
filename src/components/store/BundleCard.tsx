"use client";

import type { Bundle } from "@/data/types";
import { THEME, cardSkin, hexA, itemPattern } from "@/lib/theme";
import { ItemChip } from "@/components/ui/ItemChip";
import { BuyButton, IconButton } from "@/components/ui/Buttons";

export function BundleCard({ bundle, onBuy }: { bundle: Bundle; onBuy: (b: Bundle) => void }) {
  const t = THEME[bundle.theme];

  return (
    <div className="card-hover relative mb-4 overflow-hidden rounded-[12px] border-2" style={cardSkin(t)}>
      {/* tiled item-motif backdrop, tinted to the bundle theme */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.14]"
        style={{ backgroundImage: itemPattern(t.light), backgroundSize: "64px 64px" }}
      />

      {/*
        A tall row: the showcase column sets a tall min-height so the 3D art
        gets real room, while the info column just centers its (short)
        content inside that same height — compact text, big model.
      */}
      <div className="relative z-10 flex items-stretch">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <h3
              className="font-display txt-stroke-sm text-[32px] leading-tight"
              style={{ color: t.light, textShadow: `0 0 14px ${hexA(t.base, 0.9)}` }}
            >
              {bundle.name}
            </h3>
            {bundle.badge && (
              <span className="txt-stroke-xs rounded-[6px] border border-black/60 px-2 py-[3px] text-[12px] font-black"
                style={{ background: `linear-gradient(180deg,${THEME.red.base},${THEME.red.dark})` }}>
                {bundle.badge}
              </span>
            )}
          </div>
          <p className="text-[15px] font-semibold text-white/75">{bundle.tagline}</p>

          {/* what you get — big enough to match the showcase art */}
          <div className="relative w-fit max-w-full rounded-[10px] border border-white/10 bg-black/50 p-2.5 backdrop-blur-[1px]">
            <div className="flex flex-wrap gap-2.5">
              {bundle.contents.map((c, i) => (
                <ItemChip key={`${c.id}-${i}`} stack={c} size={92} />
              ))}
            </div>
          </div>
        </div>

        {/* showcase column — as tall/wide as the card can give it, so the character renders as big as possible */}
        {bundle.showcase && (
          <div className="relative w-[44%] min-h-[380px] shrink-0 overflow-hidden rounded-r-[10px]">
            {/* the glow and the character share one anchor, shifted together, so they never drift apart */}
            <div className="pointer-events-none absolute inset-1.5 translate-x-[70px]">
              <div
                className="anim-spin-slow absolute top-1/2 left-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 opacity-55"
                style={{
                  background: `conic-gradient(from 0deg, ${hexA(t.light, .5)} 0deg 8deg, transparent 8deg 30deg, ${hexA(t.light, .35)} 30deg 36deg, transparent 36deg 60deg)`,
                  maskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
                }}
              />
              <div
                className="anim-pulse-glow absolute top-1/2 left-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
                style={{ background: hexA(t.light, 0.5) }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bundle.showcase.src}
                  alt=""
                  className="anim-float h-full w-auto max-w-none object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,.9)]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* footer action bar — sized to match the bigger card */}
      <div className="relative z-10 flex items-center gap-3 border-t-2 border-black/50 bg-black/55 px-4 py-3">
        <IconButton title="Preview contents" theme="cyan" size={54} onClick={() => onBuy(bundle)}>
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
          </svg>
        </IconButton>

        <div className="flex-1" />

        {bundle.purchasesLeft !== undefined && (
          <span className="mr-1 rounded-[6px] bg-black/70 px-2.5 py-1 text-[13px] font-bold text-[var(--text-mid)]">
            Purchases Left: {bundle.purchasesLeft}
          </span>
        )}
        <IconButton title="Gift to a friend" theme="violet" size={54}>
          <span className="text-[21px]">🎁</span>
        </IconButton>
        <BuyButton price={bundle.price} onClick={() => onBuy(bundle)} height={54} fontSize={20} className="min-w-[180px]" />
      </div>
    </div>
  );
}
