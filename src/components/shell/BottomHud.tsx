"use client";

import { pkmn } from "@/lib/assets";
import { RARITY, hexA } from "@/lib/theme";
import { CURRENCIES, WALLET } from "@/data/store";
import type { Rarity } from "@/data/types";

interface PartyMon { dex: number; name: string; level: number; rarity: Rarity; shiny?: boolean }

const PARTY: PartyMon[] = [
  { dex: 6, name: "Charizard", level: 52, rarity: "legendary" },
  { dex: 94, name: "Gengar", level: 48, rarity: "epic" },
  { dex: 448, name: "Lucario", level: 45, rarity: "epic", shiny: true },
  { dex: 131, name: "Lapras", level: 40, rarity: "rare" },
];
const LOCKED = [{ req: "Level 30" }, { req: "Level 45" }];

export function BottomHud() {
  const trainerLevel = 27;
  const xp = 1_840;
  const xpMax = 4_200;

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-1.5 pb-2">
      {/* currencies */}
      <div className="flex items-center gap-2">
        {CURRENCIES.map((c) => (
          <div
            key={c.id}
            className="bevel-sm flex h-[32px] items-center gap-1.5 rounded-full border-2 border-black/70 bg-[linear-gradient(180deg,#2b2b3a,#14141d)] pr-3 pl-1.5"
          >
            <span className="grid size-[22px] place-items-center rounded-full text-[14px]" style={{ background: hexA(c.color, .25), boxShadow: `0 0 8px ${hexA(c.color, .6)}` }}>
              {c.icon}
            </span>
            <span className="font-display txt-stroke-xs text-[14px] tabular-nums" style={{ color: c.color }}>
              {WALLET[c.id].toLocaleString("en-US")}
            </span>
          </div>
        ))}
        <button className="pressable bevel-sm grid size-[32px] place-items-center rounded-full border-2 border-black/70 bg-[linear-gradient(180deg,#3a3a4a,#1c1c26)] text-[14px]" title="Settings">⚙️</button>
      </div>

      {/* party */}
      <div className="flex items-end gap-1.5">
        {PARTY.map((m) => {
          const r = RARITY[m.rarity];
          return (
            <button
              key={m.dex}
              className="pressable group relative size-[72px] overflow-hidden rounded-[10px] border-[3px]"
              style={{
                borderColor: r.base,
                background: `linear-gradient(160deg, ${hexA(r.base, .45)}, rgba(8,8,14,.95))`,
                boxShadow: `inset 0 1px 0 ${hexA(r.light, .45)}, 0 0 12px ${hexA(r.base, .55)}, 0 3px 8px rgba(0,0,0,.7)`,
              }}
              title={`${m.name} · Lv ${m.level}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.shiny ? pkmn.shinyHome(m.dex) : pkmn.home(m.dex)}
                alt={m.name}
                className="absolute inset-0 m-auto size-[88%] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,.8)] transition-transform duration-200 group-hover:scale-110"
              />
              <span className="absolute top-[2px] left-[2px] rounded-[4px] bg-black/80 px-1 text-[9px] font-bold text-white">Lv {m.level}</span>
              {m.shiny && <span className="absolute top-[2px] right-[2px] text-[11px] drop-shadow-[0_0_5px_#fde68a]">✨</span>}
              <span className="txt-stroke-xs absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/90 to-transparent px-1 pt-2 text-center text-[9px] font-bold">
                {m.name}
              </span>
            </button>
          );
        })}
        {LOCKED.map((l) => (
          <div
            key={l.req}
            className="bevel-sm grid size-[72px] place-items-center rounded-[10px] border-[3px] border-black/70 bg-[linear-gradient(180deg,#22222e,#111119)] text-center"
          >
            <div>
              <div className="text-[16px] opacity-70">🔒</div>
              <div className="txt-stroke-xs mt-0.5 text-[10px] font-bold text-[var(--text-mid)]">{l.req}</div>
            </div>
          </div>
        ))}
      </div>

      {/* trainer xp bar */}
      <div className="relative h-[20px] w-[min(620px,64vw)] overflow-hidden rounded-full border-2 border-black/75 bg-black/70 bevel-inset">
        <div
          className="shine h-full rounded-full"
          style={{
            width: `${(xp / xpMax) * 100}%`,
            background: "linear-gradient(180deg,#6ee7ff,#2b8fe8 55%,#1b4fa8)",
            boxShadow: "0 0 14px rgba(56,189,248,.8)",
          }}
        />
        <span className="txt-stroke-xs absolute inset-0 grid place-items-center text-[11px] font-bold tabular-nums">
          Lvl {trainerLevel} ({xp.toLocaleString()}/{xpMax.toLocaleString()} XP)
        </span>
      </div>
    </div>
  );
}
