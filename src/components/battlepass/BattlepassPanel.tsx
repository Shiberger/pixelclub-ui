"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { BuyButton, GhostButton, IconButton } from "@/components/ui/Buttons";
import { Beams, Bloom, CaptureMark, Motes, PrismMark } from "@/components/ui/Motif";
import { ChevronIcon, GiftIcon, LockIcon, SparkIcon } from "@/components/ui/icons";
import { RewardCell } from "./RewardCell";
import { SEASON } from "@/data/battlepass";
import type { BattlepassReward } from "@/data/types";
import { THEME, hexA, surface } from "@/lib/theme";
import { useIsCompactHud } from "@/lib/viewport";

const LEVEL_BOOSTS = [1, 10, 50] as const;
const COL_W = 182;
const COL_GAP = 12;

export function BattlepassPanel({ onClose, onPurchase }: { onClose: () => void; onPurchase: (label: string) => void }) {
  const [premium, setPremium] = useState(SEASON.premiumOwned);
  const [claimed, setClaimed] = useState<Set<string>>(new Set());
  const trackRef = useRef<HTMLDivElement>(null);
  const isCompact = useIsCompactHud();

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

  const scrollTrack = (dir: -1 | 1) =>
    trackRef.current?.scrollBy({ left: dir * (COL_W + COL_GAP) * 5, behavior: "smooth" });

  const expPct = (SEASON.exp / SEASON.expPerLevel) * 100;
  const p = THEME.gold; // premium accent: warm lavender
  const v = THEME.violet;

  return (
    <Panel
      title="Battlepass"
      kicker={`Season ${SEASON.number} · ${SEASON.name} · ends in ${SEASON.endsIn}`}
      theme="gold"
      onClose={onClose}
      width="min(1280px, 94vw)"
      height="min(760px, 100%)"
      headerSlot={
        <div className="flex w-full min-w-0 flex-col gap-3 @md:w-auto @md:flex-1 @md:flex-row @md:items-center @md:justify-end @md:gap-5">
          {/* season progress */}
          <div className="min-w-0 @md:max-w-[340px] @md:flex-1">
            <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-display-bold text-[17px] leading-none text-white">Level {SEASON.level}</span>
              <span className="text-[12px] leading-none text-[var(--text-lo)]">of {SEASON.maxLevel}</span>
              <span className="num ml-auto text-[11px] leading-none font-semibold text-[var(--text-mid)]">
                {SEASON.exp.toLocaleString()} / {SEASON.expPerLevel.toLocaleString()} EXP
              </span>
            </div>
            <div className="inset relative h-2 overflow-hidden rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${expPct}%`,
                  background: `linear-gradient(90deg, ${v.base}, ${p.base})`,
                  boxShadow: `0 0 12px ${hexA(p.base, 0.9)}`,
                }}
              />
            </div>
          </div>

          {/*
            instant levels — dropped in compact mode (short landscape phones
            most of all): keeping them forces the header onto 2–3 lines,
            which alone can eat well over half a ~350px-tall panel. The
            progress bar above and the reward track below stay usable; this
            upsell row can wait for a screen with height to spare.
          */}
          {!isCompact && (
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              {LEVEL_BOOSTS.map((n) => (
                <button
                  key={n}
                  onClick={() => onPurchase(`+${n} Battlepass Level`)}
                  className="press ring-focus glass-tile flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-[var(--text-mid)] hover:text-white"
                >
                  <SparkIcon className="size-3.5" />+{n}
                </button>
              ))}
            </div>
          )}
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 @md:flex-row @md:gap-4 @md:p-5">
        {/* ---- premium pass ---- */}
        <aside
          className="relative flex h-[220px] shrink-0 flex-col overflow-hidden rounded-[24px] border @md:h-auto @md:w-[330px] @md:shrink @md:min-h-0"
          style={surface(p)}
        >
          <Beams tone={p} intensity={0.9} />
          <Motes count={8} />

          <div className="relative z-10 px-4 pt-4 @md:px-5 @md:pt-5">
            <div className="flex items-center gap-2">
              <PrismMark size={15} tone={p} />
              <span className="kicker leading-none">{premium ? "Unlocked" : "Premium track"}</span>
            </div>
            <h3 className="font-display-bold mt-2 text-[21px] leading-none text-white @md:text-[27px]">
              Premium Pass
            </h3>
          </div>

          {/* hero stage */}
          <div className="relative z-0 min-h-0 flex-1">
            <Bloom tone={p} size={300} opacity={0.5} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <CaptureMark
              size={300}
              tone={p}
              strokeWidth={0.3}
              className="anim-spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-45"
            />
            <div className="absolute inset-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SEASON.heroSprite}
                alt={SEASON.heroName}
                className="anim-float h-[88%] max-h-[300px] w-auto max-w-none object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,.9)]"
              />
            </div>
          </div>

          <div className="relative z-10 px-4 pb-4 @md:px-5 @md:pb-5">
            <p className="mb-3 hidden text-[12.5px] leading-snug text-[var(--text-mid)] @md:block">
              {premium
                ? "Every premium tier is yours — claim them from the track whenever you level."
                : "Unlock all 50 premium tiers, including the season Mount and the Master Ball at Lv 50."}
            </p>
            <div className="flex items-center gap-2">
              <BuyButton
                label={premium ? "Owned" : "Unlock Premium"}
                price={premium ? undefined : SEASON.premiumPrice}
                disabled={premium}
                theme={premium ? "green" : "gold"}
                height={48}
                fontSize={15}
                className="min-w-0 flex-1"
                onClick={() => {
                  setPremium(true);
                  onPurchase("Premium Pass");
                }}
              />
              <IconButton title="Gift the Premium Pass" theme="violet" size={48}>
                <GiftIcon className="size-5" />
              </IconButton>
            </div>
          </div>
        </aside>

        {/*
          ---- reward track ----
          Its own @container: the fixed-width aside can leave this column as
          narrow as ~200px on a landscape phone, well under the outer Panel's
          own @md — so the labels column and footer button below must size
          off *this* box, not the Panel's, or they'll size up as if there
          were hundreds of extra pixels that aside already spent.
        */}
        <div className="@container flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <div className="flex min-h-0 flex-1 gap-2 @md:gap-3">
            {/* track labels */}
            <div className="flex w-[52px] shrink-0 flex-col gap-2 pt-[42px] @md:w-[84px] @md:gap-3">
              <div className="glass-tile flex flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl">
                <GiftIcon className="size-5 text-[var(--text-mid)]" />
                <span className="kicker leading-none">Free</span>
              </div>
              <div
                className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl border"
                style={{
                  borderColor: hexA(p.base, 0.45),
                  background: `linear-gradient(180deg, ${hexA(p.base, 0.28)}, ${hexA(p.dark, 0.35)})`,
                  boxShadow: `0 0 26px -12px ${hexA(p.base, 0.9)}`,
                }}
              >
                {premium ? (
                  <PrismMark size={20} tone={p} />
                ) : (
                  <span style={{ color: p.light }}>
                    <LockIcon className="size-5" />
                  </span>
                )}
                <span className="kicker leading-none" style={{ color: p.light }}>
                  Premium
                </span>
              </div>
            </div>

            {/* levels */}
            <div ref={trackRef} className="scroll-x inset relative min-h-0 flex-1 rounded-2xl p-3">
              <div className="relative flex h-full gap-3" style={{ width: byLevel.length * (COL_W + COL_GAP) }}>
                {/* progress rail behind the level chips */}
                <span className="absolute top-[14px] right-0 left-0 h-[2px] rounded-full bg-white/10" aria-hidden />
                <span
                  className="absolute top-[14px] left-0 h-[2px] rounded-full"
                  style={{
                    width: (SEASON.level - 0.5) * (COL_W + COL_GAP),
                    background: `linear-gradient(90deg, ${v.base}, ${p.base})`,
                    boxShadow: `0 0 10px ${hexA(p.base, 0.9)}`,
                  }}
                  aria-hidden
                />

                {byLevel.map(([level, row]) => {
                  const current = level === SEASON.level;
                  const reached = level <= SEASON.level;
                  return (
                    <div key={level} className="flex h-full shrink-0 flex-col gap-3" style={{ width: COL_W }}>
                      <div
                        className="num relative z-10 mx-auto flex h-[30px] items-center gap-1.5 rounded-full border px-3 text-[12px] font-bold"
                        style={
                          current
                            ? {
                                borderColor: hexA(p.base, 0.7),
                                background: `linear-gradient(180deg, ${hexA(p.base, 0.85)}, ${hexA(p.dark, 0.9)})`,
                                color: "#fff",
                                boxShadow: `0 0 22px -6px ${hexA(p.base, 1)}`,
                              }
                            : {
                                borderColor: "rgba(255,255,255,.1)",
                                background: reached ? hexA(v.base, 0.22) : "rgba(10,7,21,.75)",
                                color: reached ? "#fff" : "var(--text-lo)",
                              }
                        }
                      >
                        {current && <CaptureMark size={13} tone={{ ...p, base: "#fff", light: "#fff" }} strokeWidth={2.4} />}
                        Lv {level}
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

          {/* footer */}
          <div className="flex shrink-0 items-center gap-2">
            <IconButton title="Scroll back" theme="gray" size={38} onClick={() => scrollTrack(-1)}>
              <ChevronIcon dir="left" className="size-4" />
            </IconButton>
            <IconButton title="Scroll forward" theme="gray" size={38} onClick={() => scrollTrack(1)}>
              <ChevronIcon className="size-4" />
            </IconButton>
            <div className="min-w-0 flex-1 truncate pl-1 text-[12.5px] font-semibold text-[var(--text-mid)]">
              {claimable.length > 0
                ? `${claimable.length} reward${claimable.length > 1 ? "s" : ""} ready to claim`
                : "No rewards ready — earn EXP from quests and battles."}
            </div>
            {claimable.length === 0 ? (
              <GhostButton disabled className="min-w-[120px] @md:min-w-[168px]">
                Claim All
              </GhostButton>
            ) : (
              <BuyButton
                label={`Claim All (${claimable.length})`}
                onClick={claimAll}
                theme="green"
                height={44}
                fontSize={15}
                className="min-w-[120px] @md:min-w-[168px]"
              />
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}
