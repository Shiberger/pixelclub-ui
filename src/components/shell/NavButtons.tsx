"use client";

import { cn } from "@/lib/cn";
import { CURRENCIES, WALLET } from "@/data/store";
import type { PanelId } from "./GameShell";

/**
 * Server-menu entry points, styled as vanilla Minecraft GUI buttons.
 *
 * The reference capture has no such rail — in game these screens open from
 * commands or a menu item — but the prototype needs somewhere to click, so the
 * buttons borrow Minecraft's own widget styling instead of inventing chrome.
 */

const ENTRIES: { id: Exclude<PanelId, null>; label: string; icon: string; key: string }[] = [
  { id: "store", label: "Store", icon: "🛒", key: "S" },
  { id: "battlepass", label: "Battlepass", icon: "🏆", key: "B" },
  { id: "quests", label: "Rewards", icon: "📜", key: "Q" },
  { id: "pokedex", label: "Pokédex", icon: "📕", key: "P" },
  { id: "wiki", label: "Wiki", icon: "📖", key: "K" },
];

export function McButton({
  children, onClick, active, className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-pixel group relative px-3 text-[15px] text-white [text-shadow:2px_2px_0_#2b2b2b]",
        "border-[3px] border-[#0d0d10] transition-colors",
        active ? "bg-[#6b96d1]" : "bg-[#8b8b8b] hover:bg-[#9aa7bd]",
        className,
      )}
      style={{ boxShadow: "inset 2px 2px 0 rgba(255,255,255,.35), inset -2px -2px 0 rgba(0,0,0,.35)" }}
    >
      {children}
    </button>
  );
}

export function NavButtons({ open, onOpen }: { open: PanelId; onOpen: (p: PanelId) => void }) {
  return (
    <div className="pointer-events-auto absolute top-[88px] right-3 z-20 flex w-[176px] flex-col gap-[6px]">
      {/* wallet strip */}
      <div
        className="font-pixel flex flex-col gap-[3px] border-[3px] border-[#0d0d10] bg-[#3e3e46]/92 p-[6px]"
        style={{ boxShadow: "inset 2px 2px 0 rgba(255,255,255,.14), inset -2px -2px 0 rgba(0,0,0,.42)" }}
      >
        {CURRENCIES.map((c) => (
          <div key={c.id} className="flex items-center gap-2 text-[13px] text-white [text-shadow:2px_2px_0_#101015]">
            <span className="text-[14px] leading-none">{c.icon}</span>
            <span className="truncate opacity-80">{c.name}</span>
            <span className="ml-auto tabular-nums" style={{ color: c.color }}>
              {WALLET[c.id].toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>

      {ENTRIES.map((e) => (
        <McButton
          key={e.id}
          active={open === e.id}
          onClick={() => onOpen(open === e.id ? null : e.id)}
          className="flex h-[38px] items-center gap-2"
        >
          <span className="text-[16px] leading-none">{e.icon}</span>
          <span>{e.label}</span>
          <span className="ml-auto text-[11px] opacity-60">{e.key}</span>
        </McButton>
      ))}
    </div>
  );
}
