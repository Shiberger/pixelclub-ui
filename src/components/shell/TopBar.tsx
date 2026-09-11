export function TopBar() {
  return (
    <div className="pointer-events-auto absolute inset-x-0 top-0 z-20 flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-1.5">
        <div className="grid size-[30px] place-items-center rounded-[8px] border-2 border-black/60 bg-[linear-gradient(180deg,#c026d3,#6d1478)] text-[14px] shadow-[0_0_12px_rgba(192,38,211,.6)]">
          ⬡
        </div>
        {["☰", "💬", "🔔"].map((i) => (
          <button key={i} className="pressable grid size-[30px] place-items-center rounded-[8px] border-2 border-black/60 bg-[linear-gradient(180deg,#2b2b3a,#15151e)] text-[13px]">
            {i}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex h-[28px] items-center gap-1 rounded-[8px] border-2 border-black/60 bg-[linear-gradient(180deg,#2b2b3a,#15151e)] px-2 text-[11px] font-bold text-[var(--text-mid)]">
          <span className="text-[var(--green)]">●</span> 182 online
        </div>
        <div className="flex h-[28px] items-center rounded-[8px] border-2 border-black/60 bg-[linear-gradient(180deg,#2b2b3a,#15151e)] px-2 text-[11px] font-bold text-[var(--text-mid)]">
          UPD 1.4
        </div>
      </div>
    </div>
  );
}
