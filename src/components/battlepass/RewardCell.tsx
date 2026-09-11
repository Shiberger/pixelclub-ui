"use client";

import type { BattlepassReward } from "@/data/types";
import { RARITY, THEME, hexA } from "@/lib/theme";
import { CaptureMark } from "@/components/ui/Motif";
import { CheckIcon, LockIcon } from "@/components/ui/icons";
import { formatQty } from "@/components/ui/ItemChip";

/**
 * A tier on the track. State is carried by light, not by frame colour:
 * claimable tiers glow and invite a click, claimed tiers step back behind a
 * capture tick, locked tiers go flat and quiet.
 */
export function RewardCell({ reward, onClaim }: { reward: BattlepassReward; onClaim: () => void }) {
  const r = RARITY[reward.item.rarity];
  const claimable = reward.state === "claimable";
  const claimed = reward.state === "claimed";
  const locked = reward.state === "locked";
  const ready = THEME.green;

  return (
    <button
      onClick={claimable ? onClaim : undefined}
      disabled={!claimable}
      className="group ring-focus relative size-full overflow-hidden rounded-[18px] border transition-transform duration-200 enabled:hover:-translate-y-1"
      style={{
        borderColor: claimable ? hexA(ready.base, 0.65) : locked ? "rgba(255,255,255,.06)" : hexA(r.base, 0.2),
        background: locked
          ? "linear-gradient(168deg, rgba(255,255,255,.035), rgba(0,0,0,.25))"
          : `
            radial-gradient(120% 110% at 14% 0%, ${hexA(r.base, claimed ? 0.12 : 0.34)} 0%, transparent 64%),
            linear-gradient(168deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 55%, rgba(0,0,0,.24))
          `,
        boxShadow: claimable
          ? `inset 0 1px 0 rgba(255,255,255,.18), 0 0 28px -10px ${hexA(ready.base, 0.95)}`
          : "inset 0 1px 0 rgba(255,255,255,.08)",
      }}
      title={`${formatQty(reward.item.qty)}× ${reward.item.name}`}
    >
      {/* the item icons are small source images, so the art is capped in px as
          well as % — a tall cell would otherwise blow them up into mush */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reward.item.sprite}
        alt={reward.item.name}
        loading="lazy"
        className="absolute inset-0 m-auto max-h-[46%] max-w-[62%] -translate-y-[6%] object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,.7)] transition-transform duration-300 group-enabled:group-hover:scale-[1.08]"
        style={{
          width: 108,
          height: 108,
          filter: locked ? "grayscale(1) brightness(.5)" : claimed ? "grayscale(.6) brightness(.7)" : undefined,
        }}
      />

      <span
        className="num absolute top-2 left-2 rounded-full px-1.5 py-[1px] text-[11px] leading-[15px] font-bold text-white/90"
        style={{ background: "rgba(6,4,14,.55)", backdropFilter: "blur(4px)" }}
      >
        {formatQty(reward.item.qty)}
      </span>

      <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-[rgba(6,4,14,.9)] to-transparent px-2 pt-5 pb-2 text-center text-[11.5px] leading-none font-semibold text-white/90">
        {reward.item.name}
      </span>

      {claimable && (
        <span
          className="absolute top-2 right-2 grid size-[22px] place-items-center rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: ready.base, color: "#04120c" }}
        >
          <CheckIcon className="size-3.5" />
        </span>
      )}

      {claimed && (
        <span className="absolute inset-0 grid place-items-center" style={{ background: "rgba(6,4,14,.42)" }}>
          <CaptureMark size={40} tone={THEME.gray} strokeWidth={1.2} className="absolute opacity-70" />
          <CheckIcon className="relative size-4 text-[var(--text-mid)]" />
        </span>
      )}

      {locked && <LockIcon className="absolute top-2 right-2 size-4 text-white/30" />}
    </button>
  );
}
