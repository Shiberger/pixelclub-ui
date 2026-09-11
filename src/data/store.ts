/**
 * PixelClub store data — mirrors the live catalogue at pixelclub.asia/shop
 * (backend/api/products.php, server "Cobblemon", type "point"; 1 Point = 1 THB).
 * Descriptions were blank on the live API, so blurbs below are inferred from
 * product names; everything else (names, prices, discounts, images) is real.
 */
import { legendaryGif } from "@/lib/assets";
import type { Bundle, Currency, Pack, Rank } from "./types";

export const CURRENCIES: Currency[] = [{ id: "point", name: "Point", icon: "🪙", color: "#fbbf24" }];

export const WALLET: Record<string, number> = {
  point: 4_820,
};

/** Real PixelClub SKU icons, reused below to compose illustrative bundle contents. */
const ASSET = {
  battlepassPremium: "https://www.pixelclub.asia/assets/uploads/images/img_69f62fe1240d2.webp",
  starterBundle: "https://www.pixelclub.asia/assets/uploads/images/img_69e2b30d32e32.webp",
  levelUp: "https://i.ibb.co/FL2bJQqv/Keep-level-xp-glitter-remove-202606121841-2.jpg",
  adventureKey: "https://i.ibb.co/8Lj9fDK0/exec-ce2d8455-833e-468e-9c1f-ec7b1d9daad5.png",
  pajamasKey: "https://i.ibb.co/4nyvfmMz/exec-d650dc4e-5e47-4f0b-84b6-fb4c8e50dc73.png",
  commonKey: "https://www.pixelclub.asia/assets/uploads/images/img_6a07158472767.webp",
  catchBooster: "https://www.pixelclub.asia/assets/uploads/images/img_69f5f5ade1655.webp",
  expBooster: "https://www.pixelclub.asia/assets/uploads/images/img_69f5f5ace3d46.webp",
  shinyBooster: "https://www.pixelclub.asia/assets/uploads/images/img_69f5f5aadb5a1.webp",
  eliteEnchant: "https://i.ibb.co/xK0DNpNV/Chat-GPT-Image-10-2569-21-10-47.png",
};

/**
 * The live API doesn't expose a per-bundle "what's inside" breakdown, so the
 * `contents` below are an illustrative mix built only from real PixelClub SKU
 * icons (+ a generic Point chip) — good enough for a prototype, not a claim
 * about the server's actual drop table.
 */
export const BUNDLES: Bundle[] = [
  {
    id: "bundle-20",
    group: "Bundle",
    name: "Battlepass [ Premium ]",
    tagline: "Unlock the premium Battle Pass track and claim every exclusive tier reward.",
    theme: "magenta",
    contents: [
      { id: "bundle-20-pass", name: "Battlepass [ Premium ]", qty: 1, rarity: "mythic", sprite: ASSET.battlepassPremium },
      { id: "bundle-20-point", name: "Point", qty: 500, rarity: "epic", emoji: "🪙" },
      { id: "bundle-20-exp", name: "x2 Exp Booster", qty: 1, rarity: "rare", sprite: ASSET.expBooster },
      { id: "bundle-20-key", name: "Adventure Key", qty: 2, rarity: "uncommon", sprite: ASSET.adventureKey },
      { id: "bundle-20-paj", name: "Pajamas Key", qty: 2, rarity: "uncommon", sprite: ASSET.pajamasKey },
      { id: "bundle-20-common", name: "Common Key", qty: 3, rarity: "common", sprite: ASSET.commonKey },
      { id: "bundle-20-catch", name: "x2 Catch Booster", qty: 1, rarity: "rare", sprite: ASSET.catchBooster },
      { id: "bundle-20-shiny", name: "x2 Shiny Booster", qty: 1, rarity: "rare", sprite: ASSET.shinyBooster },
      { id: "bundle-20-ench", name: "[ELITE] Custom Enchant", qty: 1, rarity: "epic", sprite: ASSET.eliteEnchant },
    ],
    price: { kind: "point", amount: 150 },
    showcase: { src: legendaryGif.giratina, kind: "pokemon" }, badge: "HOT",
  },
  {
    id: "bundle-11",
    group: "Bundle",
    name: "Starter Bundle #2",
    tagline: "A bigger head start for new trainers — more balls, more crates, more points.",
    theme: "green",
    contents: [
      { id: "bundle-11-point", name: "Point", qty: 300, rarity: "epic", emoji: "🪙" },
      { id: "bundle-11-adv", name: "Adventure Key", qty: 3, rarity: "uncommon", sprite: ASSET.adventureKey },
      { id: "bundle-11-paj", name: "Pajamas Key", qty: 2, rarity: "uncommon", sprite: ASSET.pajamasKey },
      { id: "bundle-11-common", name: "Common key", qty: 1, rarity: "common", sprite: ASSET.commonKey },
      { id: "bundle-11-catch", name: "x2 Catch Booster", qty: 1, rarity: "rare", sprite: ASSET.catchBooster },
    ],
    price: { kind: "point", amount: 140 },
    showcase: { src: legendaryGif.koraidon, kind: "pokemon" },
  },
  {
    id: "bundle-10",
    group: "Bundle",
    name: "Starter Bundle #1",
    tagline: "Everything a new trainer needs to get going on PixelClub.",
    theme: "green",
    contents: [
      { id: "bundle-10-point", name: "Point", qty: 150, rarity: "epic", emoji: "🪙" },
      { id: "bundle-10-adv", name: "Adventure Key", qty: 2, rarity: "uncommon", sprite: ASSET.adventureKey },
      { id: "bundle-10-paj", name: "Pajamas Key", qty: 1, rarity: "uncommon", sprite: ASSET.pajamasKey },
      { id: "bundle-10-common", name: "Common key", qty: 1, rarity: "common", sprite: ASSET.commonKey },
    ],
    price: { kind: "point", amount: 75 },
    showcase: { src: legendaryGif.gimmighoul, kind: "pokemon" }, badge: "FIRST TIME ONLY",
  },
  {
    id: "bundle-29",
    group: "Bundle",
    name: "+1 Level Battle Pass",
    tagline: "Instantly gain +1 Battle Pass level.",
    theme: "cyan",
    contents: [
      { id: "bundle-29-level", name: "+1 Level Battle Pass", qty: 1, rarity: "epic", sprite: ASSET.levelUp },
      { id: "bundle-29-point", name: "Point", qty: 50, rarity: "rare", emoji: "🪙" },
    ],
    price: { kind: "point", amount: 10 },
    showcase: { src: legendaryGif.latios, kind: "pokemon" },
  },
];

export const RANKS: Rank[] = [
  {
    id: "rank-6",
    group: "Ranks",
    name: "Stellar",
    blurb: "The highest PixelClub rank tier — maximum store perks & prestige.",
    perks: ["Exclusive [Stellar] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 2000 },
    theme: "gold",
    icon: "⭐", highlight: "HIGHLY Recommended!",
  },
  {
    id: "rank-5",
    group: "Ranks",
    name: "Astral",
    blurb: "Premium rank perks for the dedicated trainer.",
    perks: ["Exclusive [Astral] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 1500 },
    theme: "magenta",
    icon: "🌌",
  },
  {
    id: "rank-4",
    group: "Ranks",
    name: "Cosmic",
    blurb: "Solid mid-tier perks for regular players.",
    perks: ["Exclusive [Cosmic] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 1000 },
    theme: "cyan",
    icon: "🌠",
  },
  {
    id: "rank-3",
    group: "Ranks",
    name: "Eclipse",
    blurb: "Step up from Nova with extra in-game benefits.",
    perks: ["Exclusive [Eclipse] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 600 },
    theme: "green",
    icon: "🌑",
  },
  {
    id: "rank-2",
    group: "Ranks",
    name: "Nova",
    blurb: "An accessible first rank with handy perks.",
    perks: ["Exclusive [Nova] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 300 },
    theme: "magenta",
    icon: "💥",
  },
  {
    id: "rank-1",
    group: "Ranks",
    name: "Spark",
    blurb: "The entry-level PixelClub rank.",
    perks: ["Exclusive [Spark] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 150 },
    theme: "green",
    icon: "⚡",
  },
  {
    id: "rank-27",
    group: "Pixel Prime",
    name: "30 Day Membership",
    blurb: "30 days of PIXEL PRIME membership perks.",
    perks: ["Exclusive [PIXEL] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 300 },
    theme: "cyan",
    icon: "💎",
  },
  {
    id: "rank-26",
    group: "Pixel Prime",
    name: "14 Day Membership",
    blurb: "14 days of PIXEL PRIME membership perks.",
    perks: ["Exclusive [PIXEL] chat tag", "In-game store & gameplay perks", "See /shop in-game for the full perk list"],
    price: { kind: "point", amount: 180 },
    theme: "gold",
    icon: "💎",
  },
];

/* ---------- Item packs ---------- */
export const PACKS: Pack[] = [
  /* ---------- Keys ---------- */
  { id: "key-72", group: "Keys", name: "Pajamas Key x6", blurb: "Opens a Pajamas Crate for a chance at cozy cosmetics.", qty: 6, price: { kind: "point", amount: 249, was: 300 }, sprite: "https://i.ibb.co/4nyvfmMz/exec-d650dc4e-5e47-4f0b-84b6-fb4c8e50dc73.png", theme: "magenta", valueTag: "Higher Value!" },
  { id: "key-71", group: "Keys", name: "Pajamas Key x3", blurb: "Opens a Pajamas Crate for a chance at cozy cosmetics.", qty: 3, price: { kind: "point", amount: 140, was: 150 }, sprite: "https://i.ibb.co/4nyvfmMz/exec-d650dc4e-5e47-4f0b-84b6-fb4c8e50dc73.png", theme: "magenta" },
  { id: "key-70", group: "Keys", name: "Adventure Key x6", blurb: "Opens an Adventure Crate loaded with exploration gear.", qty: 6, price: { kind: "point", amount: 249, was: 300 }, sprite: "https://i.ibb.co/8Lj9fDK0/exec-ce2d8455-833e-468e-9c1f-ec7b1d9daad5.png", theme: "green", valueTag: "Higher Value!" },
  { id: "key-69", group: "Keys", name: "Adventure Key x3", blurb: "Opens an Adventure Crate loaded with exploration gear.", qty: 3, price: { kind: "point", amount: 140, was: 150 }, sprite: "https://i.ibb.co/8Lj9fDK0/exec-ce2d8455-833e-468e-9c1f-ec7b1d9daad5.png", theme: "green" },
  { id: "key-68", group: "Keys", name: "Summer Pirate Key x6", blurb: "Opens a Summer Pirate Crate — seasonal loot, arrr!", qty: 6, price: { kind: "point", amount: 249, was: 300 }, sprite: "https://i.ibb.co/HLTQKv4y/exec-435933b0-f74b-487d-93a1-bfee6722f070.png", theme: "cyan", valueTag: "Higher Value!" },
  { id: "key-67", group: "Keys", name: "Summer Pirate Key x3", blurb: "Opens a Summer Pirate Crate — seasonal loot, arrr!", qty: 3, price: { kind: "point", amount: 140, was: 150 }, sprite: "https://i.ibb.co/HLTQKv4y/exec-435933b0-f74b-487d-93a1-bfee6722f070.png", theme: "cyan" },
  { id: "key-66", group: "Keys", name: "Summer Pirate Key", blurb: "Opens a Summer Pirate Crate — seasonal loot, arrr!", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://i.ibb.co/HLTQKv4y/exec-435933b0-f74b-487d-93a1-bfee6722f070.png", theme: "cyan" },
  { id: "key-65", group: "Keys", name: "Pajamas Key", blurb: "Opens a Pajamas Crate for a chance at cozy cosmetics.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://i.ibb.co/4nyvfmMz/exec-d650dc4e-5e47-4f0b-84b6-fb4c8e50dc73.png", theme: "magenta" },
  { id: "key-64", group: "Keys", name: "Adventure Key", blurb: "Opens an Adventure Crate loaded with exploration gear.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://i.ibb.co/8Lj9fDK0/exec-ce2d8455-833e-468e-9c1f-ec7b1d9daad5.png", theme: "green" },
  { id: "key-63", group: "Keys", name: "Summer Bundle Key", blurb: "Opens the limited Summer Bundle Crate.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://i.ibb.co/rft4QP5x/summer-bundle-key.png", theme: "gold", valueTag: "Higher Value!" },
  { id: "key-62", group: "Keys", name: "Galaxy Key", blurb: "Opens a Galaxy Crate for cosmic-themed rewards.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://i.ibb.co/KxqfzSXt/galaxy-key.png", theme: "magenta", valueTag: "Higher Value!" },
  { id: "key-61", group: "Keys", name: "Summer Skin Key", blurb: "Opens the Summer Skin Crate — cosmetic skins only.", qty: 1, price: { kind: "point", amount: 35 }, sprite: "https://i.ibb.co/1J691rXm/Summer-Skin-Key-no-bottom-right-star.png", theme: "cyan" },
  { id: "key-40", group: "Keys", name: "Angel of Delusion Key", blurb: "Opens the Angel of Delusion Crate.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://i.ibb.co/YT0ZzDDw/Angel.png", theme: "cyan", valueTag: "Higher Value!" },
  { id: "key-39", group: "Keys", name: "Ice Cream Key", blurb: "Opens the Ice Cream Crate — sweet seasonal drops.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://i.ibb.co/x87wV8t6/202607050943.jpg", theme: "magenta", valueTag: "Higher Value!" },
  { id: "key-38", group: "Keys", name: "Ballon Key", blurb: "Opens the Balloon Crate.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://i.ibb.co/Xxh35DDW/smooth-202607050933.jpg", theme: "cyan", valueTag: "Higher Value!" },
  { id: "key-37", group: "Keys", name: "Shadow Soldier Key", blurb: "Opens the Shadow Soldier Crate.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://i.ibb.co/B5xngkYz/Design-key-frame-solo-leveling-202606251731.jpg", theme: "gold", valueTag: "Higher Value!" },
  { id: "key-28", group: "Keys", name: "Wonderland Key", blurb: "Opens the Wonderland Crate.", qty: 1, price: { kind: "point", amount: 40, was: 50 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_6a22a81219ec0.webp", theme: "green", valueTag: "Higher Value!" },
  { id: "key-25", group: "Keys", name: "Relic Key", blurb: "Opens a Relic Crate for a shot at ancient rewards.", qty: 1, price: { kind: "point", amount: 40, was: 80 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_6a071586ad350.webp", theme: "gold", valueTag: "BEST Value!" },
  { id: "key-24", group: "Keys", name: "Exalt Key", blurb: "Opens an Exalt Crate.", qty: 1, price: { kind: "point", amount: 20, was: 40 }, sprite: "https://i.ibb.co/7xCqhg1H/3275806a-b2a9-4cda-94fe-ee56f0b44fa1.png", theme: "magenta", valueTag: "BEST Value!" },
  { id: "key-23", group: "Keys", name: "Epic key", blurb: "Opens an Epic Crate.", qty: 1, price: { kind: "point", amount: 15, was: 30 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_6a07158513324.webp", theme: "magenta", valueTag: "BEST Value!" },
  { id: "key-22", group: "Keys", name: "Rare key", blurb: "Opens a Rare Crate.", qty: 1, price: { kind: "point", amount: 10, was: 20 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_6a0715863c73b.webp", theme: "cyan", valueTag: "BEST Value!" },
  { id: "key-21", group: "Keys", name: "Common key", blurb: "Opens a Common Crate.", qty: 1, price: { kind: "point", amount: 5, was: 10 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_6a07158472767.webp", theme: "green", valueTag: "BEST Value!" },
  { id: "key-14", group: "Keys", name: "Summer Box #1", blurb: "A curated Summer loot box.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_69f36b5f441f7.webp", theme: "green" },
  { id: "key-12", group: "Keys", name: "Pokemon Hats Box #1", blurb: "Grants a random Pokémon hat cosmetic.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_69f36b6004c70.webp", theme: "gold" },

  /* ---------- Enchants ---------- */
  { id: "ench-46", group: "Enchants", name: "[HEROIC] RANDOM CUSTOM ENCHANT", blurb: "Applies a random heroic-tier custom enchantment to your gear.", qty: 1, price: { kind: "point", amount: 80 }, sprite: "https://i.ibb.co/b5t10jDZ/Chat-GPT-Image-10-2569-21-18-28.png", theme: "gold" },
  { id: "ench-45", group: "Enchants", name: "[LEGENDARY] RANDOM CUSTOM ENCHANT", blurb: "Applies a random legendary-tier custom enchantment to your gear.", qty: 1, price: { kind: "point", amount: 40 }, sprite: "https://i.ibb.co/j9Fq0JZg/Chat-GPT-Image-10-2569-21-18-19.png", theme: "magenta" },
  { id: "ench-44", group: "Enchants", name: "[ULTIMATE] RANDOM CUSTOM ENCHANT", blurb: "Applies a random ultimate-tier custom enchantment to your gear.", qty: 1, price: { kind: "point", amount: 30 }, sprite: "https://i.ibb.co/HLnRDz63/Chat-GPT-Image-10-2569-21-18-10.png", theme: "cyan" },
  { id: "ench-43", group: "Enchants", name: "[ELITE] RANDOM CUSTOM ENCHANT", blurb: "Applies a random elite-tier custom enchantment to your gear.", qty: 1, price: { kind: "point", amount: 20 }, sprite: "https://i.ibb.co/xK0DNpNV/Chat-GPT-Image-10-2569-21-10-47.png", theme: "green" },
  { id: "ench-42", group: "Enchants", name: "[UNIQUE] RANDOM CUSTOM ENCHANT", blurb: "Applies a random unique-tier custom enchantment to your gear.", qty: 1, price: { kind: "point", amount: 10 }, sprite: "https://i.ibb.co/7tnkdx7k/Chat-GPT-Image-10-2569-21-10-52.png", theme: "magenta" },
  { id: "ench-41", group: "Enchants", name: "[SIMPLE] RANDOM CUSTOM ENCHANT", blurb: "Applies a random simple-tier custom enchantment to your gear.", qty: 1, price: { kind: "point", amount: 5 }, sprite: "https://i.ibb.co/nsmB84dw/Chat-GPT-Image-10-2569-21-10-40.png", theme: "cyan" },

  /* ---------- Skins ---------- */
  { id: "skin-36", group: "Skins", name: "[ BUNDLE ] Shadow Soldier ( 5 skins )", blurb: "Unlocks the \"[ BUNDLE ] Shadow Soldier ( 5 skins )\" cosmetic skin.", qty: 1, price: { kind: "point", amount: 1200, was: 1500 }, sprite: "https://i.ibb.co/8nXhkCvJ/All-Show.png", theme: "gold", valueTag: "Higher Value!" },
  { id: "skin-33", group: "Skins", name: "Igris Awakening ( Kingambit )", blurb: "Unlocks the \"Igris Awakening ( Kingambit )\" cosmetic skin.", qty: 1, price: { kind: "point", amount: 400, was: 500 }, sprite: "https://i.ibb.co/hFpNTbxC/Kingambit-Igris.png", theme: "magenta", valueTag: "Higher Value!" },
  { id: "skin-35", group: "Skins", name: "Tank Awakening ( Ursaing )", blurb: "Unlocks the \"Tank Awakening ( Ursaing )\" cosmetic skin.", qty: 1, price: { kind: "point", amount: 300, was: 400 }, sprite: "https://i.ibb.co/zVJ6rw5h/Ursaring-Tank.png", theme: "cyan", valueTag: "Higher Value!" },
  { id: "skin-34", group: "Skins", name: "Tusk Awakening ( Snorlax )", blurb: "Unlocks the \"Tusk Awakening ( Snorlax )\" cosmetic skin.", qty: 1, price: { kind: "point", amount: 300, was: 400 }, sprite: "https://i.ibb.co/gb0gbDXC/Snorlax-Tusk.png", theme: "green", valueTag: "Higher Value!" },
  { id: "skin-31", group: "Skins", name: "Iron Guardian ( Golurk )", blurb: "Unlocks the \"Iron Guardian ( Golurk )\" cosmetic skin.", qty: 1, price: { kind: "point", amount: 300, was: 400 }, sprite: "https://i.ibb.co/VR0TPZf/Golurk-Iron.png", theme: "magenta", valueTag: "Higher Value!" },
  { id: "skin-32", group: "Skins", name: "Beru Awakening ( Scyther )", blurb: "Unlocks the \"Beru Awakening ( Scyther )\" cosmetic skin.", qty: 1, price: { kind: "point", amount: 249, was: 300 }, sprite: "https://i.ibb.co/TQkQkKg/Scyther-Beru.png", theme: "cyan", valueTag: "Higher Value!" },

  /* ---------- Boosters ---------- */
  { id: "boost-19", group: "Boosters", name: "x2 Catch booster - 1hr", blurb: "Doubles your catch rate for 1 hour.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_69f5f5ade1655.webp", theme: "green" },
  { id: "boost-18", group: "Boosters", name: "x2 Exp booster - 1hr", blurb: "Doubles your EXP gain for 1 hour.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_69f5f5ace3d46.webp", theme: "cyan" },
  { id: "boost-16", group: "Boosters", name: "x2 Shinny booster - 1hr", blurb: "Doubles your Shiny encounter rate for 1 hour.", qty: 1, price: { kind: "point", amount: 50 }, sprite: "https://www.pixelclub.asia/assets/uploads/images/img_69f5f5aadb5a1.webp", theme: "gold" },

  /* ---------- Claim Protection ---------- */
  { id: "protect-9", group: "Claim Protection", name: "โพรเทค 256x256", blurb: "Expands your land claim protection to 256x256 blocks.", qty: 1, price: { kind: "point", amount: 900 }, sprite: "https://i.ibb.co/SXZcRYKJ/efac61a8-c5e9-4dbc-aa42-e3c666784f38.png", theme: "gold" },
  { id: "protect-8", group: "Claim Protection", name: "โพรเทค 160x160", blurb: "Expands your land claim protection to 160x160 blocks.", qty: 1, price: { kind: "point", amount: 600 }, sprite: "https://i.ibb.co/cSRzhLPt/b1095d09-4b1c-49bc-9291-69b6a98c24fa.png", theme: "magenta" },
  { id: "protect-7", group: "Claim Protection", name: "โพรเทค 112X112", blurb: "Expands your land claim protection to 112X112 blocks.", qty: 1, price: { kind: "point", amount: 300 }, sprite: "https://i.ibb.co/B2Ww3G43/88f6e825-52fc-45d3-aa04-674ee568c5cd.png", theme: "cyan" },
];
