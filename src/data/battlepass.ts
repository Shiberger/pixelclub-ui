import { item, pkmn } from "@/lib/assets";
import type { BattlepassReward, BattlepassSeason, ItemStack, Rarity } from "./types";

type Seed = [name: string, qty: number, rarity: Rarity, sprite: string];

const FREE_SEED: Seed[] = [
  ["Poké Ball", 25, "common", item("poke-ball")],
  ["PokéCoin", 2500, "uncommon", item("big-nugget")],
  ["Great Ball", 15, "uncommon", item("great-ball")],
  ["Club Gem", 150, "rare", item("comet-shard")],
  ["Full Restore", 10, "uncommon", item("full-restore")],
  ["Rare Candy", 2, "epic", item("rare-candy")],
  ["Ultra Ball", 10, "rare", item("ultra-ball")],
  ["Heart Scale", 5, "uncommon", item("heart-scale")],
  ["Max Revive", 8, "rare", item("max-revive")],
  ["EXP Share", 1, "rare", item("exp-share")],
];

const PREMIUM_SEED: Seed[] = [
  ["Ultra Ball", 50, "rare", item("ultra-ball")],
  ["Club Gem", 750, "rare", item("comet-shard")],
  ["Rare Candy", 10, "epic", item("rare-candy")],
  ["Bottle Cap", 5, "epic", item("bottle-cap")],
  ["Lucky Egg", 2, "epic", item("lucky-egg")],
  ["Gold Cap", 3, "legendary", item("gold-bottle-cap")],
  ["Ability Capsule", 1, "legendary", item("ability-capsule")],
  ["Beast Ball", 5, "legendary", item("beast-ball")],
  ["Amulet Coin", 1, "epic", item("amulet-coin")],
  ["Master Ball", 1, "mythic", item("master-ball")],
];

/** Milestone levels hand off a Pokémon/cosmetic instead of a plain item. */
const MILESTONES: Record<number, { track: "free" | "premium"; name: string; dex: number }[]> = {
  10: [{ track: "premium", name: "Vulpix (Alola)", dex: 37 }],
  20: [{ track: "free", name: "Eevee", dex: 133 }],
  25: [{ track: "premium", name: "Gengar Mount", dex: 94 }],
  40: [{ track: "premium", name: "Dragonite Mount", dex: 149 }],
  50: [
    { track: "free", name: "Lucario", dex: 448 },
    { track: "premium", name: "Rayquaza Mount", dex: 384 },
  ],
};

const MAX_LEVEL = 50;
const CURRENT_LEVEL = 14;
/** Everything up to here has already been collected by the player. */
const CLAIMED_THROUGH = 8;

function buildRewards(): BattlepassReward[] {
  const out: BattlepassReward[] = [];
  for (let lvl = 1; lvl <= MAX_LEVEL; lvl++) {
    for (const track of ["free", "premium"] as const) {
      const milestone = MILESTONES[lvl]?.find((m) => m.track === track);
      let stack: ItemStack;

      if (milestone) {
        stack = {
          id: `pkmn-${milestone.dex}`,
          name: milestone.name,
          qty: 1,
          rarity: "mythic",
          sprite: pkmn.home(milestone.dex),
        };
      } else {
        const seed = track === "free" ? FREE_SEED : PREMIUM_SEED;
        const [name, baseQty, rarity, sprite] = seed[(lvl - 1) % seed.length];
        const tier = Math.floor((lvl - 1) / seed.length) + 1;
        stack = { id: `${track}-${lvl}`, name, qty: baseQty * tier, rarity, sprite };
      }

      // Earned but uncollected tiers sit between CLAIMED_THROUGH and the
      // current level; anything above the current level stays locked.
      const state =
        lvl > CURRENT_LEVEL ? "locked" : lvl > CLAIMED_THROUGH ? "claimable" : "claimed";

      out.push({ level: lvl, track, item: stack, state });
    }
  }
  return out;
}

export const SEASON: BattlepassSeason = {
  id: "s1-kanto-rising",
  name: "Kanto Rising",
  number: 1,
  maxLevel: MAX_LEVEL,
  level: CURRENT_LEVEL,
  exp: 1_240,
  expPerLevel: 2_000,
  endsIn: "18d 04h",
  premiumOwned: false,
  premiumPrice: { kind: "point", amount: 150 },
  heroSprite: pkmn.officialArtwork(384),
  heroName: "Rayquaza",
  rewards: buildRewards(),
};
