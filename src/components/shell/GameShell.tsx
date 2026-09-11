"use client";

import { useCallback, useEffect, useState } from "react";
import { Backdrop } from "./Backdrop";
import { PartyWidget } from "./PartyWidget";
import { Hotbar, Crosshair } from "./Hotbar";
import { NavButtons } from "./NavButtons";
import { StorePanel } from "@/components/store/StorePanel";
import { BattlepassPanel } from "@/components/battlepass/BattlepassPanel";
import { PlaceholderPanel } from "@/components/ui/Placeholder";
import { Toast } from "@/components/ui/Toast";

export type PanelId = "store" | "battlepass" | "quests" | "pokedex" | "wiki" | null;

/** Hotkeys mirroring the labels on the nav buttons. */
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
      <Backdrop dimmed={panel !== null} />
      {!panel && <Crosshair />}

      <div className="pointer-events-none absolute inset-0">
        <PartyWidget />
        <NavButtons open={panel} onOpen={setPanel} />
        <Hotbar />
      </div>

      {/* --- server UI layer --- */}
      {panel === "store" && <StorePanel onClose={close} onPurchase={purchase} />}
      {panel === "battlepass" && <BattlepassPanel onClose={close} onPurchase={purchase} />}

      {panel === "quests" && (
        <PlaceholderPanel
          title="Pokédex Rewards"
          theme="cyan"
          phase="Phase 2"
          onClose={close}
          bullets={[
            "Quest list with Daily / Weekly / Region filters and live progress bars",
            "Detail pane showing objectives, timers and the reward stack",
            "Pokédex completion milestones (Kanto 50% → Master Ball, etc.)",
            "Claim + Claim All flow reusing the Battlepass reward cells",
          ]}
        />
      )}
      {panel === "pokedex" && (
        <PlaceholderPanel
          title="Pokédex"
          theme="red"
          phase="Phase 2"
          onClose={close}
          bullets={[
            "Region tabs with a caught / seen / missing grid of 1,000+ entries",
            "Detail view with the 3D render, typing, stats and catch locations",
            "Search + filters by type, rarity, generation and shiny status",
            "Completion ring feeding the Pokédex Rewards screen",
          ]}
        />
      )}
      {panel === "wiki" && (
        <PlaceholderPanel
          title="PixelClub Wiki"
          theme="violet"
          phase="Phase 3"
          onClose={close}
          bullets={[
            "Searchable in-game knowledge base with a left-hand category tree",
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
