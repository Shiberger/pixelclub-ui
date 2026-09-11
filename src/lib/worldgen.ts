import { mulberry32 } from "./noise";

/**
 * Voxel world generation + perspective rasteriser for the backdrop.
 *
 * The scene is drawn into a small canvas (≈480×270) and upscaled with
 * `image-rendering: pixelated`, which is what gives it Minecraft's chunky
 * texel look instead of smooth vector edges.
 */

export interface SceneOpts {
  width: number;
  height: number;
}

/* ---------------- heightmap ---------------- */

const GRID_W = 200;
const GRID_D = 90;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** Bilinear-smoothed value noise from a seeded anchor grid. */
function valueNoise2D(seed: number, w: number, d: number, scale: number) {
  const rnd = mulberry32(seed);
  const aw = Math.ceil(w / scale) + 2;
  const ad = Math.ceil(d / scale) + 2;
  const a = Array.from({ length: aw * ad }, () => rnd());

  const out = new Float32Array(w * d);
  for (let z = 0; z < d; z++) {
    for (let x = 0; x < w; x++) {
      const fx = x / scale;
      const fz = z / scale;
      const x0 = Math.floor(fx);
      const z0 = Math.floor(fz);
      const tx = smoothstep(fx - x0);
      const tz = smoothstep(fz - z0);
      const v00 = a[z0 * aw + x0];
      const v10 = a[z0 * aw + x0 + 1];
      const v01 = a[(z0 + 1) * aw + x0];
      const v11 = a[(z0 + 1) * aw + x0 + 1];
      out[z * w + x] = (v00 * (1 - tx) + v10 * tx) * (1 - tz) + (v01 * (1 - tx) + v11 * tx) * tz;
    }
  }
  return out;
}

const broad = valueNoise2D(20260911, GRID_W, GRID_D, 30);
const mid = valueNoise2D(4242, GRID_W, GRID_D, 11);
const fine = valueNoise2D(909, GRID_W, GRID_D, 4);

/** The player stands in a flat pasture; mesas only start rising beyond it. */
const PASTURE_END = 16;
const MESA_FULL = 56;

/** Terrain height in whole blocks at a world cell. Mesas step in 2-block plateaus. */
export function heightAt(wx: number, wz: number) {
  const x = ((wx % GRID_W) + GRID_W) % GRID_W;
  const z = ((wz % GRID_D) + GRID_D) % GRID_D;
  const i = z * GRID_W + x;

  // a wide plateau term plus small ledges — classic badlands profile
  const plateau = Math.pow(broad[i], 3.2) * 17;
  const raw = plateau + Math.pow(mid[i], 2) * 4 + fine[i] * 1.2;

  // fade the relief in over the pasture so nothing blocks the camera
  const t = Math.max(0, Math.min(1, (wz - PASTURE_END) / (MESA_FULL - PASTURE_END)));
  return Math.round((raw * smoothstep(t)) / 2) * 2;
}

/* ---------------- palette ---------------- */

/** Terracotta banding, indexed by block Y. */
const STRATA = [
  "#8f4526", "#a85832", "#c2703c", "#e0c199", "#b8603a",
  "#7d3a20", "#cf8b55", "#e8d3b0", "#a04b2c", "#c07a45",
  "#96522f", "#dcb083", "#b06a40", "#8a4526",
];

const GRASS_TOP = "#8ba84f";
const GRASS_DRY = "#b9ae5c";
const SAND_TOP = "#d9c98d";
const GRASS_SIDE = "#8a6b3f";

function strataAt(y: number) {
  return STRATA[((y % STRATA.length) + STRATA.length) % STRATA.length];
}

function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r = Math.round((((pa >> 16) & 255) * (1 - t) + ((pb >> 16) & 255) * t));
  const g = Math.round((((pa >> 8) & 255) * (1 - t) + ((pb >> 8) & 255) * t));
  const bl = Math.round(((pa & 255) * (1 - t) + (pb & 255) * t));
  return `rgb(${r},${g},${bl})`;
}

/** Stable per-cell hash, so every block keeps its own shade across renders. */
function hash2(x: number, z: number) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(z | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function scale(hex: string, k: number) {
  const p = parseInt(hex.slice(1), 16);
  const c = [(p >> 16) & 255, (p >> 8) & 255, p & 255].map((v) =>
    Math.max(0, Math.min(255, Math.round(v * k))),
  );
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/* ---------------- renderer ---------------- */

const Z_NEAR = 6;
const Z_FAR = 88;
const EYE_Y = 2.4;
const FOG = "#f0cfa2";

export function drawScene(ctx: CanvasRenderingContext2D, { width: W, height: H }: SceneOpts) {
  const f = W * 0.62; // focal length ≈ Minecraft's default FOV
  const cx = W / 2;
  const cy = H * 0.47; // horizon line

  const px = (x: number, z: number) => cx + (f * x) / z;
  const py = (y: number, z: number) => cy - (f * (y - EYE_Y)) / z;

  /* --- sky --- */
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#6f6ba3");
  sky.addColorStop(0.24, "#9d8bae");
  sky.addColorStop(0.46, "#d4a49d");
  sky.addColorStop(0.66, "#f0c193");
  sky.addColorStop(1, "#fbe6b4");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  /* --- low sun --- */
  const sunX = W * 0.21;
  const sunY = cy - H * 0.06;
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.3);
  glow.addColorStop(0, "rgba(255,252,232,.95)");
  glow.addColorStop(0.3, "rgba(255,226,166,.55)");
  glow.addColorStop(1, "rgba(255,200,130,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fffbe8";
  ctx.fillRect(Math.round(sunX - W * 0.026), Math.round(sunY - W * 0.026), Math.round(W * 0.052), Math.round(W * 0.052));

  /* --- blocky clouds --- */
  const crnd = mulberry32(777);
  ctx.fillStyle = "rgba(255,255,255,.4)";
  for (let i = 0; i < 34; i++) {
    const x = crnd() * W;
    const y = crnd() * cy * 0.82;
    const w = (3 + crnd() * 11) * (W / 120);
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(H / 90));
  }

  /* --- voxel terrain, painter's algorithm from the horizon forward --- */
  for (let z = Z_FAR; z >= Z_NEAR; z--) {
    const fog = Math.min(1, Math.pow((z - Z_NEAR) / (Z_FAR - Z_NEAR), 1.25) * 1.05);
    const halfSpan = Math.ceil(((W / 2 + 4) * (z + 1)) / f) + 1;

    for (let x = -halfSpan; x <= halfSpan; x++) {
      const h = heightAt(x, z);
      const n = hash2(x, z);

      // ground level is savanna: grass, dry grass and patches of sand
      let base: string;
      if (h === 0) base = n > 0.955 ? SAND_TOP : n > 0.8 ? GRASS_DRY : GRASS_TOP;
      else if (h >= 12) base = GRASS_DRY;
      else base = scale(strataAt(h - 1), 1.08);

      // --- top face ---
      const topCol = mix(scale(base, 0.95 + n * 0.1), FOG, fog * 0.85);
      const nl = px(x, z);
      const nr = px(x + 1, z);
      const fl = px(x, z + 1);
      const fr = px(x + 1, z + 1);
      const yn = py(h, z);
      const yf = py(h, z + 1);

      ctx.fillStyle = topCol;
      ctx.beginPath();
      ctx.moveTo(nl, yn);
      ctx.lineTo(nr, yn);
      ctx.lineTo(fr, yf);
      ctx.lineTo(fl, yf);
      ctx.closePath();
      ctx.fill();

      // --- front face, only where this column steps above the one in front ---
      const hFront = heightAt(x, z - 1);
      if (h > hFront) {
        const yTop = py(h, z);
        const yBot = py(hFront, z);
        for (let yy = h; yy > hFront; yy--) {
          const band = yy === h && h >= 12 ? GRASS_SIDE : strataAt(yy - 1);
          const a = py(yy, z);
          const b = py(yy - 1, z);
          ctx.fillStyle = mix(scale(band, 0.72 + hash2(x, yy) * 0.1), FOG, fog * 0.85);
          ctx.fillRect(nl, a, nr - nl + 1, Math.max(1, b - a + 1));
        }
        void yTop;
        void yBot;
      }
    }
  }

  /* --- foreground oak fence --- */
  const fz = 10;
  const groundY = 0;
  for (let x = -16; x <= 16; x += 2) {
    const a = px(x, fz);
    const b = px(x + 0.14, fz);
    const top = py(groundY + 1.5, fz);
    const bot = py(groundY, fz);
    ctx.fillStyle = "#8a663a";
    ctx.fillRect(a, top, Math.max(1, b - a), bot - top);
    ctx.fillStyle = "#a07b47";
    ctx.fillRect(a, top, Math.max(1, (b - a) * 0.45), bot - top);
  }
  // two rails spanning the posts
  for (const [ry, col] of [[1.25, "#7a5a33"], [0.7, "#6b4e2c"]] as const) {
    const y = py(groundY + ry, fz);
    ctx.fillStyle = col;
    ctx.fillRect(0, y, W, Math.max(1, Math.round(H / 165)));
  }
}
