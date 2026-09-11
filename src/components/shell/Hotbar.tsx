"use client";

import { useEffect, useState } from "react";
import { item } from "@/lib/assets";
import { cn } from "@/lib/cn";

/**
 * Vanilla Minecraft hotbar (quick slots) plus the crosshair — the two pieces of
 * game chrome that sit under every panel.
 *
 * These belong to the Minecraft client, not to PixelClub, so Design 2.0 leaves
 * their shape alone and only quiets them: no pixel typeface, and the whole bar
 * recedes while a server panel is open.
 */

interface Slot {
  sprite?: string;
  count?: number;
  /** flat-colour stand-in for a Minecraft block */
  block?: { top: string; side: string };
}

const SLOTS: Slot[] = [
  { block: { top: "#a9793f", side: "#8a6132" }, count: 64 }, // oak planks
  { block: { top: "#e8e4d6", side: "#cfcabb" }, count: 64 }, // smooth stone
  { sprite: item("ultra-ball"), count: 63 },
  { sprite: item("poke-ball"), count: 32 },
  { sprite: item("rare-candy"), count: 16 },
  {},
  {},
  {},
  { sprite: item("master-ball"), count: 1 },
];

function BlockIcon({ top, side }: { top: string; side: string }) {
  // simple isometric cube so empty-ish slots still read as Minecraft items
  return (
    <svg viewBox="0 0 16 16" className="size-[30px]" shapeRendering="crispEdges" aria-hidden>
      <polygon points="8,1 15,4.5 8,8 1,4.5" fill={top} />
      <polygon points="1,4.5 8,8 8,15 1,11.5" fill={side} />
      <polygon points="15,4.5 8,8 8,15 15,11.5" fill="#00000033" />
      <polygon points="15,4.5 8,8 8,15 15,11.5" fill={side} opacity=".72" />
    </svg>
  );
}

export function Hotbar({ faded }: { faded: boolean }) {
  const [selected, setSelected] = useState(8);

  // number keys pick a slot, exactly like the game
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 9) setSelected(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="pointer-events-auto absolute inset-x-0 bottom-[14px] z-20 flex justify-center transition-opacity duration-300"
      style={{ opacity: faded ? 0.3 : 0.94 }}
    >
      <div className="relative flex border-[3px] border-[#131317] bg-[#2f2f36]/92 p-[3px]">
        {SLOTS.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "relative grid size-[46px] place-items-center border-2 border-[#22222a] bg-[#4a4a54]",
              i > 0 && "-ml-[2px]",
            )}
            style={{ boxShadow: "inset 1px 1px 0 rgba(255,255,255,.12), inset -1px -1px 0 rgba(0,0,0,.35)" }}
            aria-label={`Hotbar slot ${i + 1}`}
          >
            {s.sprite && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={s.sprite} alt="" className="pixelated size-[32px] object-contain" />
            )}
            {s.block && <BlockIcon {...s.block} />}
            {!!s.count && s.count > 1 && (
              <span className="num absolute right-[3px] bottom-[1px] text-[12px] leading-none font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,.9)]">
                {s.count}
              </span>
            )}
          </button>
        ))}

        {/* selection cursor — 2px larger than a slot, overlapping its neighbours */}
        <span
          className="pointer-events-none absolute top-[-1px] h-[52px] w-[52px] border-[3px] border-[#e6e6ea] transition-[left] duration-100"
          style={{ left: `${-1 + selected * 44}px`, boxShadow: "inset 0 0 0 2px rgba(0,0,0,.45)" }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Minecraft's inverting crosshair. */
export function Crosshair() {
  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ mixBlendMode: "difference" }}
      aria-hidden
    >
      <svg viewBox="0 0 9 9" className="size-[22px]" shapeRendering="crispEdges">
        <rect x="4" y="0" width="1" height="9" fill="#ffffff" />
        <rect x="0" y="4" width="9" height="1" fill="#ffffff" />
      </svg>
    </div>
  );
}
