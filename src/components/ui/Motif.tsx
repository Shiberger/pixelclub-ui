import { type Accent, THEME, hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

/* ============================================================================
   Design 2.0 visual language.

   Two marks carry the whole identity:
     · Capture — a Poké Ball abstracted to a ring, an equator and a centre pip.
       Used for indicators, nodes, states and progress.
     · Prism — the logo's cube as an isometric outline. Used for badges,
       watermarks and anything that should feel like a collectible object.

   Plus the light rig (beams, bloom, motes) that gives every screen depth.
   ============================================================================ */

/** The capture mark: ring + equator + centre pip. */
export function CaptureMark({
  size = 22,
  className,
  tone = THEME.violet,
  filled = false,
  strokeWidth = 1.8,
}: {
  size?: number;
  className?: string;
  tone?: Accent;
  filled?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      {filled && <circle cx="12" cy="12" r="10.4" fill={hexA(tone.base, 0.22)} />}
      <circle cx="12" cy="12" r="10.4" fill="none" stroke={tone.base} strokeWidth={strokeWidth} />
      <path d="M1.6 12h6.2M16.2 12h6.2" stroke={tone.base} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke={tone.light} strokeWidth={strokeWidth} />
      {filled && <circle cx="12" cy="12" r="1.7" fill={tone.light} />}
    </svg>
  );
}

/**
 * The capture mark as a progress dial: the ring fills clockwise. Children sit
 * inside the ring, so it doubles as a portrait frame (party HP, completion).
 */
export function CaptureRing({
  pct,
  size = 52,
  tone = THEME.violet,
  track = "rgba(255,255,255,.12)",
  thickness = 3,
  children,
  className,
}: {
  pct: number;
  size?: number;
  tone?: Accent;
  track?: string;
  thickness?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const r = 50 - thickness * 1.6;
  const c = 2 * Math.PI * r;

  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke={track} strokeWidth={thickness * 1.6} />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={tone.base}
          strokeWidth={thickness * 1.6}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(0, Math.min(1, pct)))}
          style={{ filter: `drop-shadow(0 0 4px ${hexA(tone.base, 0.9)})`, transition: "stroke-dashoffset .4s ease" }}
        />
      </svg>
      <div className="absolute inset-[14%] grid place-items-center">{children}</div>
    </div>
  );
}

/** The logo's cube as an isometric outline — badges, empty states, watermarks. */
export function PrismMark({
  size = 20,
  className,
  tone = THEME.violet,
  strokeWidth = 1.5,
}: {
  size?: number;
  className?: string;
  tone?: Accent;
  strokeWidth?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <g fill="none" stroke={tone.base} strokeWidth={strokeWidth} strokeLinejoin="round">
        <path d="M12 2.2l8.4 4.9v9.8L12 21.8l-8.4-4.9V7.1z" />
        <path d="M12 12v9.8" />
        <path d="M12 12l8.4-4.9M12 12L3.6 7.1" />
      </g>
      <path d="M12 12l8.4-4.9v9.8L12 21.8z" fill={hexA(tone.base, 0.16)} />
    </svg>
  );
}

/**
 * Volumetric light: a few soft shafts raking down across whatever sits behind
 * them. Always decorative — mount inside a `relative overflow-hidden` box.
 */
export function Beams({
  tone = THEME.violet,
  className,
  intensity = 1,
}: {
  tone?: Accent;
  className?: string;
  intensity?: number;
}) {
  const shafts = [
    { left: "8%", width: 120, rotate: -14, a: 0.4, delay: "0s" },
    { left: "34%", width: 64, rotate: -8, a: 0.28, delay: "-3.5s" },
    { left: "62%", width: 170, rotate: 11, a: 0.34, delay: "-7s" },
    { left: "88%", width: 80, rotate: 16, a: 0.22, delay: "-5s" },
  ];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {shafts.map((s) => (
        <div
          key={s.left}
          className="beam anim-sway"
          style={{
            top: "-30%",
            left: s.left,
            width: s.width,
            height: "150%",
            background: `linear-gradient(180deg, ${hexA(tone.light, s.a * intensity)} 0%, ${hexA(tone.base, s.a * 0.5 * intensity)} 38%, transparent 78%)`,
            transform: `rotate(${s.rotate}deg)`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

/** Soft stage light behind hero art. */
export function Bloom({
  tone = THEME.violet,
  size = 300,
  className,
  opacity = 0.5,
}: {
  tone?: Accent;
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      className={cn("bloom anim-breathe", className)}
      style={{ width: size, height: size, background: hexA(tone.light, opacity) }}
      aria-hidden
    />
  );
}

/** Slow dust motes drifting up through a scene — the "alive" layer. */
export function Motes({ count = 14, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const size = 2 + ((i * 7) % 4);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${(i * 37) % 100}%`,
              top: `${20 + ((i * 23) % 70)}%`,
              opacity: 0,
              boxShadow: "0 0 6px rgba(203,182,255,.9)",
              animation: `d2-mote ${9 + (i % 5) * 2.5}s linear ${-(i * 1.7)}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
