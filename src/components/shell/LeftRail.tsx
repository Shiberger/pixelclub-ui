"use client";

import { RailButton } from "./RailButton";
import type { PanelId } from "./GameShell";

export function LeftRail({ open, onOpen }: { open: PanelId; onOpen: (p: PanelId) => void }) {
  return (
    <div className="pointer-events-auto absolute top-1/2 left-4 z-20 flex w-[164px] -translate-y-1/2 flex-col gap-2.5">
      <RailButton wide icon="🛒" label="Store" theme="magenta" active={open === "store"} onClick={() => onOpen("store")} />

      <div className="grid grid-cols-2 gap-2.5">
        <RailButton icon="📕" label="Pokédex" theme="red" keybind="P" active={open === "pokedex"} onClick={() => onOpen("pokedex")} />
        <RailButton icon="🎒" label="Bag" theme="cyan" keybind="B" onClick={() => onOpen(null)} />
        <RailButton icon="📜" label="Quests" theme="gold" keybind="Q" notify={3} active={open === "quests"} onClick={() => onOpen("quests")} />
        <RailButton icon="🔮" label="Summon" theme="violet" keybind="R" onClick={() => onOpen(null)} />
        <RailButton icon="🧭" label="Areas" theme="green" keybind="M" onClick={() => onOpen(null)} />
        <RailButton icon="⚔️" label="Battle" theme="orange" keybind="F" onClick={() => onOpen(null)} />
      </div>

      <RailButton wide icon="🎉" label="Events" theme="red" notify={1} onClick={() => onOpen(null)} />
    </div>
  );
}
