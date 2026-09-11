"use client";

import { THEME, type ThemeName, hexA } from "@/lib/theme";

export interface TabItem<T extends string> {
  id: T;
  label: string;
}

export function TabBar<T extends string>({
  tabs,
  value,
  onChange,
  theme = "magenta",
}: {
  tabs: readonly TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  theme?: ThemeName;
}) {
  const t = THEME[theme];

  return (
    <div className="flex w-full max-w-[660px] items-center gap-3">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="pressable bevel-sm font-display txt-stroke-sm h-[44px] flex-1 rounded-[10px] border-2 border-black/70 text-[17px] text-white"
            style={
              active
                ? {
                    background: `linear-gradient(180deg, ${t.light}, ${t.base} 55%, ${t.dark})`,
                    boxShadow: `inset 0 2px 0 ${hexA("#ffffff", 0.4)}, inset 0 -3px 0 rgba(0,0,0,.4), 0 0 16px ${hexA(t.base, 0.7)}, 0 3px 0 rgba(0,0,0,.6)`,
                  }
                : { background: "linear-gradient(180deg,#6d6d80,#3a3a4a 55%,#23232f)" }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
