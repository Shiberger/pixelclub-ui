"use client";

import type { BattlepassReward } from "@/data/types";
import { RARITY, hexA } from "@/lib/theme";
import { formatQty } from "@/components/ui/ItemChip";

const STATE_FRAME = {
  claimable: { border: "#8ce62a", glow: "rgba(140,230,42,.85)" },
  claimed: { border: "#4b5563", glow: "rgba(0,0,0,0)" },
  locked: { border: "#2b2b38", glow: "rgba(0,0,0,0)" },
} as const;

export function RewardCell({ reward, onClaim }: { reward: BattlepassReward; onClaim: () => void }) {
  const r = RARITY[reward.item.rarity];
  const f = STATE_FRAME[reward.state];
  const locked = reward.state === "locked";
  const claimed = reward.state === "claimed";

  return (
    <button
      onClick={reward.state === "claimable" ? onClaim : undefined}
      disabled={reward.state !== "claimable"}
      className="group relative aspect-square w-full overflow-hidden rounded-[12px] border-[4px] transition-transform duration-150 enabled:hover:scale-[1.06] enabled:active:scale-95"
      style={{
        borderColor: f.border,
        background: locked
          ? "linear-gradient(160deg,#191922,#0c0c12)"
          : `linear-gradient(160deg, ${hexA(r.base, claimed ? 0.18 : 0.5)}, ${hexA(r.dark, 0.85)} 70%, rgba(6,6,10,.95))`,
        boxShadow: `inset 0 1px 0 ${hexA(r.light, claimed ? 0.15 : 0.45)}, 0 0 ${reward.state === "claimable" ? 16 : 0}px ${f.glow}`,
      }}
      title={`${formatQty(reward.item.qty)}× ${reward.item.name}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reward.item.sprite}
        alt={reward.item.name}
        loading="lazy"
        className="pixelated absolute inset-0 m-auto size-[72%] object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,.75)]"
        style={{ filter: locked ? "grayscale(1) brightness(.45)" : claimed ? "grayscale(.7) brightness(.6)" : undefined }}
      />

      <span className="absolute top-[7px] left-[7px] rounded-[6px] bg-black/80 px-[9px] py-[2px] text-[17px] leading-[22px] font-bold tabular-nums">
        {formatQty(reward.item.qty)}x
      </span>

      <span className="txt-stroke-xs absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/92 to-transparent px-2 pt-5 pb-[4px] text-center text-[15px] leading-[17px] font-bold">
        {reward.item.name}
      </span>

      {claimed && (
        <span className="absolute inset-0 grid place-items-center bg-black/45 text-[48px] text-[var(--green-lt)] drop-shadow-[0_0_8px_rgba(126,211,33,.9)]">
          ✔
        </span>
      )}
      {locked && <span className="absolute top-2 right-2 text-[20px] opacity-60">🔒</span>}
    </button>
  );
}
