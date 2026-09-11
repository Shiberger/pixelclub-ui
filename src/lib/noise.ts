/**
 * Tiny seeded PRNG + value noise.
 *
 * The world backdrop is generated once at module scope, so the output must be
 * identical on the server and the client — hence a seeded generator rather
 * than Math.random().
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth 1-D value noise sampled across `length` steps. */
export function noise1D(seed: number, length: number, wavelength: number) {
  const rnd = mulberry32(seed);
  const anchors = Math.ceil(length / wavelength) + 2;
  const pts = Array.from({ length: anchors }, () => rnd());

  return Array.from({ length }, (_, x) => {
    const i = x / wavelength;
    const i0 = Math.floor(i);
    const t = i - i0;
    // smoothstep between anchors
    const s = t * t * (3 - 2 * t);
    return pts[i0] * (1 - s) + pts[i0 + 1] * s;
  });
}
