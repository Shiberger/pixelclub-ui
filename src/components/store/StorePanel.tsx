"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import { TabBar, type TabItem } from "@/components/ui/TabBar";
import { SectionHeader, GroupBar } from "@/components/ui/SectionHeader";
import { BundleCard } from "./BundleCard";
import { RankCard } from "./RankCard";
import { PackCard } from "./PackCard";
import { BUNDLES, PACKS, RANKS } from "@/data/store";
import type { StoreTab } from "@/data/types";

const TABS: readonly TabItem<StoreTab>[] = [
  { id: "bundles", label: "Bundles" },
  { id: "ranks", label: "Ranks" },
  { id: "items", label: "Items" },
];

function groupBy<T, K extends string>(rows: T[], key: (r: T) => K) {
  return rows.reduce<Record<string, T[]>>((acc, r) => {
    (acc[key(r)] ??= []).push(r);
    return acc;
  }, {});
}

export function StorePanel({ onClose, onPurchase }: { onClose: () => void; onPurchase: (label: string) => void }) {
  const [tab, setTab] = useState<StoreTab>("bundles");

  const bundleGroups = useMemo(() => groupBy(BUNDLES, (b) => b.group), []);
  const packGroups = useMemo(() => groupBy(PACKS, (p) => p.group), []);

  return (
    <Panel
      title="Store"
      theme="magenta"
      onClose={onClose}
      headerSlot={<TabBar tabs={TABS} value={tab} onChange={setTab} theme="magenta" />}
    >
      <div key={tab} className="scroll-y anim-rise min-h-0 flex-1 px-3.5 pt-2 pb-4">
        {tab === "bundles" && (
          <>
            <SectionHeader label="Bundles" theme="magenta" />
            {Object.entries(bundleGroups).map(([group, rows]) => (
              <section key={group}>
                <GroupBar label={group} />
                {rows.map((b) => (
                  <BundleCard key={b.id} bundle={b} onBuy={(x) => onPurchase(x.name)} />
                ))}
              </section>
            ))}
          </>
        )}

        {tab === "ranks" && (
          <>
            <SectionHeader label="Ranks" theme="gold" />
            <div className="grid grid-cols-2 items-stretch gap-3">
              {RANKS.map((r) => (
                <RankCard key={r.id} rank={r} onBuy={(x) => onPurchase(x.name)} />
              ))}
            </div>
          </>
        )}

        {tab === "items" && (
          <>
            <SectionHeader label="Items" theme="cyan" />
            {Object.entries(packGroups).map(([group, rows]) => (
              <section key={group} className="mb-4">
                <GroupBar label={group} />
                <div className="grid grid-cols-3 gap-3">
                  {rows.map((p) => (
                    <PackCard key={p.id} pack={p} onBuy={(x) => onPurchase(x.name)} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </Panel>
  );
}
