import { hexA } from "@/lib/theme";

/* ============================================================================
   Design 2.0 iconography: soft line icons on a 24-grid, 1.7px rounded stroke,
   `currentColor` throughout. Nothing outlined in black, nothing pixelated.
   ============================================================================ */

function Line({
  children,
  className = "size-5",
  strokeWidth = 1.7,
}: {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

export function GiftIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 10.5h16V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M3 7.5h18v3H3z" />
      <path d="M12 7.5V21" />
      <path d="M12 7.5C11.2 5 9.6 3.4 8.1 3.7 6.9 4 6.5 5.6 7.6 6.6c.7.6 2.2.9 4.4.9z" />
      <path d="M12 7.5c.8-2.5 2.4-4.1 3.9-3.8 1.2.3 1.6 1.9.5 2.9-.7.6-2.2.9-4.4.9z" />
    </Line>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Line className={className} strokeWidth={2}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </Line>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3.1" />
    </Line>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </Line>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Line className={className} strokeWidth={2.2}>
      <path d="M4.5 12.8l4.6 4.4L19.5 7" />
    </Line>
  );
}

export function ChevronIcon({ className, dir = "right" }: IconProps & { dir?: "left" | "right" }) {
  return (
    <Line className={className} strokeWidth={2}>
      <path d={dir === "right" ? "M9.5 5.5l7 6.5-7 6.5" : "M14.5 5.5l-7 6.5 7 6.5"} />
    </Line>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <Line className={className} strokeWidth={2}>
      <path d="M12 5.5v13M5.5 12h13" />
    </Line>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 3l1.9 5.4L19.5 10l-5.6 1.6L12 17l-1.9-5.4L4.5 10l5.6-1.6z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </Line>
  );
}

/* ---------- navigation glyphs ---------- */

export function StoreIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4.6 8.5h14.8l-1.1 11a1.6 1.6 0 0 1-1.6 1.4H7.3a1.6 1.6 0 0 1-1.6-1.4z" />
      <path d="M9 8.5V6.6a3 3 0 0 1 6 0v1.9" />
      <path d="M9.4 12.6h5.2" />
    </Line>
  );
}

export function PassIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3.5 8.2a1.7 1.7 0 0 1 1.7-1.7h13.6a1.7 1.7 0 0 1 1.7 1.7v2a2.2 2.2 0 0 0 0 4.4v2a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7v-2a2.2 2.2 0 0 0 0-4.4z" />
      <path d="M13.4 9.2v6" strokeDasharray="1.8 2.4" />
    </Line>
  );
}

export function QuestIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6 3.8h9.4l3.6 3.6v12.8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6V5.4A1.6 1.6 0 0 1 6 3.8z" />
      <path d="M15 3.9v3.6h3.7" />
      <path d="M8 12.6l1.7 1.7 3.4-3.4" />
      <path d="M8 17.6h7" />
    </Line>
  );
}

export function DexIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3.6" y="3.8" width="16.8" height="16.4" rx="2.4" />
      <path d="M8.4 3.8v16.4" />
      <circle cx="15.2" cy="9.4" r="2.6" />
      <path d="M12.6 15.4h5.2M12.6 17.8h3" />
    </Line>
  );
}

export function WikiIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M14.8 9.2l-1.6 5.6-5.6 1.6 1.6-5.6z" />
    </Line>
  );
}

/* ---------- currency ---------- */

/**
 * The Point token: a prism pressed into a violet coin. Replaces the emoji coin
 * so prices sit on the same design language as everything else.
 */
export function PointToken({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
      <defs>
        <linearGradient id="d2-point" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#ffd6f5" />
          <stop offset="42%" stopColor="#ef6adc" />
          <stop offset="100%" stopColor="#6d28e0" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.4" fill="url(#d2-point)" />
      <circle cx="12" cy="12" r="10.4" fill="none" stroke={hexA("#ffffff", 0.55)} strokeWidth="1.1" />
      <g fill="none" stroke={hexA("#3b0a52", 0.75)} strokeWidth="1.4" strokeLinejoin="round">
        <path d="M12 6.4l4.6 2.7v5.4L12 17.2l-4.6-2.7V9.1z" />
        <path d="M12 12v5.2M12 12l4.6-2.9M12 12L7.4 9.1" />
      </g>
    </svg>
  );
}
