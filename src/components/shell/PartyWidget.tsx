"use client";

import { pkmn, item } from "@/lib/assets";
import { cn } from "@/lib/cn";

/**
 * Cobblemon's in-game party overlay: six stacked pixel-art slots on the left
 * edge, each showing level, the rendered Pokémon, a held-item socket, an HP
 * bar, the name, gender and a Poké Ball marker.
 */

interface PartyMon {
  dex: number;
  name: string;
  level: number;
  gender: "male" | "female" | "none";
  hp: number; // 0..1
  held?: string; // item sprite name
  shiny?: boolean;
}

const PARTY: (PartyMon | null)[] = [
  { dex: 1, name: "Bulbasaur", level: 10, gender: "male", hp: 1 },
  { dex: 6, name: "Charizard", level: 1, gender: "male", hp: 1 },
  { dex: 944, name: "Grafaiai", level: 1, gender: "female", hp: 1, held: "leftovers" },
  { dex: 967, name: "Revavroom", level: 1, gender: "male", hp: 0.86, held: "life-orb" },
  { dex: 197, name: "Umbreon", level: 1, gender: "male", hp: 1, held: "black-glasses" },
  { dex: 711, name: "Gourgeist", level: 1, gender: "female", hp: 0.64, held: "sitrus-berry" },
];

/** Index of the Pokémon currently sent out — rendered a shade brighter. */
const ACTIVE = 4;

const GENDER = {
  male: { sign: "♂", color: "#4da3ff" },
  female: { sign: "♀", color: "#ff6fa8" },
  none: { sign: "", color: "transparent" },
} as const;

function PokeBall() {
  // 7x7 pixel Poké Ball, drawn rather than fetched so it stays crisp
  return (
    <svg viewBox="0 0 7 7" className="size-[15px]" shapeRendering="crispEdges" aria-hidden>
      <rect width="7" height="7" fill="#20202a" />
      <rect x="1" y="1" width="5" height="2" fill="#e03a3a" />
      <rect x="1" y="4" width="5" height="2" fill="#f0f0f0" />
      <rect x="1" y="3" width="5" height="1" fill="#20202a" />
      <rect x="3" y="3" width="1" height="1" fill="#f0f0f0" />
    </svg>
  );
}

function Slot({ mon, active }: { mon: PartyMon; active: boolean }) {
  const g = GENDER[mon.gender];
  const hpColor = mon.hp > 0.5 ? "#4ade4a" : mon.hp > 0.2 ? "#e8c53a" : "#e8483a";

  return (
    <div
      className={cn(
        "font-pixel relative flex h-[88px] w-[206px] items-stretch gap-[4px] p-[4px] pb-[21px]",
        "border-[3px] border-[#0d0d10]",
        active ? "bg-[#62626e]" : "bg-[#3e3e46]",
      )}
      style={{ boxShadow: "inset 2px 2px 0 rgba(255,255,255,.14), inset -2px -2px 0 rgba(0,0,0,.42)" }}
    >
      {/* left column — held item socket above the level label */}
      <div className="flex w-[36px] shrink-0 flex-col items-center gap-[4px]">
        <div className="grid size-[32px] place-items-center border-2 border-[#16161b] bg-[#2a2a32]">
          {mon.held && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={item(mon.held)} alt="" className="pixelated size-[24px] object-contain" />
          )}
        </div>
        <div className="text-center text-[11px] leading-[12px] text-white [text-shadow:2px_2px_0_#1b1b22]">
          Lv.
          <br />
          {mon.level}
        </div>
      </div>

      {/* rendered Pokémon */}
      <div className="relative min-w-0 flex-1 border-2 border-[#16161b] bg-[linear-gradient(180deg,#9fb6c2,#7d949f)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mon.shiny ? pkmn.shinyHome(mon.dex) : pkmn.home(mon.dex)}
          alt={mon.name}
          className="absolute inset-0 m-auto size-[92%] object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,.45)]"
          loading="lazy"
        />
      </div>

      {/* HP bar */}
      <div className="w-[9px] shrink-0 border-2 border-[#16161b] bg-[#22222a]">
        <div className="size-full origin-bottom" style={{ transform: `scaleY(${mon.hp})`, background: hpColor }} />
      </div>

      {/* name plate */}
      <div className="absolute bottom-[-3px] left-[-3px] flex h-[22px] w-[206px] items-center gap-1 border-[3px] border-[#0d0d10] bg-[#2a2a32] px-1.5">
        <span className="truncate text-[12px] text-white [text-shadow:2px_2px_0_#101015]">{mon.name}</span>
        <span className="ml-auto text-[13px] leading-none" style={{ color: g.color }}>{g.sign}</span>
        <PokeBall />
      </div>
    </div>
  );
}

export function PartyWidget() {
  return (
    <div className="pointer-events-auto absolute top-[88px] left-0 z-20 flex flex-col gap-[9px]">
      {PARTY.map((mon, i) =>
        mon ? <Slot key={mon.dex} mon={mon} active={i === ACTIVE} /> : null,
      )}
    </div>
  );
}
