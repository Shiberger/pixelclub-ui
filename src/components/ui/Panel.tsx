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
    /*
     * The side/bottom padding keeps the collapsed HUD rails clickable beside
     * the panel — but only once there is room to spare one. Below `sm` the
     * panel goes near-full-bleed instead (the rails are hidden behind it on
     * phones anyway, see useIsCompactHud), and grows back to the desktop
     * inset at `lg`.
     */
    <div className="panel-frame anim-fade absolute inset-0 z-40 flex items-center justify-center">
      <button
        aria-label="Close panel"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(12,6,26,.35), rgba(4,2,10,.62) 90%)" }}
      />

      <div
        className={cn(
          "anim-panel glass grain @container relative flex max-h-full min-h-0 flex-col overflow-hidden rounded-[26px]",
          className,
        )}
        style={{
          width,
          height,
          borderColor: hexA(t.base, 0.26),
          boxShadow: `inset 0 1px 0 rgba(255,255,255,.16), 0 50px 120px -40px rgba(0,0,0,.95), 0 0 70px -30px ${hexA(t.base, 0.75)}`,
        }}
      >
        <Beams tone={t} intensity={0.55} className="opacity-70" />

        {/*
          The header lays out in one row once the panel itself (not the
          viewport — this is a @container query) is wide enough for title +
          headerSlot + close button; below that, headerSlot drops to its own
          full-width row underneath so nothing gets crushed.
        */}
        <header className="relative z-10 flex shrink-0 flex-col gap-3 border-b border-white/8 px-4 py-3 @sm:px-6 @sm:py-4">
          <div className="flex items-center gap-3 @sm:gap-4">
            <div className="relative grid size-9 shrink-0 place-items-center @sm:size-11">
              <span
                className="absolute inset-0 rounded-full blur-[14px]"
                style={{ background: hexA(t.base, 0.55) }}
                aria-hidden
              />
              <CaptureMark size={28} tone={t} filled strokeWidth={1.6} className="relative @sm:hidden" />
              <CaptureMark size={34} tone={t} filled strokeWidth={1.6} className="relative hidden @sm:block" />
            </div>

            <div className="min-w-0">
              {kicker && <div className="kicker leading-none">{kicker}</div>}
              <h2 className="font-display-bold mt-1 text-[19px] leading-none text-white @sm:text-[26px]">{title}</h2>
            </div>

            {headerSlot && (
              <div className="@container hidden min-w-0 flex-1 items-center justify-end gap-4 @md:flex">
                {headerSlot}
              </div>
            )}
            {!headerSlot && <div className="flex-1" />}

            <button
              onClick={onClose}
              aria-label="Close"
              className="press ring-focus glass-tile grid size-9 shrink-0 place-items-center rounded-full text-[var(--text-mid)] hover:text-white @sm:size-10"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>

          {/*
            This copy gets its own `@container`, distinct from the inline one
            above — headerSlot's *own* `@md:` classes must measure whichever
            of these two boxes is actually showing it, not the outer Panel's
            width (that inline slot above can be far narrower than the Panel
            once the title has taken its share of the row).
          */}
          {headerSlot && (
            <div className="@container flex min-w-0 items-center gap-3 @md:hidden">{headerSlot}</div>
          )}
        </header>

        {/* body */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
