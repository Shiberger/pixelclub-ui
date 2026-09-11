"use client";

import { Panel } from "./Panel";
import type { ThemeName } from "@/lib/theme";

/** Phase-2/3 screens are stubbed so navigation is complete end to end. */
export function PlaceholderPanel({
  title, theme, phase, bullets, onClose,
}: { title: string; theme: ThemeName; phase: string; bullets: string[]; onClose: () => void }) {
  return (
    <Panel title={title} theme={theme} onClose={onClose} width="min(880px, 92vw)">
      <div className="scroll-y flex h-full flex-col items-center justify-center gap-5 p-10 text-center">
        <div className="anim-float text-[64px] drop-shadow-[0_6px_16px_rgba(0,0,0,.8)]">🚧</div>
        <div>
          <div className="font-display txt-stroke text-[30px]">{title}</div>
          <div className="mt-1 text-[15px] font-semibold text-[var(--text-mid)]">Scheduled for {phase}</div>
        </div>
        <ul className="w-full max-w-[520px] space-y-2 text-left">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 rounded-[8px] border border-white/10 bg-white/[.05] px-3 py-2 text-[13px] text-[var(--text-mid)]">
              <span className="mt-[2px] text-[var(--cyan)]">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
