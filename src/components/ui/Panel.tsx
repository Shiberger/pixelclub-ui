"use client";

import { type ReactNode, useEffect } from "react";
import { THEME, type ThemeName, hexA } from "@/lib/theme";
import { Beams, CaptureMark } from "./Motif";
import { CloseIcon } from "./icons";
import { cn } from "@/lib/cn";

interface PanelProps {
  title: string;
  /** small all-caps line above the title */
  kicker?: string;
  theme?: ThemeName;
  onClose: () => void;
  /** rendered in the header, right of the title (tabs, progress, …) */
  headerSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

/**
 * The Design 2.0 window: one translucent violet pane, a hairline edge and a
 * quiet header — no plates, no frames, no nested boxes. It is deliberately
 * see-through and inset from the viewport so the world keeps reading behind
 * it, and it opens with a short "capture" unfold rather than a pop.
 */
export function Panel({
  title,
  kicker,
  theme = "violet",
  onClose,
  headerSlot,
  children,
  className,
  width = "min(1180px, 92vw)",
  height = "min(680px, 100%)",
}: PanelProps) {
  const t = THEME[theme];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    /* the side padding keeps the collapsed HUD rails clickable beside the panel */
    <div className="anim-fade absolute inset-0 z-40 flex items-center justify-center px-[80px] pt-6 pb-[92px]">
      <button
        aria-label="Close panel"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(12,6,26,.35), rgba(4,2,10,.62) 90%)" }}
      />

      <div
        className={cn("anim-panel glass grain relative flex max-h-full min-h-0 flex-col overflow-hidden rounded-[26px]", className)}
        style={{
          width,
          height,
          borderColor: hexA(t.base, 0.26),
          boxShadow: `inset 0 1px 0 rgba(255,255,255,.16), 0 50px 120px -40px rgba(0,0,0,.95), 0 0 70px -30px ${hexA(t.base, 0.75)}`,
        }}
      >
        <Beams tone={t} intensity={0.55} className="opacity-70" />

        {/* header */}
        <header className="relative z-10 flex shrink-0 items-center gap-4 border-b border-white/8 px-6 py-4">
          <div className="relative grid size-11 shrink-0 place-items-center">
            <span
              className="absolute inset-0 rounded-full blur-[14px]"
              style={{ background: hexA(t.base, 0.55) }}
              aria-hidden
            />
            <CaptureMark size={34} tone={t} filled strokeWidth={1.6} className="relative" />
          </div>

          <div className="min-w-0">
            {kicker && <div className="kicker leading-none">{kicker}</div>}
            <h2 className="font-display-bold mt-1 text-[26px] leading-none text-white">{title}</h2>
          </div>

          {headerSlot && <div className="flex min-w-0 flex-1 items-center justify-end gap-4">{headerSlot}</div>}
          {!headerSlot && <div className="flex-1" />}

          <button
            onClick={onClose}
            aria-label="Close"
            className="press ring-focus glass-tile grid size-10 shrink-0 place-items-center rounded-full text-[var(--text-mid)] hover:text-white"
          >
            <CloseIcon className="size-4" />
          </button>
        </header>

        {/* body */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
