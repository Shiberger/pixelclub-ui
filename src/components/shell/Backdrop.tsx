/**
 * Stand-in for the live game view behind the UI.
 *
 * Procedural voxel landscape drawn as SVG, then blurred — exactly how the
 * reference screenshots read once a panel is open. Drop a real capture at
 * `public/backdrop.png` and it is layered on top automatically.
 */
export function Backdrop({ dimmed }: { dimmed: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        style={{ filter: `blur(${dimmed ? 8 : 3}px) saturate(1.2) brightness(${dimmed ? 0.82 : 1})`, transform: "scale(1.06)", transition: "filter .35s ease" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1b3e" />
            <stop offset="38%" stopColor="#2a5a9e" />
            <stop offset="68%" stopColor="#79b4d8" />
            <stop offset="100%" stopColor="#f0c98a" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fff6d5" stopOpacity=".95" />
            <stop offset="55%" stopColor="#ffca6b" stopOpacity=".45" />
            <stop offset="100%" stopColor="#ff9a3c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d8fc0" /><stop offset="100%" stopColor="#3f5a86" />
          </linearGradient>
          <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f8a4a" /><stop offset="100%" stopColor="#23512f" />
          </linearGradient>
          <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6fbf52" /><stop offset="55%" stopColor="#3f7d34" /><stop offset="100%" stopColor="#2b4a24" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4bb6d6" stopOpacity=".92" /><stop offset="100%" stopColor="#12507a" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />
        <circle cx="1180" cy="300" r="300" fill="url(#sunGlow)" />
        <rect x="1140" y="262" width="76" height="76" fill="#fff4cf" opacity=".9" />

        {/* blocky clouds */}
        <g fill="#ffffff" opacity=".55">
          {[[150, 150], [420, 110], [820, 175], [1330, 120], [640, 90]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="130" height="30" />
              <rect x={x + 30} y={y - 26} width="80" height="28" />
              <rect x={x + 84} y={y + 8} width="72" height="24" />
            </g>
          ))}
        </g>

        {/* far mountains */}
        <path fill="url(#far)" d="M0 470h90v-60h70v-52h80v-46h76v46h84v58h96v-78h88v78h110v-58h92v58h120v-46h96v46h96v62h104v60H0z" />

        {/* mid hills + blocky trees */}
        <path fill="url(#mid)" d="M0 560h120v-46h110v-38h130v38h96v-58h140v58h124v-40h132v40h150v-52h160v52h148v46H0z" />
        <g>
          {[[190, 512], [430, 500], [700, 486], [980, 498], [1260, 470], [1452, 486]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x + 16} y={y + 34} width="16" height="34" fill="#5a3c1e" />
              <rect x={x - 8} y={y} width="64" height="40" fill="#2f6b34" />
              <rect x={x + 4} y={y - 22} width="40" height="26" fill="#3a8340" />
            </g>
          ))}
        </g>

        {/* near terrain */}
        <path fill="url(#near)" d="M0 700h170v-58h150v-44h180v44h190v-70h210v70h210v-52h230v52h260v58H0z" />
        <g opacity=".35" fill="#000">
          {Array.from({ length: 46 }, (_, i) => (
            <rect key={i} x={i * 36} y={704 + (i % 3) * 4} width="34" height="6" />
          ))}
        </g>

        {/* water */}
        <rect y="742" width="1600" height="158" fill="url(#water)" />
        <g fill="#bff0ff" opacity=".4">
          {Array.from({ length: 24 }, (_, i) => (
            <rect key={i} x={(i * 71 + (i % 4) * 17) % 1600} y={764 + (i % 5) * 26} width={40 + (i % 3) * 22} height="5" rx="2" />
          ))}
        </g>
      </svg>

      {/* optional real screenshot override */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "image-set(url('/backdrop.png') 1x)",
          filter: `blur(${dimmed ? 8 : 3}px) brightness(${dimmed ? 0.82 : 1})`,
          transform: "scale(1.05)",
        }}
        aria-hidden
      />

      {/* vignette + tint */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(2,2,10,.6)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,14,.4),transparent_26%,transparent_66%,rgba(4,4,14,.55))]" />
    </div>
  );
}
