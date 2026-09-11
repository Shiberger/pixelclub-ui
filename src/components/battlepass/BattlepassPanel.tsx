"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { BuyButton, GhostButton, IconButton } from "@/components/ui/Buttons";
import { RewardCell } from "./RewardCell";
import { SEASON } from "@/data/battlepass";
import type { BattlepassReward } from "@/data/types";
import { THEME, hexA } from "@/lib/theme";

const LEVEL_BOOSTS = [1, 10, 50] as const;
const COL_W = 92;
const COL_GAP = 8;

export function BattlepassPanel({ onClose, onPurchase }: { onClose: () => void; onPurchase: (label: string) => void }) {
  const [premium, setPremium] = useState(SEASON.premiumOwned);
  const [claimed, setClaimed] = useState<Set<string>>(new Set());
  const trackRef = useRef<HTMLDivElement>(null);

  // Centre the track on the current level when the panel opens.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const col = COL_W + COL_GAP;
    el.scrollLeft = Math.max(0, (SEASON.level - 1) * col - el.clientWidth / 2 + col / 2);
  }, []);

  const byLevel = useMemo(() => {
    const map = new Map<number, { free?: BattlepassReward; premium?: BattlepassReward }>();
    for (const r of SEASON.rewards) {
      const row = map.get(r.level) ?? {};
      row[r.track] = r;
      map.set(r.level, row);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, []);

  const key = (r: BattlepassReward) => `${r.track}-${r.level}`;
  const stateOf = (r: BattlepassReward) => {
    if (r.track === "premium" && !premium) return "locked";
    if (claimed.has(key(r))) return "claimed";
    return r.state;
  };

  const claimable = SEASON.rewards.filter((r) => stateOf(r) === "claimable");

  const claim = (r: BattlepassReward) => {
    setClaimed((s) => new Set(s).add(key(r)));
    onPurchase(`${r.item.qty.toLocaleString()}× ${r.item.name}`);
  };

  const claimAll = () => {
    setClaimed((s) => {
      const n = new Set(s);
      claimable.forEach((r) => n.add(key(r)));
      return n;
    });
    onPurchase(`${claimable.length} Battlepass rewards`);
  };

  const expPct = (SEASON.exp / SEASON.expPerLevel) * 100;
  const g = THEME.gold;

  const scrollTrack = (dir: -1 | 1) =>
    trackRef.current?.scrollBy({ left: dir * (COL_W + COL_GAP) * 5, behavior: "smooth" });

  return (
    <Panel
      title="Battlepass"
      theme="gold"
      onClose={onClose}
      width="min(1240px, 95vw)"
      headerSlot={
        <div className="flex w-full items-center gap-3">
          {/* season + exp */}
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display txt-stroke-sm text-[21px]" style={{ color: g.light }}>
                Level {SEASON.level}
              </span>
              <span className="font-display txt-stroke-xs text-[15px] text-white/60">/ {SEASON.maxLevel}</span>
              <span className="ml-auto text-[11px] font-bold text-[var(--text-mid)] tabular-nums">
                {SEASON.exp.toLocaleString()} / {SEASON.expPerLevel.toLocaleString()} EXP
              </span>
            </div>
            <div className="bevel-inset relative mt-1 h-[16px] overflow-hidden rounded-full border-2 border-black/70 bg-black/70">
              <div
                className="shine h-full rounded-full"
                style={{ width: `${expPct}%`, background: `linear-gradient(180deg,${g.light},${g.base} 55%,${g.dark})`, boxShadow: `0 0 12px ${hexA(g.base, .8)}` }}
              />
            </div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-[var(--text-lo)]">
              Season {SEASON.number} · {SEASON.name} · ends in {SEASON.endsIn}
            </div>
          </div>

          {LEVEL_BOOSTS.map((n) => (
            <button
              key={n}
              onClick={() => onPurchase(`+${n} Battlepass Level`)}
              className="pressable bevel-sm font-display txt-stroke-sm h-[42px] rounded-[9px] border-2 border-black/70 px-3 text-[15px] text-white"
              style={{ background: "linear-gradient(180deg,#6ec4ff,#2b7fe0 55%,#12408c)" }}
            >
              +{n} {n === 1 ? "Level" : "Levels"}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 gap-3 p-3">
        {/* ---- premium pass panel ---- */}
        <aside
          className="relative flex w-[288px] shrink-0 flex-col overflow-hidden rounded-[12px] border-2"
          style={{
            borderColor: hexA(g.base, .9),
            background: `linear-gradient(170deg, ${hexA(g.base, .28)}, rgba(10,10,16,.96) 60%)`,
            boxShadow: `inset 0 1px 0 ${hexA(g.light, .4)}, 0 0 20px ${hexA(g.base, .35)}`,
          }}
        >
          <div className="relative z-10 px-3 pt-3 text-center">
            <div className="font-display txt-stroke text-[26px] leading-none" style={{ color: g.light, textShadow: `0 0 16px ${hexA(g.base, .9)}` }}>
              Premium Pass
            </div>
            <div className="text-[12px] font-bold text-white/70">Season {SEASON.number} · {SEASON.name}</div>
          </div>

          <div className="relative min-h-0 flex-1">
            <div className="anim-pulse-glow absolute inset-x-6 top-6 bottom-16 rounded-full blur-[46px]" style={{ background: hexA(g.light, .45) }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SEASON.heroSprite}
              alt={SEASON.heroName}
              className="anim-float absolute inset-0 m-auto size-[94%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.85)]"
            />
          </div>

          <div className="relative z-10 px-3 pb-3">
            <p className="mb-2 text-center text-[11.5px] font-semibold text-white/80">
              {premium
                ? "Premium unlocked — every premium tier is yours to claim!"
                : "Purchase the Premium Pass to unlock EXCLUSIVE premium tier rewards!"}
            </p>
            <div className="flex items-center gap-2">
              <BuyButton
                label={premium ? "Owned" : "Buy Premium"}
                price={premium ? undefined : SEASON.premiumPrice}
                disabled={premium}
                theme={premium ? "green" : "cyan"}
                className="h-[42px] min-w-0 flex-1 text-[15px]"
                onClick={() => { setPremium(true); onPurchase("Premium Pass"); }}
              />
              <IconButton title="Gift the Premium Pass" theme="violet"><span className="text-[17px]">🎁</span></IconButton>
            </div>
          </div>
        </aside>

        {/* ---- reward track ---- */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex min-h-0 flex-1 gap-2">
            {/* track labels */}
            <div className="flex w-[74px] shrink-0 flex-col gap-2 pt-[30px]">
              <div className="flex flex-1 flex-col items-center justify-center rounded-[9px] border-2 border-black/60 bg-[linear-gradient(180deg,#3a3a4a,#1c1c26)]">
                <span className="text-[18px]">🎁</span>
                <span className="font-display txt-stroke-xs text-[12px]">Free</span>
              </div>
              <div
                className="flex flex-1 flex-col items-center justify-center rounded-[9px] border-2"
                style={{ borderColor: hexA(g.base, .9), background: `linear-gradient(180deg, ${hexA(g.base, .45)}, rgba(12,12,18,.95))`, boxShadow: `0 0 14px ${hexA(g.base, .4)}` }}
              >
                <span className="text-[18px]">{premium ? "👑" : "🔒"}</span>
                <span className="font-display txt-stroke-xs text-[12px]" style={{ color: g.light }}>Premium</span>
              </div>
            </div>

            {/* scrollable levels */}
            <div ref={trackRef} className="scroll-x relative min-h-0 flex-1 rounded-[10px] bg-black/35 p-2">
              <div className="flex h-full gap-2">
                {byLevel.map(([level, row]) => {
                  const current = level === SEASON.level;
                  return (
                    <div key={level} className="flex h-full w-[92px] shrink-0 flex-col gap-2">
                      <div
                        className="grid h-[26px] shrink-0 place-items-center rounded-[6px] border-2 text-[12px] font-black"
                        style={
                          current
                            ? { borderColor: g.light, background: `linear-gradient(180deg,${g.base},${g.dark})`, color: "#fff", boxShadow: `0 0 12px ${hexA(g.base, .9)}` }
                            : { borderColor: "rgba(0,0,0,.6)", background: "linear-gradient(180deg,#2c2c3a,#16161f)", color: "var(--text-mid)" }
                        }
                      >
                        Lvl {level}
                      </div>
                      {(["free", "premium"] as const).map((track) => {
                        const r = row[track];
                        if (!r) return <div key={track} className="flex-1" />;
                        return (
                          <div key={track} className="min-h-0 flex-1">
                            <RewardCell reward={{ ...r, state: stateOf(r) }} onClaim={() => claim(r)} />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* track footer */}
          <div className="flex shrink-0 items-center gap-2">
            <GhostButton onClick={() => scrollTrack(-1)} className="px-3">◀</GhostButton>
            <GhostButton onClick={() => scrollTrack(1)} className="px-3">▶</GhostButton>
            <div className="flex-1 text-[12px] font-semibold text-[var(--text-mid)]">
              {claimable.length > 0
                ? `${claimable.length} reward${claimable.length > 1 ? "s" : ""} ready to claim`
                : "No rewards ready — earn EXP from quests and battles."}
            </div>
            <BuyButton
              label={`Claim All${claimable.length ? ` (${claimable.length})` : ""}`}
              onClick={claimAll}
              disabled={claimable.length === 0}
              className="min-w-[170px]"
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
