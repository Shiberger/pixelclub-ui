import { useMediaQuery } from "usehooks-ts";

/**
 * Phones get the collapsed/compact HUD — but the width-only check misses the
 * case that actually matters most here: Minecraft on a phone is played
 * rotated to landscape, which is *wide* (640–930px, same as a small tablet)
 * but very *short* (320–430px tall). A six-row party list or five full menu
 * cards sized for a desktop window don't fit that height at all — they run
 * straight under the hotbar. So this also collapses on short height,
 * independent of width, which is what actually distinguishes "phone turned
 * sideways" from "tablet/desktop" once width alone can't.
 */
export function useIsCompactHud() {
  // `initializeWithValue: false` keeps the first client render at the same
  // `false` the server rendered (it has no `window` to check) — otherwise
  // this reads the real match synchronously during hydration, the two
  // renders disagree, and React logs a hydration-mismatch error. The
  // one-frame flash to the real value right after mount is the trade-off.
  return useMediaQuery("(max-width: 639px), (max-height: 500px)", { initializeWithValue: false });
}
