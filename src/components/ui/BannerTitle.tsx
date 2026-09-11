import { THEME, type ThemeName, hexA } from "@/lib/theme";

/**
 * The ornate title plate that overlaps the top-left corner of every panel:
 * a nautical filigree flourish plus an angled gradient tab, as in the ref.
 */
export function BannerTitle({ title, theme = "magenta" }: { title: string; theme?: ThemeName }) {
  const t = THEME[theme];

  return (
    <div className="pointer-events-none relative z-30 -mt-6 -ml-8 flex h-[68px] w-[400px] shrink-0 items-center">
      <svg
        viewBox="0 0 330 130"
        className="absolute top-0 left-0 h-[112px] w-[286px] overflow-visible drop-shadow-[0_3px_7px_rgba(0,0,0,.85)]"
        aria-hidden
      >
        <g fill="none" stroke={t.base} strokeLinecap="round" strokeWidth="8">
          {/* central rosette */}
          <circle cx="74" cy="66" r="27" strokeWidth="10" />
          <circle cx="74" cy="66" r="13" stroke={t.light} strokeWidth="6" />
          {/* four corner curls spiralling off the rosette */}
          <path d="M74 39c-4-19 6-33 22-31s20 17 8 24" />
          <path d="M74 93c4 19-6 33-22 31s-20-17-8-24" />
          <path d="M47 66c-19 4-33-6-31-22s17-20 24-8" />
          <path d="M101 66c19-4 33 6 31 22s-17 20-24 8" />
          {/* trailing flourishes along the tab edges */}
          <path d="M118 34c22-12 44-14 62-4" strokeWidth="7" />
          <path d="M180 30c14-8 28-4 30 8s-11 17-18 9" strokeWidth="6" />
          <path d="M118 96c26 10 56 10 84 1" strokeWidth="7" />
          <path d="M202 97c15 5 28 0 26-11s-12-13-18-6" strokeWidth="6" />
          <path d="M236 90c13 3 24-3 22-12" strokeWidth="5" opacity=".75" />
        </g>
        <circle cx="74" cy="66" r="5.5" fill={t.light} />
      </svg>

      {/* angled title tab */}
      <div
        className="relative ml-[104px] flex h-[44px] flex-1 items-center"
        style={{
          clipPath: "polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%)",
          background: `linear-gradient(100deg, ${hexA(t.dark, 0.98)} 0%, ${hexA(t.base, 0.96)} 38%, ${hexA(t.base, 0.25)} 84%, transparent 100%)`,
          borderRadius: "24px 4px 4px 24px",
        }}
      >
        <span
          className="font-display txt-stroke pl-7 text-[26px] leading-none text-white"
          style={{ textShadow: `0 0 18px ${hexA(t.light, 0.85)}, 0 2px 0 rgba(0,0,0,.75)` }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
