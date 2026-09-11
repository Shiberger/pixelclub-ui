"use client";

import { CURRENCIES, WALLET } from "@/data/store";
import { SEASON } from "@/data/battlepass";
import { legendaryGif, pkmn } from "@/lib/assets";
import { THEME, type ThemeName, hexA } from "@/lib/theme";
import { CaptureMark } from "@/components/ui/Motif";
import { DexIcon, PassIcon, PlusIcon, PointToken, QuestIcon, StoreIcon, WikiIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import type { PanelId } from "./GameShell";

/* ============================================================================
   The menu, as a shelf of illustrated cards.

   Each entry is a small scene — art, light and its own accent — instead of a
   text-plus-icon row, so the menu tells you where you are going and invites a
   click. While a panel is open the shelf folds down to an icon rail, which
   keeps navigation reachable without the panel having to cover it.
   ============================================================================ */

interface Entry {
  id: Exclude<PanelId, null>;
  label: string;
  caption: string;
  hotkey: string;
  theme: ThemeName;
  art: string;
  /** nudges art that sits off-centre in its source frame */
  artStyle?: React.CSSProperties;
  Icon: (p: { className?: string }) => React.ReactElement;
}

const ENTRIES: Entry[] = [
  {
    id: "store",
    label: "Store",
    caption: "Bundles · Ranks · Items",
    hotkey: "S",
    theme: "magenta",
    art: legendaryGif.gimmighoul,
    artStyle: { transform: "translateY(6%) scale(1.15)" },
    Icon: StoreIcon,
  },
  {
    id: "battlepass",
    label: "Battlepass",
    caption: `Season ${SEASON.number} · ${SEASON.name}`,
    hotkey: "B",
    theme: "gold",
    art: SEASON.heroSprite,
    Icon: PassIcon,
  },
  {
    id: "quests",
    label: "Rewards",
    caption: "Daily · Weekly · Pokédex",
    hotkey: "Q",
    theme: "green",
    art: pkmn.home(133),
    Icon: QuestIcon,
  },
  {
    id: "pokedex",
    label: "Pokédex",
    caption: "Caught 312 / 1010",
    hotkey: "P",
    theme: "cyan",
    art: pkmn.home(151),
    Icon: DexIcon,
  },
  {
    id: "wiki",
    label: "Wiki",
    caption: "Guides · Spawn tables",
    hotkey: "K",
    theme: "violet",
    art: pkmn.home(196),
    Icon: WikiIcon,
  },
];

function activeSkin(t: (typeof THEME)[ThemeName]) {
  return {
    background: `
      radial-gradient(120% 130% at 100% 50%, ${hexA(t.base, 0.55)} 0%, transparent 70%),
      linear-gradient(100deg, ${hexA(t.dark, 0.92)}, rgba(10,7,21,.9))
    `,
    borderColor: hexA(t.base, 0.65),
    boxShadow: `inset 0 1px 0 rgba(255,255,255,.22), 0 18px 40px -18px rgba(0,0,0,.95), 0 0 40px -12px ${hexA(t.base, 0.95)}`,
  } as const;
}

function MenuCard({ entry, active, onClick }: { entry: Entry; active: boolean; onClick: () => void }) {
  const t = THEME[entry.theme];
  const { Icon } = entry;

  return (
    <button
      onClick={onClick}
      className={cn(
        "lift ring-focus group relative h-[76px] w-full overflow-hidden rounded-[20px] border text-left",
        active ? "border-transparent" : "glass-hud",
      )}
      style={active ? activeSkin(t) : undefined}
    >
      {/* scene light */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(90% 120% at 96% 50%, ${hexA(t.base, active ? 0.45 : 0.3)} 0%, transparent 64%)` }}
        aria-hidden
      />

      {/* illustration, bleeding off the right edge */}
      <span className="pointer-events-none absolute top-0 right-0 bottom-0 w-[108px] overflow-hidden" aria-hidden>
        <span
          className="absolute top-1/2 left-1/2 size-[86px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[22px]"
          style={{ background: hexA(t.light, active ? 0.6 : 0.4) }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.art}
          alt=""
          loading="lazy"
          className="absolute inset-0 m-auto h-[82%] w-auto max-w-none object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,.75)] transition-transform duration-300 group-hover:scale-[1.12]"
          style={entry.artStyle}
        />
      </span>

      {/* label block */}
      <span className="relative flex h-full flex-col justify-center gap-1.5 pl-4">
        <span className="flex items-center gap-2">
          <Icon className={cn("size-[17px] shrink-0", active ? "text-white" : "text-[var(--text-mid)]")} />
          <span className="font-display-bold text-[16px] leading-none text-white">{entry.label}</span>
          {active ? (
            <CaptureMark size={13} tone={t} filled strokeWidth={2.4} className="shrink-0" />
          ) : (
            <span
              className="rounded-md border border-white/15 bg-white/8 px-1.5 py-[1px] text-[9.5px] leading-[13px] font-bold tracking-wider text-white/55"
              aria-hidden
            >
              {entry.hotkey}
            </span>
          )}
        </span>
        <span className="max-w-[136px] truncate text-[11px] leading-none font-semibold text-[var(--text-mid)] opacity-80">
          {entry.caption}
        </span>
      </span>
    </button>
  );
}

function MenuIcon({ entry, active, onClick }: { entry: Entry; active: boolean; onClick: () => void }) {
  const t = THEME[entry.theme];
  const { Icon } = entry;

  return (
    <button
      onClick={onClick}
      title={`${entry.label} · ${entry.hotkey}`}
      aria-label={entry.label}
      className={cn(
        "press ring-focus group relative grid size-[52px] place-items-center overflow-hidden rounded-[18px] border",
        active ? "border-transparent" : "glass-hud",
      )}
      style={active ? activeSkin(t) : undefined}
    >
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(100% 100% at 50% 100%, ${hexA(t.base, active ? 0.5 : 0.22)}, transparent 70%)` }}
        aria-hidden
      />
      <Icon className={cn("relative size-5", active ? "text-white" : "text-[var(--text-mid)]")} />
    </button>
  );
}

function Wallet({ collapsed }: { collapsed: boolean }) {
  const total = CURRENCIES.reduce((n, c) => n + (WALLET[c.id] ?? 0), 0);

  if (collapsed) {
    return (
      <div className="glass flex w-[52px] flex-col items-center gap-1 rounded-[18px] py-2">
        <PointToken size={18} />
        <span className="num text-[10px] leading-none font-bold text-white">{total.toLocaleString("en-US")}</span>
      </div>
    );
  }

  return (
    <div className="glass flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-3">
      {CURRENCIES.map((c) => (
        <div key={c.id} className="flex min-w-0 items-center gap-2">
          <PointToken size={20} />
          <span className="num text-[15px] leading-none font-bold text-white">
            {WALLET[c.id].toLocaleString("en-US")}
          </span>
          <span className="kicker leading-none">{c.name}</span>
        </div>
      ))}
      <button
        className="press ring-focus grid size-7 shrink-0 place-items-center rounded-full text-white"
        style={{
          background: `linear-gradient(180deg, ${hexA(THEME.violet.light, 0.9)}, ${THEME.violet.base})`,
          boxShadow: `0 6px 16px -8px ${hexA(THEME.violet.base, 0.95)}`,
        }}
        title="Top up Points"
        aria-label="Top up Points"
      >
        <PlusIcon className="size-3.5" />
      </button>
    </div>
  );
}

export function MenuDock({ open, onOpen }: { open: PanelId; onOpen: (p: PanelId) => void }) {
  const collapsed = open !== null;

  return (
    <div
      className={cn(
        "pointer-events-auto absolute top-5 right-4 z-20 flex flex-col items-end gap-3",
        collapsed ? "w-[52px]" : "w-[264px]",
      )}
    >
      <Wallet collapsed={collapsed} />
      <div className="flex w-full flex-col items-end gap-2.5">
        {ENTRIES.map((e) => {
          const props = {
            entry: e,
            active: open === e.id,
            onClick: () => onOpen(open === e.id ? null : e.id),
          };
          return collapsed ? <MenuIcon key={e.id} {...props} /> : <MenuCard key={e.id} {...props} />;
        })}
      </div>
    </div>
  );
}
