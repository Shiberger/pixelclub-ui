import { THEME, type ThemeName, hexA } from "@/lib/theme";

export function SectionHeader({ label, theme = "magenta" }: { label: string; theme?: ThemeName }) {
  const t = THEME[theme];
  return (
    <div className="mb-2 flex items-center gap-2 pt-1">
      <span className="text-[15px]" style={{ color: t.base, filter: `drop-shadow(0 0 6px ${hexA(t.base, .9)})` }}>★</span>
      <span className="font-display txt-stroke-xs text-[19px]" style={{ color: t.base }}>{label}</span>
      <span className="h-[3px] flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${hexA(t.base, .7)}, transparent)` }} />
    </div>
  );
}

/** The flat grey divider bar used above each bundle group. */
export function GroupBar({ label }: { label: string }) {
  return (
    <div className="mb-3 rounded-[7px] border border-white/5 bg-white/[.06] px-3 py-[7px] text-[14px] font-semibold text-[var(--text-mid)]">
      {label}
    </div>
  );
}
