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
  const rankGroups = useMemo(() => groupBy(RANKS, (r) => r.group), []);
  const packGroups = useMemo(() => groupBy(PACKS, (p) => p.group), []);

  return (
    <Panel
      title="Store"
      kicker="Season shop"
      theme="violet"
      onClose={onClose}
      width="min(1280px, 94vw)"
      height="min(760px, 100%)"
      headerSlot={<TabBar tabs={TABS} value={tab} onChange={setTab} theme="violet" />}
    >
      <div key={tab} className="scroll-y anim-rise min-h-0 flex-1 px-6 pt-5 pb-7">
        {tab === "bundles" && (
          <>
            <SectionHeader label="Featured bundles" theme="magenta" caption="Limited stock, best value per Point" />
            {Object.entries(bundleGroups).map(([group, rows]) => (
              <section key={group}>
                {rows.map((b) => (
                  <BundleCard key={b.id} bundle={b} onBuy={(x) => onPurchase(x.name)} />
                ))}
              </section>
            ))}
          </>
        )}

        {tab === "ranks" && (
          <>
            <SectionHeader label="Ranks & membership" theme="violet" caption="Permanent perks, one purchase" />
            {Object.entries(rankGroups).map(([group, rows]) => (
              <section key={group} className="mb-6">
                <GroupBar label={group} count={rows.length} />
                <div className="grid grid-cols-2 items-stretch gap-4">
                  {/* rows arrive highest tier first, so the tier number counts down */}
                  {rows.map((r, i) => (
                    <RankCard key={r.id} rank={r} tier={rows.length - i} onBuy={(x) => onPurchase(x.name)} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}

        {tab === "items" && (
          <>
            <SectionHeader label="Items" theme="cyan" caption="Keys, enchants, skins and boosters" />
            {Object.entries(packGroups).map(([group, rows]) => (
              <section key={group} className="mb-6">
                <GroupBar label={group} count={rows.length} />
                <div className="grid grid-cols-4 gap-4">
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
