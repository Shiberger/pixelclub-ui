"use client";

import { pkmn, item } from "@/lib/assets";
import { THEME, hexA } from "@/lib/theme";
import { CaptureRing } from "@/components/ui/Motif";
import { cn } from "@/lib/cn";

/**
 * The party HUD, rebuilt in the Design 2.0 language: six glass capsules where
 * the capture ring doubles as the HP dial around each portrait. It is roughly
 * half the footprint of the old six stacked frames, which keeps the left side
 * of the world visible while you play.
 */

interface PartyMon {
  dex: number;
  name: string;
  level: number;
  gender: "male" | "female" | "none";
  hp: number; // 0..1
  held?: string;
  shiny?: boolean;
}

const PARTY: PartyMon[] = [
  { dex: 1, name: "Bulbasaur", level: 10, gender: "male", hp: 1 },
  { dex: 6, name: "Charizard", level: 1, gender: "male", hp: 1 },
  { dex: 944, name: "Grafaiai", level: 1, gender: "female", hp: 1, held: "leftovers" },
  { dex: 967, name: "Revavroom", level: 1, gender: "male", hp: 0.86, held: "life-orb" },
  { dex: 197, name: "Umbreon", level: 1, gender: "male", hp: 1, held: "black-glasses" },
  { dex: 711, name: "Gourgeist", level: 1, gender: "female", hp: 0.64, held: "sitrus-berry" },
];

/** Index of the Pokémon currently sent out. */
const ACTIVE = 4;

const GENDER = {
  male: { sign: "♂", color: "#7fd8ff" },
  female: { sign: "♀", color: "#ff9ae8" },
  none: { sign: "", color: "transparent" },
} as const;

function hpTone(hp: number) {
  if (hp > 0.5) return THEME.green;
  if (hp > 0.2) return THEME.orange;
  return THEME.red;
}

function Portrait({ mon }: { mon: PartyMon }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={mon.shiny ? pkmn.shinyHome(mon.dex) : pkmn.home(mon.dex)}
      alt={mon.name}
      className="size-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,.6)]"
      loading="lazy"
    />
  );
}

const activeSkin = {
  background: `radial-gradient(120% 140% at 0% 50%, ${hexA(THEME.violet.base, 0.45)} 0%, transparent 64%), linear-gradient(100deg, rgba(38,22,72,.9), rgba(11,7,22,.88))`,
  borderColor: hexA(THEME.violet.base, 0.6),
  boxShadow: `inset 0 1px 0 rgba(255,255,255,.2), 0 0 34px -12px ${hexA(THEME.violet.base, 0.95)}`,
  backdropFilter: "blur(16px)",
} as const;

function Slot({ mon, active }: { mon: PartyMon; active: boolean }) {
  const g = GENDER[mon.gender];
  const tone = hpTone(mon.hp);

  return (
    <div
      className={cn(
        "relative flex h-[58px] w-[214px] items-center gap-3 overflow-hidden rounded-[18px] border pr-3 pl-2",
        !active && "glass-hud",
      )}
      style={active ? activeSkin : undefined}
    >
      <CaptureRing pct={mon.hp} size={44} tone={tone} thickness={2.4}>
        <Portrait mon={mon} />
      </CaptureRing>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13.5px] leading-none font-bold text-white">{mon.name}</span>
          {g.sign && (
            <span className="text-[12px] leading-none" style={{ color: g.color }}>
              {g.sign}
            </span>
          )}
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="num rounded-md bg-white/8 px-1.5 py-[1px] text-[10px] leading-[14px] font-bold text-[var(--text-mid)]">
            Lv {mon.level}
          </span>
          <span className="num text-[10px] leading-none font-semibold" style={{ color: tone.base }}>
            {Math.round(mon.hp * 100)}%
          </span>
        </div>
      </div>

      {mon.held && (
        <div
          className="grid size-[26px] shrink-0 place-items-center rounded-lg border border-white/10 bg-black/25"
          title={mon.held.replace(/-/g, " ")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item(mon.held)} alt="" className="size-[18px] object-contain" loading="lazy" />
        </div>
      )}
    </div>
  );
}

/** Collapsed form: just the six HP dials, so an open panel has room to breathe. */
function SlotDial({ mon, active }: { mon: PartyMon; active: boolean }) {
  return (
    <div
      className={cn("grid size-[52px] place-items-center rounded-[18px] border", !active && "glass-hud")}
      style={active ? activeSkin : undefined}
      title={`${mon.name} · Lv ${mon.level} · ${Math.round(mon.hp * 100)}%`}
    >
      <CaptureRing pct={mon.hp} size={40} tone={hpTone(mon.hp)} thickness={2.2}>
        <Portrait mon={mon} />
      </CaptureRing>
    </div>
  );
}

export function PartyWidget({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="pointer-events-auto absolute top-5 left-4 z-20 flex flex-col gap-2">
      {!collapsed && <div className="kicker pl-1">Party</div>}
      {PARTY.map((mon, i) =>
        collapsed ? (
          <SlotDial key={mon.dex} mon={mon} active={i === ACTIVE} />
        ) : (
          <Slot key={mon.dex} mon={mon} active={i === ACTIVE} />
        ),
      )}
    </div>
  );
}
