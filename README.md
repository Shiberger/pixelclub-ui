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
| Fonts | Baloo 2 (display) + Fredoka (UI), via `next/font` |
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
    shell/             Backdrop, TopBar, LeftRail, RightRail, BottomHud, GameShell
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
    cn.ts
```

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

`components/shell/Backdrop.tsx` draws a procedural blocky landscape as SVG.
Drop a real in-game capture at `public/backdrop.png` and it is layered on top
automatically — no code change needed.

## Keyboard

| Key | Action |
|---|---|
| `P` | Pokédex |
| `Q` | Quests / Pokédex Rewards |
| `B` | Battlepass |
| `Esc` | Close the open panel |
