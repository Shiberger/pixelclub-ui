"use client";

import type { Bundle } from "@/data/types";
import { THEME, cardSkin, hexA } from "@/lib/theme";
import { ItemChip } from "@/components/ui/ItemChip";
import { BuyButton, IconButton } from "@/components/ui/Buttons";

/** Faint tiled diamond motif behind the contents strip — echoes the loot inside. */
function itemPattern(hex: string) {
  const c = hex.replace("#", "%23");
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='${c}' stroke-width='1.6'%3E%3Cpath d='M16 4l11 11-11 11L5 15z'/%3E%3Cpath d='M49 34l11 11-11 11-11-11z'/%3E%3C/g%3E%3C/svg%3E")`;
}

export function BundleCard({ bundle, onBuy }: { bundle: Bundle; onBuy: (b: Bundle) => void }) {
  const t = THEME[bundle.theme];

  return (
    <div className="relative mt-2 mb-7 overflow-hidden rounded-[12px] border-2 pt-3 pb-0" style={cardSkin(t)}>
      {/* tiled item-motif backdrop, tinted to the bundle theme */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[.14]"
        style={{ backgroundImage: itemPattern(t.light), backgroundSize: "64px 64px" }}
      />

      {/* showcase character — pushed back as atmosphere behind the loot strip, not the main draw */}
      {bundle.showcase && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] overflow-hidden rounded-r-[10px]">
            <div
              className="anim-spin-slow absolute top-1/2 right-0 size-[320px] -translate-y-1/2 opacity-55"
              style={{
                background: `conic-gradient(from 0deg, ${hexA(t.light, .5)} 0deg 8deg, transparent 8deg 30deg, ${hexA(t.light, .35)} 30deg 36deg, transparent 36deg 60deg)`,
                maskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle, #000 10%, transparent 70%)",
              }}
            />
            <div
              className="anim-pulse-glow absolute top-1/2 right-2 size-[190px] -translate-y-1/2 rounded-full blur-[48px]"
              style={{ background: hexA(t.light, 0.5) }}
            />
          </div>

          <div className="pointer-events-none absolute top-[-14px] right-[-6px] z-[1] rotate-[-3deg] opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bundle.showcase.src}
              alt=""
              className="anim-float h-[168px] w-auto object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,.85)]"
              loading="lazy"
            />
          </div>
        </>
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

        {/* what you get — the star of the card: large, labelled, and legible */}
        <div className="relative max-w-[86%] rounded-[10px] border border-white/10 bg-black/50 p-2.5 backdrop-blur-[1px]">
          <div className="flex flex-wrap gap-2">
            {bundle.contents.map((c, i) => (
              <ItemChip key={`${c.id}-${i}`} stack={c} size={76} />
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
