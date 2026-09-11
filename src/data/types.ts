/* ============================================================
   PixelClub — Domain model
   Front-end prototype: all data is static & typed.
   ============================================================ */

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";

export type CurrencyId = "pokecoin" | "gem" | "clubpoint" | "eventtoken";

export interface Currency {
  id: CurrencyId;
  name: string;
  /** emoji/icon rendered in the HUD pills */
  icon: string;
  color: string;
}

/** A single reward/inventory entry shown as a square chip. */
export interface ItemStack {
  id: string;
  name: string;
  qty: number;
  rarity: Rarity;
  /** absolute sprite url (PokeAPI CDN) or emoji fallback */
  sprite?: string;
  emoji?: string;
}

/* ---------------- Store ---------------- */

export type StoreTab = "bundles" | "ranks" | "items";

export type PriceKind = "gem" | "pokecoin" | "baht" | "clubpoint";

export interface Price {
  kind: PriceKind;
  amount: number;
  /** original amount, when the item is discounted */
  was?: number;
}

export interface Bundle {
  id: string;
  group: string;
  name: string;
  tagline: string;
  /** drives the card gradient + border color */
  theme: "green" | "magenta" | "orange" | "cyan" | "gold" | "red";
  contents: ItemStack[];
  price: Price;
  purchasesLeft?: number;
  /** big showcase artwork on the right edge of the card */
  showcase?: { src: string; kind: "pokemon" | "item" };
  badge?: string;
}

export interface RankPerk {
  text: string;
}

export interface Rank {
  id: string;
  name: string;
  blurb: string;
  perks: string[];
  price: Price;
  theme: "gold" | "magenta" | "cyan" | "green";
  icon: string;
  highlight?: string;
}

export interface Pack {
  id: string;
  group: string;
  name: string;
  blurb: string;
  qty: number;
  price: Price;
  sprite?: string;
  emoji?: string;
  valueTag?: "Higher Value!" | "BEST Value!";
  theme: "cyan" | "gold" | "magenta" | "green";
}

/* ---------------- Battlepass ---------------- */

export type RewardState = "locked" | "claimable" | "claimed";

export interface BattlepassReward {
  level: number;
  track: "free" | "premium";
  item: ItemStack;
  state: RewardState;
}

export interface BattlepassSeason {
  id: string;
  name: string;
  number: number;
  maxLevel: number;
  level: number;
  exp: number;
  expPerLevel: number;
  endsIn: string;
  premiumOwned: boolean;
  premiumPrice: Price;
  /** hero artwork for the premium panel */
  heroSprite: string;
  heroName: string;
  rewards: BattlepassReward[];
}
