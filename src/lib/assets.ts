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
