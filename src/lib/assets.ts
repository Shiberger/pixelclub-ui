/**
 * Remote asset helpers.
 *
 * All Pokémon art is pulled straight from the PokeAPI sprite CDN so the
 * prototype looks like the real thing without shipping any binaries.
 *  - `home`            : 3D Pokémon HOME renders (used for hero / showcase art)
 *  - `officialArtwork` : 2D Sugimori-style artwork
 *  - `animated`        : Gen-V animated pixel sprites (used in small chips)
 *  - `item`            : pixel item icons
 */
const CDN = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites";

export const pkmn = {
  /** 3D model render — the "nice" big art */
  home: (id: number) => `${CDN}/pokemon/other/home/${id}.png`,
  officialArtwork: (id: number) => `${CDN}/pokemon/other/official-artwork/${id}.png`,
  showdown: (id: number) => `${CDN}/pokemon/other/showdown/${id}.gif`,
  animated: (id: number) =>
    `${CDN}/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
  sprite: (id: number) => `${CDN}/pokemon/${id}.png`,
  shinyHome: (id: number) => `${CDN}/pokemon/other/home/shiny/${id}.png`,
};

/** Pixel item icon, e.g. item("master-ball") */
export const item = (name: string) => `${CDN}/items/${name}.png`;

/**
 * Animated 3D Cobblemon-model GIFs (by Paige Galloway), served from
 * /public/legendary-pokemon-gif — used for hero/showcase art instead of the
 * flat PokeAPI renders above.
 */
export const legendaryGif = {
  giratina: "/legendary-pokemon-gif/paige-galloway-giratina-idle2.gif",
  koraidon: "/legendary-pokemon-gif/paige-galloway-koraidon1.gif",
  gimmighoul: "/legendary-pokemon-gif/paige-galloway-gimmighoul2.gif",
  latios: "/legendary-pokemon-gif/paige-galloway-latios2.gif",
  miraidon: "/legendary-pokemon-gif/paige-galloway-miraidon.gif",
  landorus: "/legendary-pokemon-gif/paige-galloway-1landorus.gif",
  thundurus: "/legendary-pokemon-gif/paige-galloway-1thundurus.gif",
  raikou: "/legendary-pokemon-gif/paige-galloway-raikou.gif",
  regice: "/legendary-pokemon-gif/paige-galloway-regice.gif",
  regirock: "/legendary-pokemon-gif/paige-galloway-regirock.gif",
  registeel: "/legendary-pokemon-gif/paige-galloway-registeel-v3.gif",
  salamence: "/legendary-pokemon-gif/paige-galloway-salamence2.gif",
  volcanion: "/legendary-pokemon-gif/paige-galloway-volcanion.gif",
} as const;
