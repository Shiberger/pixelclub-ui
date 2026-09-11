"use client";

import { type ReactNode, useEffect } from "react";
import { BannerTitle } from "./BannerTitle";
import { THEME, type ThemeName, hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

interface PanelProps {
  title: string;
  theme?: ThemeName;
  onClose: () => void;
  /** rendered on the banner row, right of the title (tabs, search, …) */
  headerSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

/**
 * The standard modal shell: heavy gradient border, ornate title plate
 * overlapping the top-left corner, round red close button on the right.
 */
export function Panel({
  title,
  theme = "magenta",
  onClose,
  headerSlot,
  children,
  className,
  width = "min(1180px, 94vw)",
  height = "min(690px, 100%)",
}: PanelProps) {
  const t = THEME[theme];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="anim-fade absolute inset-0 z-40 flex items-center justify-center px-4 pt-14 pb-[150px]">
      <button
        aria-label="Close panel"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/25"
      />

      <div className={cn("anim-pop relative flex max-h-full min-h-0 flex-col", className)} style={{ width }}>
        {/* header row: title plate + slot + close */}
        <div className="relative z-30 flex items-end gap-3 px-2">
          <BannerTitle title={title} theme={theme} />
          <div className="mb-3 flex min-w-0 flex-1 items-center justify-center gap-3">{headerSlot}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="pressable bevel mb-2 grid size-[46px] shrink-0 place-items-center rounded-full border-[3px] border-black/60 text-[22px] font-black text-white"
            style={{ background: "linear-gradient(180deg,#ff4d63,#c81232)" }}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div
          className="relative -mt-[42px] flex min-h-0 flex-col overflow-hidden rounded-[18px] border-[3px] p-[10px] pt-[54px]"
          style={{
            borderColor: t.base,
            background: `linear-gradient(160deg, ${hexA(t.dark, 0.85)} 0%, rgba(10,10,16,.97) 28%, rgba(7,7,12,.98) 100%)`,
            boxShadow: `inset 0 0 0 1px ${hexA(t.light, 0.35)}, 0 0 32px ${hexA(t.base, 0.45)}, 0 24px 60px rgba(0,0,0,.8)`,
            height,
          }}
        >
          <div className="flex min-h-0 flex-1 flex-col rounded-[10px] bg-black/45 bevel-inset">{children}</div>
        </div>
      </div>
    </div>
  );
}
