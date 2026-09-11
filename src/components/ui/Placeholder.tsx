"use client";

import { Panel } from "./Panel";
import { Bloom, CaptureMark, Motes, PrismMark } from "./Motif";
import { THEME, type ThemeName, hexA } from "@/lib/theme";

/**
 * Phase 2/3 screens are stubbed, but they still get the full treatment: an
 * illustrated stage on the right with the capture ring closing around the art,
 * and the scope of the screen spelled out on the left. An unbuilt screen
 * should still feel like part of the product, not a missing asset.
 */
export function PlaceholderPanel({
  title,
  theme,
  phase,
  bullets,
  blurb,
  art,
  onClose,
}: {
  title: string;
  theme: ThemeName;
  phase: string;
  bullets: string[];
  blurb?: string;
  art?: string;
  onClose: () => void;
}) {
  const t = THEME[theme];

  return (
    <Panel
      title={title}
      kicker={`In design · ${phase}`}
      theme={theme}
      onClose={onClose}
      width="min(1040px, 92vw)"
      height="min(560px, 100%)"
    >
      <div className="flex min-h-0 flex-1 items-stretch">
        {/* scope */}
        <div className="scroll-y anim-rise min-w-0 flex-1 px-8 py-7">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase"
            style={{ borderColor: hexA(t.base, 0.4), background: hexA(t.base, 0.14), color: t.light }}
          >
            <PrismMark size={13} tone={t} />
            Scheduled for {phase}
          </span>

          <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-[var(--text-mid)]">
            {blurb ?? `${title} is specced and waiting on build. Here's what ships in this screen:`}
          </p>

          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="glass-tile flex items-start gap-3 rounded-2xl px-4 py-3">
                <CaptureMark size={16} tone={t} className="mt-[3px] shrink-0" strokeWidth={2} />
                <span className="text-[13.5px] leading-snug text-white/85">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* illustrated stage */}
        <div className="relative hidden w-[42%] shrink-0 overflow-hidden md:block">
          <Bloom tone={t} size={360} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.4} />
          <Motes count={10} />

          <div className="absolute inset-0 grid place-items-center">
            <CaptureMark size={330} tone={t} strokeWidth={0.35} className="anim-spin-slow absolute opacity-30" />
            {art ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={art}
                alt=""
                className="anim-float relative h-[62%] w-auto object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,.85)]"
              />
            ) : (
              <PrismMark size={150} tone={t} className="anim-float relative" strokeWidth={0.9} />
            )}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(180deg, transparent, rgba(6,4,14,.55))" }}
          />
        </div>
      </div>
    </Panel>
  );
}
