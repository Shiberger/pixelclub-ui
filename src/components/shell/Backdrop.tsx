"use client";

import { useEffect, useRef } from "react";
import { drawScene } from "@/lib/worldgen";
import { Beams, Motes } from "@/components/ui/Motif";
import { THEME } from "@/lib/theme";

/**
 * Stand-in for the live Minecraft view behind the UI.
 *
 * The voxel scene itself is unchanged — Design 2.0 sits on top of it as a
 * lighting rig: a violet grade, volumetric shafts raking across the world and
 * slow motes in the air, so the UI's palette reads as the same place rather
 * than chrome pasted over a screenshot. Drop a real capture at
 * `public/backdrop.png` and it replaces the canvas automatically.
 */

const CANVAS_W = 480;
const CANVAS_H = 270;

export function Backdrop({ dimmed }: { dimmed: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx) drawScene(ctx, { width: CANVAS_W, height: CANVAS_H });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--ink-0)]">
      <div
        className="absolute inset-0"
        style={{
          filter: dimmed
            ? "blur(9px) brightness(.72) saturate(1.05)"
            : "blur(0) brightness(1.04) saturate(1.15) contrast(1.06)",
          transform: dimmed ? "scale(1.03)" : "none",
          transition: "filter .45s ease, transform .45s ease",
        }}
      >
        <canvas
          ref={ref}
          width={CANVAS_W}
          height={CANVAS_H}
          className="pixelated absolute inset-0 size-full object-cover"
          aria-hidden
        />

        {/* real in-game capture, when one is supplied */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "image-set(url('/backdrop.png') 1x)" }}
          aria-hidden
        />

        {/* violet grade — pulls the world into the UI's palette */}
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: "linear-gradient(170deg, #8b5cf6 0%, #4d18ad 55%, #240a52 100%)", opacity: dimmed ? 0.5 : 0.26 }}
          aria-hidden
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: "radial-gradient(80% 60% at 62% 8%, rgba(203,182,255,.34), transparent 70%)" }}
          aria-hidden
        />
      </div>

      {/* cinematic light, above the blur so shafts stay crisp while the world softens */}
      <Beams tone={THEME.violet} intensity={dimmed ? 1.15 : 0.8} />
      <Motes count={16} />

      {/* vignette + HUD legibility gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, transparent 38%, rgba(6,3,16,.66) 100%), linear-gradient(180deg, rgba(6,3,16,.5) 0%, transparent 22%, transparent 74%, rgba(6,3,16,.6) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
