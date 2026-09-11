import { item, pkmn } from "@/lib/assets";
import type { Bundle, Currency, ItemStack, Pack, Rank } from "./types";

export const CURRENCIES: Currency[] = [
  { id: "gem", name: "Club Gem", icon: "💎", color: "#38bdf8" },
  { id: "pokecoin", name: "PokéCoin", icon: "🪙", color: "#fbbf24" },
  { id: "clubpoint", name: "Club Point", icon: "🎫", color: "#c084fc" },
];

export const WALLET: Record<string, number> = {
  gem: 12_480,
  pokecoin: 86_250,
  clubpoint: 1_950,
};

/* ---------- reusable item stacks ---------- */
const I = {
  pokeball: (q: number): ItemStack => ({ id: "pokeball", name: "Poké Ball", qty: q, rarity: "common", sprite: item("poke-ball") }),
  greatball: (q: number): ItemStack => ({ id: "greatball", name: "Great Ball", qty: q, rarity: "uncommon", sprite: item("great-ball") }),
  ultraball: (q: number): ItemStack => ({ id: "ultraball", name: "Ultra Ball", qty: q, rarity: "rare", sprite: item("ultra-ball") }),
  masterball: (q: number): ItemStack => ({ id: "masterball", name: "Master Ball", qty: q, rarity: "mythic", sprite: item("master-ball") }),
  beastball: (q: number): ItemStack => ({ id: "beastball", name: "Beast Ball", qty: q, rarity: "legendary", sprite: item("beast-ball") }),
  gem: (q: number): ItemStack => ({ id: "gem", name: "Club Gem", qty: q, rarity: "rare", sprite: item("comet-shard") }),
  coin: (q: number): ItemStack => ({ id: "coin", name: "PokéCoin", qty: q, rarity: "uncommon", sprite: item("big-nugget") }),
  candy: (q: number): ItemStack => ({ id: "candy", name: "Rare Candy", qty: q, rarity: "epic", sprite: item("rare-candy") }),
  bottlecap: (q: number): ItemStack => ({ id: "bottlecap", name: "Bottle Cap", qty: q, rarity: "epic", sprite: item("bottle-cap") }),
  goldcap: (q: number): ItemStack => ({ id: "goldcap", name: "Gold Cap", qty: q, rarity: "legendary", sprite: item("gold-bottle-cap") }),
  capsule: (q: number): ItemStack => ({ id: "capsule", name: "Ability Capsule", qty: q, rarity: "legendary", sprite: item("ability-capsule") }),
  luckyegg: (q: number): ItemStack => ({ id: "luckyegg", name: "Lucky Egg", qty: q, rarity: "epic", sprite: item("lucky-egg") }),
  expshare: (q: number): ItemStack => ({ id: "expshare", name: "EXP Share", qty: q, rarity: "rare", sprite: item("exp-share") }),
  shinycharm: (q: number): ItemStack => ({ id: "shinycharm", name: "Shiny Charm", qty: q, rarity: "mythic", sprite: item("shiny-charm") }),
  amulet: (q: number): ItemStack => ({ id: "amulet", name: "Amulet Coin", qty: q, rarity: "epic", sprite: item("amulet-coin") }),
  destiny: (q: number): ItemStack => ({ id: "destiny", name: "Destiny Knot", qty: q, rarity: "rare", sprite: item("destiny-knot") }),
  firestone: (q: number): ItemStack => ({ id: "firestone", name: "Fire Stone", qty: q, rarity: "rare", sprite: item("fire-stone") }),
  waterstone: (q: number): ItemStack => ({ id: "waterstone", name: "Water Stone", qty: q, rarity: "rare", sprite: item("water-stone") }),
  moonstone: (q: number): ItemStack => ({ id: "moonstone", name: "Moon Stone", qty: q, rarity: "epic", sprite: item("moon-stone") }),
  maxrevive: (q: number): ItemStack => ({ id: "maxrevive", name: "Max Revive", qty: q, rarity: "rare", sprite: item("max-revive") }),
  fullrestore: (q: number): ItemStack => ({ id: "fullrestore", name: "Full Restore", qty: q, rarity: "uncommon", sprite: item("full-restore") }),
  heartscale: (q: number): ItemStack => ({ id: "heartscale", name: "Heart Scale", qty: q, rarity: "uncommon", sprite: item("heart-scale") }),
  // Cosmetic / server-exclusive entries use Pokémon renders as their icon
  mount: (name: string, id: number): ItemStack => ({ id: `mount-${id}`, name, qty: 1, rarity: "mythic", sprite: pkmn.home(id) }),
};

/* ---------- Bundles ---------- */
export const BUNDLES: Bundle[] = [
  {
    id: "starter",
    group: "Featured Bundles",
    name: "Trainer Starter Pack",
    tagline: "Everything a new trainer needs to hit the ground running!",
    theme: "green",
    contents: [I.pokeball(250), I.greatball(100), I.gem(1500), I.coin(25000), I.candy(20), I.expshare(1)],
    price: { kind: "baht", amount: 79 },
    purchasesLeft: 1,
    showcase: { src: pkmn.home(25), kind: "pokemon" },
    badge: "FIRST TIME ONLY",
  },
  {
    id: "eclipse",
    group: "Featured Bundles",
    name: "Lunar Eclipse Bundle",
    tagline: "Darkness descends — an exclusive mount and hoard awaits!",
    theme: "magenta",
    contents: [I.mount("Lunala Mount", 792), I.masterball(3), I.gem(5000), I.candy(50), I.goldcap(25), I.capsule(5), I.moonstone(25)],
    price: { kind: "baht", amount: 999 },
    purchasesLeft: 2,
    showcase: { src: pkmn.home(792), kind: "pokemon" },
  },
  {
    id: "inferno",
    group: "Featured Bundles",
    name: "Inferno Bundle",
    tagline: "Scorch the leaderboard with legendary firepower.",
    theme: "orange",
    contents: [I.mount("Charizard Mount", 6), I.ultraball(200), I.gem(7500), I.firestone(35), I.bottlecap(35), I.luckyegg(10)],
    price: { kind: "baht", amount: 2999 },
    purchasesLeft: 2,
    showcase: { src: pkmn.home(6), kind: "pokemon" },
  },
  {
    id: "tidal",
    group: "Season Bundles",
    name: "Tidal Surge Bundle",
    tagline: "Ride the wave with this season's ocean-themed haul!",
    theme: "cyan",
    contents: [I.mount("Lapras Mount", 131), I.waterstone(25), I.gem(2500), I.destiny(35), I.maxrevive(50), I.heartscale(25)],
    price: { kind: "baht", amount: 449 },
    purchasesLeft: 2,
    showcase: { src: pkmn.home(131), kind: "pokemon" },
  },
  {
    id: "shiny",
    group: "Season Bundles",
    name: "Shiny Hunter's Cache",
    tagline: "Stack the odds — built for the dedicated shiny hunter.",
    theme: "gold",
    contents: [I.shinycharm(1), I.beastball(25), I.masterball(1), I.gem(3000), I.amulet(5), I.candy(75)],
    price: { kind: "baht", amount: 1299 },
    purchasesLeft: 1,
    showcase: { src: pkmn.shinyHome(149), kind: "pokemon" },
    badge: "HOT",
  },
];

/* ---------- Ranks (gamepass equivalent) ---------- */
export const RANKS: Rank[] = [
  {
    id: "vip",
    name: "VIP",
    blurb: "Permanently unlock exclusive PixelClub benefits!",
    perks: ["−20% Store prices", "+25% Offline PokéCoins", "Exclusive [VIP] chat tag", "2 extra party slots"],
    price: { kind: "baht", amount: 289 },
    theme: "gold",
    icon: "⭐",
    highlight: "HIGHLY Recommended!",
  },
  {
    id: "shiny-hunter",
    name: "Shiny Hunter",
    blurb: "Permanently increases your odds of finding Shiny Pokémon!",
    perks: ["Encounter Shiny rate +200%", "Egg Shiny rate +200%", "Exclusive [Shiny Hunter] tag"],
    price: { kind: "baht", amount: 719 },
    theme: "cyan",
    icon: "✨",
  },
  {
    id: "collector",
    name: "Collector",
    blurb: "Show off up to 6 Pokémon followers at once!",
    perks: ["Display 6 followers", "Unlock the Showcase Yard", "Exclusive [Collector] tag"],
    price: { kind: "baht", amount: 289 },
    theme: "magenta",
    icon: "🎒",
  },
  {
    id: "ranger",
    name: "Ranger",
    blurb: "Fast travel anywhere and auto-battle while offline.",
    perks: ["Unlimited fast travel", "Offline auto-battle 8h", "Exclusive [Ranger] tag"],
    price: { kind: "baht", amount: 499 },
    theme: "green",
    icon: "🧭",
  },
];

/* ---------- Item packs ---------- */
export const PACKS: Pack[] = [
  { id: "gem-1", group: "Club Gem Packs", name: "1,000 Gems", blurb: "Instantly receive +1,000 Club Gems!", qty: 1000, price: { kind: "baht", amount: 199 }, sprite: item("comet-shard"), theme: "cyan" },
  { id: "gem-2", group: "Club Gem Packs", name: "2,500 Gems", blurb: "Instantly receive +2,500 Club Gems!", qty: 2500, price: { kind: "baht", amount: 449 }, sprite: item("comet-shard"), theme: "cyan" },
  { id: "gem-3", group: "Club Gem Packs", name: "5,000 Gems", blurb: "Instantly receive +5,000 Club Gems!", qty: 5000, price: { kind: "baht", amount: 799 }, sprite: item("comet-shard"), theme: "cyan", valueTag: "Higher Value!" },
  { id: "gem-4", group: "Club Gem Packs", name: "10,000 Gems", blurb: "Instantly receive +10,000 Club Gems!", qty: 10000, price: { kind: "baht", amount: 1499 }, sprite: item("comet-shard"), theme: "cyan", valueTag: "Higher Value!" },
  { id: "gem-5", group: "Club Gem Packs", name: "20,000 Gems", blurb: "Instantly receive +20,000 Club Gems!", qty: 20000, price: { kind: "baht", amount: 2799 }, sprite: item("comet-shard"), theme: "cyan", valueTag: "BEST Value!" },
  { id: "gem-6", group: "Club Gem Packs", name: "30,000 Gems", blurb: "Instantly receive +30,000 Club Gems!", qty: 30000, price: { kind: "baht", amount: 3999 }, sprite: item("comet-shard"), theme: "cyan", valueTag: "BEST Value!" },

  { id: "ball-1", group: "Poké Ball Packs", name: "50 Ultra Balls", blurb: "A solid restock for any hunting trip.", qty: 50, price: { kind: "gem", amount: 900 }, sprite: item("ultra-ball"), theme: "gold" },
  { id: "ball-2", group: "Poké Ball Packs", name: "10 Dusk Balls", blurb: "Best used at night or inside caves.", qty: 10, price: { kind: "gem", amount: 450 }, sprite: item("dusk-ball"), theme: "gold" },
  { id: "ball-3", group: "Poké Ball Packs", name: "1 Master Ball", blurb: "Never fails. Use it wisely, trainer.", qty: 1, price: { kind: "gem", amount: 7500 }, sprite: item("master-ball"), theme: "magenta", valueTag: "BEST Value!" },

  { id: "candy-1", group: "Training Items", name: "10 Rare Candy", blurb: "Instantly level a Pokémon by one.", qty: 10, price: { kind: "gem", amount: 600 }, sprite: item("rare-candy"), theme: "magenta" },
  { id: "candy-2", group: "Training Items", name: "25 Bottle Caps", blurb: "Hyper-train one stat to maximum IV.", qty: 25, price: { kind: "gem", amount: 1800 }, sprite: item("bottle-cap"), theme: "magenta", valueTag: "Higher Value!" },
  { id: "candy-3", group: "Training Items", name: "5 Ability Capsules", blurb: "Swap a Pokémon's regular ability.", qty: 5, price: { kind: "gem", amount: 2400 }, sprite: item("ability-capsule"), theme: "green", valueTag: "BEST Value!" },
];
