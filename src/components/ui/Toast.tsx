"use client";

import { useEffect } from "react";
import { THEME, hexA } from "@/lib/theme";
import { CaptureMark } from "./Motif";
import { CheckIcon } from "./icons";

/**
 * Confirmation notice with a little personality: the capture mark closes
 * around a tick, on a glass lozenge that floats in from the top edge.
 */
export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [message, onDone]);

  const t = THEME.green;

  return (
    <div className="anim-rise pointer-events-none absolute top-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className="glass flex items-center gap-3 rounded-full py-2.5 pr-6 pl-3"
        style={{ borderColor: hexA(t.base, 0.4), boxShadow: `0 20px 50px -20px rgba(0,0,0,.9), 0 0 40px -14px ${hexA(t.base, 0.8)}` }}
      >
        <span className="relative grid size-9 place-items-center">
          <span className="absolute inset-0 rounded-full blur-[10px]" style={{ background: hexA(t.base, 0.6) }} />
          <CaptureMark size={34} tone={t} className="absolute" strokeWidth={1.5} />
          <CheckIcon className="relative size-3.5" />
        </span>
        <span className="font-display text-[15px] text-white">
          Claimed <span className="font-display-bold">{message}</span>
        </span>
      </div>
    </div>
  );
}
