import type { ItemStack } from "@/data/types";
import { RARITY, hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

export function formatQty(n: number) {
  return n.toLocaleString("en-US");
}

interface Props {
  stack: ItemStack;
  size?: number;
  showLabel?: boolean;
  className?: string;
  dimmed?: boolean;
}

/**
 * A collectible tile. Rarity is expressed as light — a corner wash, a hairline
 * and a single dot — rather than a coloured frame, so a tray of mixed
 * rarities stays calm and the artwork stays the loudest thing in the tile.
 */
export function ItemChip({ stack, size = 64, showLabel = true, className, dimmed }: Props) {
  const r = RARITY[stack.rarity];
  const label = showLabel && size >= 80;

  return (
    <div
      className={cn("group relative shrink-0 overflow-hidden rounded-[16px] border", className)}
      style={{
        width: size,
        height: size,
        background: `
          radial-gradient(120% 110% at 12% 0%, ${hexA(r.base, 0.34)} 0%, transparent 64%),
          linear-gradient(170deg, rgba(255,255,255,.07), rgba(255,255,255,.02) 55%, rgba(0,0,0,.22))
        `,
        borderColor: hexA(r.base, 0.32),
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.14), 0 10px 22px -14px rgba(0,0,0,.85), 0 0 20px -12px ${hexA(r.base, 0.9)}`,
        filter: dimmed ? "grayscale(.8) brightness(.6)" : undefined,
      }}
      title={`${formatQty(stack.qty)}× ${stack.name}`}
    >
      {stack.sprite ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stack.sprite}
          alt={stack.name}
          className="absolute inset-0 m-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,.6)] transition-transform duration-300 group-hover:scale-[1.09]"
          style={{ width: label ? "52%" : "68%", height: label ? "52%" : "68%", marginTop: label ? "-6%" : undefined }}
          loading="lazy"
        />
      ) : (
        <span
          className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:scale-[1.09]"
          style={{ fontSize: size * 0.4, marginTop: label ? -size * 0.07 : 0 }}
        >
          {stack.emoji}
        </span>
      )}

      <span
        className="num absolute top-1.5 left-1.5 rounded-full px-1.5 py-[1px] text-[11px] leading-[15px] font-bold text-white"
        style={{ background: "rgba(6,4,14,.6)", backdropFilter: "blur(4px)" }}
      >
        {formatQty(stack.qty)}
      </span>

      <span
        className="absolute top-2 right-2 size-[6px] rounded-full"
        style={{ background: r.base, boxShadow: `0 0 7px ${hexA(r.base, 0.95)}` }}
        aria-hidden
      />

      {label && (
        <span
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(6,4,14,.94)] via-[rgba(6,4,14,.78)] to-transparent px-1.5 pt-6 pb-1.5 text-center text-[11px] leading-[1.25] font-semibold text-white/90"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {stack.name}
        </span>
      )}
    </div>
  );
}
