import type { ItemStack } from "@/data/types";
import { RARITY, hexA } from "@/lib/theme";
import { cn } from "@/lib/cn";

export function formatQty(n: number) {
  return n.toLocaleString("en-US");
}

/** Repeating swirl watermark seen inside every reward tile in the ref. */
const SWIRL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42' viewBox='0 0 42 42'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='.16' stroke-width='2'%3E%3Cpath d='M21 8a13 13 0 1 0 13 13 9 9 0 1 1-9-9'/%3E%3C/g%3E%3C/svg%3E\")";

interface Props {
  stack: ItemStack;
  size?: number;
  showLabel?: boolean;
  className?: string;
  dimmed?: boolean;
}

export function ItemChip({ stack, size = 60, showLabel = true, className, dimmed }: Props) {
  const r = RARITY[stack.rarity];

  return (
    <div
      className={cn("group relative shrink-0 overflow-hidden rounded-[8px] border-2", className)}
      style={{
        width: size,
        height: size,
        borderColor: hexA(r.base, 0.95),
        background: `${SWIRL}, linear-gradient(160deg, ${hexA(r.base, 0.55)}, ${hexA(r.dark, 0.9)} 70%, rgba(6,6,10,.95))`,
        boxShadow: `inset 0 1px 0 ${hexA(r.light, 0.5)}, inset 0 -2px 0 rgba(0,0,0,.5), 0 0 10px ${hexA(r.base, 0.4)}`,
        filter: dimmed ? "grayscale(.75) brightness(.55)" : undefined,
      }}
      title={`${formatQty(stack.qty)}× ${stack.name}`}
    >
      {stack.sprite ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stack.sprite}
          alt={stack.name}
          className="pixelated absolute inset-0 m-auto size-[74%] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,.7)] transition-transform duration-200 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-[26px]">{stack.emoji}</span>
      )}

      {/* count badge */}
      <span className="absolute top-[4px] left-[4px] rounded-[5px] bg-black/80 px-[6px] py-[2px] text-[13px] leading-[16px] font-bold text-white tabular-nums">
        {formatQty(stack.qty)}x
      </span>

      {/* label */}
      {showLabel && (
        <span className="txt-stroke-xs absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/88 to-transparent px-1.5 pt-3 pb-[3px] text-center text-[12px] leading-[14px] font-bold text-white">
          {stack.name}
        </span>
      )}
    </div>
  );
}
