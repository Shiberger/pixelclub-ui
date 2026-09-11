"use client";

import { useEffect } from "react";

export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [message, onDone]);

  return (
    <div className="anim-pop pointer-events-none absolute top-16 left-1/2 z-50 -translate-x-1/2">
      <div className="bevel flex items-center gap-2.5 rounded-[12px] border-[3px] border-black/70 bg-[linear-gradient(180deg,#a8f03c,#4faf0c_55%,#2f6b00)] px-5 py-2.5">
        <span className="text-[20px]">✅</span>
        <span className="font-display txt-stroke-sm text-[16px] text-white">Claimed {message}!</span>
      </div>
    </div>
  );
}
