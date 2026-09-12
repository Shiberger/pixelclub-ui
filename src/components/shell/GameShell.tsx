"use client";

import { useCallback, useEffect, useState } from "react";
import { Backdrop } from "./Backdrop";
import { PartyWidget } from "./PartyWidget";
import { Hotbar, Crosshair } from "./Hotbar";
import { MenuDock } from "./MenuDock";
import { StorePanel } from "@/components/store/StorePanel";
import { BattlepassPanel } from "@/components/battlepass/BattlepassPanel";
import { PlaceholderPanel } from "@/components/ui/Placeholder";
import { Toast } from "@/components/ui/Toast";
import { legendaryGif, pkmn } from "@/lib/assets";

export type PanelId = "store" | "battlepass" | "quests" | "pokedex" | "wiki" | null;

/** Hotkeys mirroring the chips on the menu cards. */
const HOTKEYS: Record<string, Exclude<PanelId, null>> = {
  s: "store",
  b: "battlepass",
  q: "quests",
  p: "pokedex",
  k: "wiki",
};

export function GameShell() {
  const [panel, setPanel] = useState<PanelId>("store");
  const [toast, setToast] = useState<string | null>(null);

  const close = useCallback(() => setPanel(null), []);
  const purchase = useCallback((label: string) => setToast(label), []);
  const open = panel !== null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const next = HOTKEYS[e.key.toLowerCase()];
      if (next) setPanel((cur) => (cur === next ? null : next));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden select-none">
      {/* --- Minecraft game layer --- */}
      <Backdrop dimmed={open} />
      {!open && <Crosshair />}

      {/* --- server HUD --- */}
      <div className="pointer-events-none absolute inset-0">
        <PartyWidget collapsed={open} />
        <MenuDock open={panel} onOpen={setPanel} />
        <Hotbar faded={open} />

        <div
          className="glass absolute hidden items-center gap-2.5 rounded-full px-3.5 py-2 sm:flex"
          style={{ bottom: "calc(1.25rem + var(--safe-b))", left: "calc(1.25rem + var(--safe-l))" }}
        >
          <span className="size-2 rounded-full bg-[var(--mint-500)] shadow-[0_0_8px_var(--mint-500)]" />
          <span className="text-[12px] leading-none font-bold text-white">pixelclub.asia</span>
          <span className="num text-[11px] leading-none text-[var(--text-lo)]">842 online</span>
        </div>
      </div>

      {/* --- server UI layer --- */}
      {panel === "store" && <StorePanel onClose={close} onPurchase={purchase} />}
      {panel === "battlepass" && <BattlepassPanel onClose={close} onPurchase={purchase} />}

      {panel === "quests" && (
        <PlaceholderPanel
          title="Rewards"
          theme="green"
          phase="Phase 2"
          art={pkmn.home(133)}
          blurb="Daily, weekly and Pokédex milestones in one place — every claim routed through the same reward cell you already know from the Battlepass."
          onClose={close}
          bullets={[
            "Quest list with Daily / Weekly / Region filters and live progress rings",
            "Detail pane showing objectives, timers and the reward stack",
            "Pokédex completion milestones (Kanto 50% → Master Ball, etc.)",
            "Claim + Claim All flow reusing the Battlepass reward cells",
          ]}
        />
      )}
      {panel === "pokedex" && (
        <PlaceholderPanel
          title="Pokédex"
          theme="cyan"
          phase="Phase 2"
          art={pkmn.home(151)}
          blurb="The collection screen: a caught/seen grid that doubles as the entry point into every Pokémon's detail card."
          onClose={close}
          bullets={[
            "Region tabs with a caught / seen / missing grid of 1,000+ entries",
            "Detail view with the 3D render, typing, stats and catch locations",
            "Search + filters by type, rarity, generation and shiny status",
            "Completion ring feeding the Rewards screen",
          ]}
        />
      )}
      {panel === "wiki" && (
        <PlaceholderPanel
          title="Wiki"
          theme="violet"
          phase="Phase 3"
          art={legendaryGif.latios}
          blurb="In-game knowledge base, so players stop alt-tabbing to Discord for spawn rates and rank perks."
          onClose={close}
          bullets={[
            "Searchable knowledge base with a left-hand category tree",
            "Article pages for mechanics, ranks, events and server rules",
            "Type-effectiveness chart and spawn-rate tables",
            "Deep links from the catch alert and Pokédex entries",
          ]}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </main>
  );
}
