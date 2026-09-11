"use client";

import { THEME, type ThemeName, hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

interface Props {
  icon: string;
  label: string;
  theme?: ThemeName;
  keybind?: string;
  notify?: number;
  active?: boolean;
  wide?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Chunky beveled nav button used by both side rails. */
export function RailButton({
  icon, label, theme = "cyan", keybind, notify, active, wide, onClick, className,
}: Props) {
  const t = THEME[theme];

  return (
    <button
      onClick={onClick}
      className={cn(
        "pressable group relative rounded-[12px] border-[3px] text-white",
        wide ? "flex h-[50px] w-full items-center gap-2.5 px-3" : "flex h-[74px] w-[74px] flex-col items-center justify-center gap-0.5",
        className,
      )}
      style={{
        borderColor: active ? t.light : hexA(t.base, 0.95),
        background: `linear-gradient(165deg, ${hexA(t.base, 0.5)}, rgba(10,10,18,.93) 72%)`,
        boxShadow: `inset 0 2px 0 ${hexA(t.light, 0.4)}, inset 0 -3px 0 rgba(0,0,0,.6), 0 0 ${active ? 22 : 12}px ${hexA(t.base, active ? 0.9 : 0.45)}, 0 4px 10px rgba(0,0,0,.7)`,
      }}
    >
      <span className={cn("drop-shadow-[0_2px_4px_rgba(0,0,0,.85)] transition-transform duration-200 group-hover:scale-110", wide ? "text-[24px]" : "text-[28px]")}>
        {icon}
      </span>
      <span
        className={cn("font-display txt-stroke-xs leading-none", wide ? "text-[17px]" : "text-[12px]")}
        style={{ color: "#fff", textShadow: `0 0 10px ${hexA(t.light, .7)}` }}
      >
        {label}
      </span>

      {keybind && (
        <span className="absolute -top-[9px] -left-[7px] grid h-[17px] min-w-[17px] place-items-center rounded-[4px] border border-black/70 bg-[#1d1d28] px-1 text-[10px] font-bold text-[var(--text-mid)]">
          {keybind}
        </span>
      )}
      {!!notify && (
        <span className="absolute -top-[7px] -right-[7px] grid size-[20px] place-items-center rounded-full border-2 border-black/60 bg-[#ef2b45] text-[11px] font-black text-white shadow-[0_0_10px_rgba(239,43,69,.9)]">
          {notify}
        </span>
      )}
    </button>
  );
}
