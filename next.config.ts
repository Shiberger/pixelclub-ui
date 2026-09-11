import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prototype ships no local binaries — all Pokémon art is pulled from the
  // PokeAPI sprite CDN at runtime via plain <img> tags.
  agentRules: false,
};

export default nextConfig;
