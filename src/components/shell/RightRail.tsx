"use client";

import { RailButton } from "./RailButton";
import { SEASON } from "@/data/battlepass";
import type { PanelId } from "./GameShell";
import { hexA, THEME } from "@/lib/theme";

export function RightRail({ open, onOpen }: { open: PanelId; onOpen: (p: PanelId) => void }) {
  const t = THEME.gold;

  return (
    <div className="pointer-events-auto absolute top-1/2 right-4 z-20 flex w-[86px] -translate-y-1/2 flex-col items-center gap-2.5">
      {/* Battlepass gets a taller treatment with the level pill, like the ref */}
      <button
        onClick={() => onOpen("battlepass")}
        className="pressable group relative flex h-[104px] w-[80px] flex-col items-center justify-end gap-1 rounded-[12px] border-[3px] pb-2 text-white"
        style={{
          borderColor: open === "battlepass" ? t.light : hexA(t.base, .95),
          background: `linear-gradient(165deg, ${hexA(t.base, .5)}, rgba(10,10,18,.93) 72%)`,
          boxShadow: `inset 0 2px 0 ${hexA(t.light, .4)}, inset 0 -3px 0 rgba(0,0,0,.6), 0 0 16px ${hexA(t.base, .6)}, 0 4px 10px rgba(0,0,0,.7)`,
        }}
      >
        <span className="mt-1 text-[30px] drop-shadow-[0_2px_4px_rgba(0,0,0,.85)] transition-transform group-hover:scale-110">🏆</span>
        <span className="rounded-[5px] border border-black/60 bg-black/70 px-1.5 text-[10px] font-bold text-[var(--gold-lt)] tabular-nums">
          Lvl {SEASON.level}/{SEASON.maxLevel}
        </span>
        <span className="font-display txt-stroke-xs text-[12px] leading-none">Battlepass</span>
        <span className="text-[9px] leading-none font-semibold text-[var(--text-mid)]">Season {SEASON.number}</span>
      </button>

      <RailButton icon="🛡️" label="Club" theme="green" onClick={() => onOpen(null)} />
      <RailButton icon="👤" label="Profile" theme="cyan" onClick={() => onOpen(null)} />
      <RailButton icon="📖" label="Wiki" theme="violet" active={open === "wiki"} onClick={() => onOpen("wiki")} />
      <RailButton icon="📅" label="Calendar" theme="red" notify={1} onClick={() => onOpen(null)} />
    </div>
  );
}
