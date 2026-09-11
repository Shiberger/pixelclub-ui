import { THEME, type ThemeName, hexA } from "@/lib/theme";
import { PrismMark } from "./Motif";

/** Shelf title: a prism tick, the name, and a hairline running to the edge. */
export function SectionHeader({
  label,
  theme = "violet",
  caption,
}: {
  label: string;
  theme?: ThemeName;
  caption?: string;
}) {
  const t = THEME[theme];

  return (
    <div className="mb-3 flex items-center gap-3">
      <PrismMark size={18} tone={t} />
      <span className="font-display-bold text-[19px] leading-none text-white">{label}</span>
      {caption && <span className="text-[12.5px] text-[var(--text-lo)]">{caption}</span>}
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, ${hexA(t.base, 0.45)}, transparent)` }}
      />
    </div>
  );
}

/** Group divider inside a shelf — quieter than the shelf title above it. */
export function GroupBar({ label, count }: { label: string; count?: number }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="kicker leading-none">{label}</span>
      {count !== undefined && (
        <span className="num rounded-full bg-white/6 px-2 py-0.5 text-[11px] font-semibold text-[var(--text-lo)]">
          {count}
        </span>
      )}
      <span className="h-px flex-1 bg-white/8" />
    </div>
  );
}
