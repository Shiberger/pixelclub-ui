"use client";

import { THEME, type ThemeName, fill } from "@/lib/theme";

export interface TabItem<T extends string> {
  id: T;
  label: string;
}

/**
 * Segmented control: a recessed track with one filled pill that slides to the
 * active tab. Replaces the old row of separate arcade buttons — a single
 * moving indicator makes the current section obvious without five competing
 * gradients.
 */
export function TabBar<T extends string>({
  tabs,
  value,
  onChange,
  theme = "violet",
}: {
  tabs: readonly TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  theme?: ThemeName;
}) {
  const t = THEME[theme];
  const index = Math.max(0, tabs.findIndex((tab) => tab.id === value));

  return (
    <div className="inset relative flex h-11 shrink-0 items-center rounded-full p-1">
      <span
        className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-full transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          width: `calc((100% - 8px) / ${tabs.length})`,
          transform: `translateX(${index * 100}%)`,
          ...fill(t),
        }}
        aria-hidden
      />
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="ring-focus font-display relative z-10 h-full flex-1 rounded-full px-5 text-[14px] whitespace-nowrap transition-colors"
            style={{ color: active ? "#fff" : "var(--text-lo)" }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
