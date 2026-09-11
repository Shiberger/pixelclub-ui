# PixelClub — Cobblemon UX/UI Prototype

Web-based UI prototype for the **PixelClub** Cobblemon (Minecraft) server.
The goal is a front-end that reads exactly like an in-game HUD, so the layouts
can be dropped into the game client with confidence.

Reference art lives in `../ref-uxui/` (Roblox-style anime game HUD).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + a CSS-variable design system in `src/app/globals.css` |
| Fonts | Baloo 2 (panel display) + Fredoka (panel UI) + Pixelify Sans (game HUD), via `next/font` |
| Pokémon art | PokeAPI sprite CDN (3D HOME renders, official artwork, pixel item icons) |

No backend. Every screen is driven by typed static data under `src/data/`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

The app renders at a fixed game-viewport aspect; 1600×900 or larger is ideal.

## Phases

| Phase | Scope | Status |
|---|---|---|
| **1** | Design system, game shell (rails + HUD), **Store**, **Battlepass** | ✅ Done |
| **2** | Pokédex Rewards (quest progress), Pokédex | 🔜 Stubbed |
| **3** | Catch alert (Pokémon detail), PixelClub Wiki | 🔜 Stubbed |

## Architecture

```
src/
  app/
    globals.css        design tokens, bevels, strokes, animations
    layout.tsx         fonts + metadata
    page.tsx           renders <GameShell/>
  components/
    shell/             Backdrop, PartyWidget, Hotbar, NavButtons, GameShell
    ui/                Panel, BannerTitle, TabBar, SectionHeader, ItemChip, Buttons, Toast
    store/             StorePanel, BundleCard, RankCard, PackCard
    battlepass/        BattlepassPanel, RewardCell
  data/
    types.ts           domain model (Bundle, Rank, Pack, BattlepassSeason, …)
    store.ts           store catalogue + wallet
    battlepass.ts      season definition + generated reward track
  lib/
    assets.ts          PokeAPI CDN url helpers
    theme.ts           accent + rarity ramps, card skin factory
    worldgen.ts        voxel heightmap + perspective rasteriser for the backdrop
    noise.ts           seeded PRNG + value noise
    cn.ts
```

### Two visual layers

The prototype deliberately runs **two** design languages, because that is what
the real thing looks like:

| Layer | Styling | Files |
|---|---|---|
| **Game layer** (behind) | Vanilla Minecraft / Cobblemon — pixel fonts, hard 3px borders, no rounding | `shell/` |
| **Server UI layer** (panels) | The `ref-uxui` look — gradient borders, bevels, stroked display type | `ui/`, `store/`, `battlepass/` |

The game layer reproduces what a player already sees in Cobblemon: the party
overlay down the left edge (level, held item, HP bar, name, gender, Poké Ball),
the nine-slot hotbar with stack counts and a selection cursor, and the
crosshair. The one addition is the right-hand button column — the real game
opens these screens from commands or a menu item, so the prototype borrows
Minecraft's own GUI button styling rather than inventing new chrome.

### Design-system notes

- **`.bevel` / `.bevel-sm`** produce the chunky 3D edge used by every button and
  rail tile (inset highlight + inset shadow + hard drop + soft glow).
- **`.txt-stroke*`** gives the outlined game text via `-webkit-text-stroke` with
  `paint-order: stroke fill`.
- **`cardSkin(theme)`** in `lib/theme.ts` is the single source for card
  gradients, borders and glows — pass an accent or a rarity ramp.
- Panels are all `<Panel>`: gradient border, ornate `<BannerTitle>` overlapping
  the top-left corner, round red close button, ESC to dismiss.

### Swapping the backdrop

`lib/worldgen.ts` generates a seeded badlands heightmap and rasterises it in
perspective into a 480×270 canvas, which is then upscaled with
`image-rendering: pixelated` — that is what gives it Minecraft's chunky texels
rather than smooth vector edges.

**Use a real capture instead:** drop a screenshot at `public/backdrop.png` and
it is layered on top automatically — no code change needed. That is the
recommended path for review builds.

## Keyboard

| Key | Action |
|---|---|
| `S` | Store |
| `B` | Battlepass |
| `Q` | Pokédex Rewards |
| `P` | Pokédex |
| `K` | Wiki |
| `1`–`9` | Select a hotbar slot |
| `Esc` | Close the open panel |
