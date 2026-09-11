"use client";

import type { Bundle } from "@/data/types";
import { THEME, hexA, prismField, surface } from "@/lib/theme";
import { ItemChip } from "@/components/ui/ItemChip";
import { BuyButton, IconButton } from "@/components/ui/Buttons";
import { Beams, Bloom, CaptureMark } from "@/components/ui/Motif";
import { CardBadge } from "@/components/ui/CardBadge";
import { EyeIcon, GiftIcon } from "@/components/ui/icons";

/**
 * The hero product card: an illustrated stage on the right where the showcase
 * art stands in its own light, the offer written plainly on the left, and one
 * action bar underneath. The card is a place, not a list row — that is what
 * makes a bundle feel worth opening.
 */
export function BundleCard({ bundle, onBuy }: { bundle: Bundle; onBuy: (b: Bundle) => void }) {
  const t = THEME[bundle.theme];

  return (
    <div className="relative mb-5">
      <div className="lift relative overflow-hidden rounded-[24px] border" style={surface(t)}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[.05]"
          style={{ backgroundImage: prismField(t.light), backgroundSize: "72px 84px" }}
          aria-hidden
        />

        <div className="relative flex items-stretch">
          {/* offer */}
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5 px-6 py-6">
            <div>
              <div className="flex items-center gap-2">
                <CaptureMark size={15} tone={t} filled strokeWidth={2.2} />
                <span className="kicker leading-none">{bundle.group}</span>
                {bundle.badge && <CardBadge color={t}>{bundle.badge}</CardBadge>}
              </div>
              <h3 className="font-display-bold mt-2 text-[29px] leading-tight text-white">{bundle.name}</h3>
              <p className="mt-1.5 max-w-[440px] text-[14px] leading-snug text-[var(--text-mid)]">{bundle.tagline}</p>
            </div>

            <div>
              <div className="kicker mb-2 leading-none">Inside</div>
              <div className="flex flex-wrap gap-2">
                {bundle.contents.map((c, i) => (
                  <ItemChip key={`${c.id}-${i}`} stack={c} size={96} />
                ))}
              </div>
            </div>
          </div>

          {/* illustrated stage */}
          {bundle.showcase && (
            <div className="relative w-[38%] min-w-[240px] shrink-0 overflow-hidden">
              <Beams tone={t} intensity={0.75} />
              <Bloom
                tone={t}
                size={260}
                opacity={0.45}
                className="top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2"
              />
              <CaptureMark
                size={300}
                tone={t}
                strokeWidth={0.32}
                className="anim-spin-slow absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bundle.showcase.src}
                  alt=""
                  className="anim-float h-[86%] w-auto max-w-none translate-x-[8%] object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,.85)]"
                  loading="lazy"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-24"
                style={{ background: "linear-gradient(90deg, rgba(10,7,21,.55), transparent)" }}
                aria-hidden
              />
            </div>
          )}
        </div>

        {/* action bar */}
        <div className="relative flex items-center gap-3 border-t border-white/8 bg-black/20 px-5 py-3.5">
          <IconButton title="Preview contents" theme="gray" size={42} onClick={() => onBuy(bundle)}>
            <EyeIcon className="size-5" />
          </IconButton>
          <IconButton title="Gift to a friend" theme="violet" size={42}>
            <GiftIcon className="size-5" />
          </IconButton>

          <div className="flex-1" />

          {bundle.purchasesLeft !== undefined && (
            <span
              className="num rounded-full border px-3 py-1 text-[11.5px] font-semibold"
              style={{ borderColor: hexA(t.base, 0.28), color: t.light, background: hexA(t.base, 0.1) }}
            >
              {bundle.purchasesLeft} left
            </span>
          )}
          <BuyButton price={bundle.price} onClick={() => onBuy(bundle)} height={48} fontSize={16} theme={bundle.theme} className="min-w-[176px]" />
        </div>
      </div>
    </div>
  );
}
