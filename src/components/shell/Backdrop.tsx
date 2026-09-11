"use client";

import { useEffect, useRef } from "react";
import { drawScene } from "@/lib/worldgen";

/**
 * Stand-in for the live Minecraft view behind the UI.
 *
 * A perspective voxel badlands scene is rasterised into a small canvas and
 * upscaled with `image-rendering: pixelated`, which reproduces Minecraft's
 * chunky texels. Drop a real in-game capture at `public/backdrop.png` and it
 * replaces this automatically — no code change needed.
 */

const CANVAS_W = 480;
const CANVAS_H = 270;

/** Minecraft breeding hearts drifting over the pasture. */
function Hearts() {
  const hearts = [
    { left: "58%", top: "66%", delay: "0s", size: 26 },
    { left: "72%", top: "76%", delay: "1.4s", size: 22 },
    { left: "92%", top: "62%", delay: "2.6s", size: 30 },
  ];
  return (
    <>
      {hearts.map((h) => (
        <svg
          key={h.left}
          viewBox="0 0 7 6"
          className="anim-float absolute"
          style={{ left: h.left, top: h.top, width: h.size, animationDelay: h.delay }}
          shapeRendering="crispEdges"
          aria-hidden
        >
          <path
            fill="#e8384f"
            d="M1 0h2v1H1zM4 0h2v1H4zM0 1h7v2H0zM1 3h5v1H1zM2 4h3v1H2zM3 5h1v1H3z"
          />
        </svg>
      ))}
    </>
  );
}

export function Backdrop({ dimmed }: { dimmed: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (ctx) drawScene(ctx, { width: CANVAS_W, height: CANVAS_H });
  }, []);

  const filter = `blur(${dimmed ? 5 : 0}px) brightness(${dimmed ? 0.74 : 1})`;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#c89a72]">
      <div
        className="absolute inset-0"
        style={{ filter, transition: "filter .3s ease" }}
      >
        <canvas
          ref={ref}
          width={CANVAS_W}
          height={CANVAS_H}
          className="pixelated absolute inset-0 size-full object-cover"
          aria-hidden
        />
        <Hearts />

        {/* real in-game capture, when one is supplied */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "image-set(url('/backdrop.png') 1x)" }}
          aria-hidden
        />
      </div>

      {/* vignette so panels stay readable on top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(20,10,4,.5)_100%)]" />
    </div>
  );
}
