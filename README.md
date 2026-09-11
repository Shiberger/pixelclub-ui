# PixelClub — Cobblemon UX/UI Prototype · Design 2.0

Web-based UI prototype for the **PixelClub** Cobblemon (Minecraft) server.
The goal is a front-end that reads exactly like an in-game HUD, so the layouts
can be dropped into the game client with confidence.

> **Branch `design-2.0`.** A second, independent visual direction — the
> chunky arcade look of `main` (see `../ref-uxui/`) is replaced by a
> modern-premium one. Same screens, same data, same interactions; only the
> design language changes, so the two branches can be compared side by side.

## Design 2.0 — "Prism Capture"

| Decision | What it means |
|---|---|
| **Palette** | The logo's violet: deep violet → bright violet → white, with a lavender-pink highlight. Black only as ink. |
| **Light** | Cinematic and volumetric — light shafts, bloom behind hero art, drifting motes, a violet grade over the world itself. |
| **Motif** | The Poké Ball abstracted (ring + equator + centre pip) and the logo cube as an isometric prism. They carry indicators, nodes, progress dials, badges and watermarks. |
| **Surfaces** | One translucent pane per window. No plates, frames or nested boxes; the world stays visible through the UI. |
| **Menu** | Illustrated cards, not text rows — each entry is a lit scene you want to click into. It folds to an icon rail while a panel is open. |
| **Type** | Outfit (display) + Plus Jakarta Sans (UI). No outlines, no strokes. |
| **Explicitly out** | Pixel art, pixel fonts and pixel icons in the UI; gold frames and heavy ornament; cream paper and antique fantasy; royal-gem luxury; stacked cluttered panels; windows that cover the game for no reason. |

The Minecraft layer underneath (hotbar, crosshair, voxel world) keeps its own
look, because it belongs to the game client rather than to PixelClub — it is
only quieted while a panel is open.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + a CSS-variable design system in `src/app/globals.css` |
| Fonts | Outfit (display) + Plus Jakarta Sans (UI), via `next/font` |
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
    globals.css        design tokens, glass surfaces, light rig, motion
    layout.tsx         fonts + metadata
    page.tsx           renders <GameShell/>
  components/
    shell/             Backdrop, PartyWidget, Hotbar, MenuDock, GameShell
    ui/                Panel, Motif, TabBar, SectionHeader, ItemChip, Buttons, Toast, icons
    store/             StorePanel, BundleCard, RankCard, PackCard
    battlepass/        BattlepassPanel, RewardCell
  data/
    types.ts           domain model (Bundle, Rank, Pack, BattlepassSeason, …)
    store.ts           store catalogue + wallet
    battlepass.ts      season definition + generated reward track
  lib/
    assets.ts          PokeAPI CDN url helpers
    theme.ts           violet accent + rarity ramps, surface factories
    worldgen.ts        voxel heightmap + perspective rasteriser for the backdrop
    noise.ts           seeded PRNG + value noise
    cn.ts
```

### Two visual layers

The prototype deliberately runs **two** design languages, because that is what
the real thing looks like:

| Layer | Styling | Files |
|---|---|---|
| **Game layer** (behind) | The Minecraft client — voxel world, nine-slot hotbar, crosshair. Untouched shape, dimmed while a panel is open | `shell/Backdrop`, `shell/Hotbar` |
| **Server UI layer** | Design 2.0 — translucent violet glass, volumetric light, capture/prism motif | `shell/MenuDock`, `shell/PartyWidget`, `ui/`, `store/`, `battlepass/` |

The party HUD moved up into the Design 2.0 layer: the capture ring doubles as
each Pokémon's HP dial, which halves the footprint of the old six stacked
frames. Both side rails collapse — the party to dials, the menu to icons — the
moment a panel opens, so panels never have to cover navigation.

### Design-system notes

- **`.glass` / `.glass-hud` / `.glass-tile`** are the three surface levels:
  panel, HUD-over-world (darker, because the sky behind can be near-white), and
  card-inside-panel.
- **`Motif.tsx`** holds the visual language: `CaptureMark` (the abstracted Poké
  Ball), `CaptureRing` (the same mark as a progress dial), `PrismMark`, plus the
  light rig — `Beams`, `Bloom`, `Motes`.
- **`surface(accent)` / `surfaceQuiet` / `fill` / `tint`** in `lib/theme.ts` are
  the single source for card and button skins. Accents only colour light — a
  wash, a hairline, a glow — never a frame, which is what keeps a shelf of
  mixed-theme cards reading as one material.
- Panels are all `<Panel>`: one pane, a quiet header with the capture mark, a
  circular close button, ESC to dismiss, and side padding that leaves the
  collapsed rails clickable.

### Swapping the backdrop

`lib/worldgen.ts` generates a seeded badlands heightmap and rasterises it in
perspective into a 480×270 canvas, which is then upscaled with
`image-rendering: pixelated` — that is what gives it Minecraft's chunky texels
rather than smooth vector edges. Design 2.0 then grades it violet and rakes
light shafts across it, so the world and the UI read as the same place.

**Use a real capture instead:** drop a screenshot at `public/backdrop.png` and
it is layered on top automatically — no code change needed. That is the
recommended path for review builds.

## Keyboard

| Key | Action |
|---|---|
| `S` | Store |
| `B` | Battlepass |
| `Q` | Rewards |
| `P` | Pokédex |
| `K` | Wiki |
| `1`–`9` | Select a hotbar slot |
| `Esc` | Close the open panel |
