import type { ReactElement } from "react";

/**
 * The site mark: the initial "D" knocked out of a solid, square field of the
 * brand teal. Colours are the exact `--color-primary` / `--color-primary-
 * foreground` tokens from globals.css, resolved to hex because Satori (the
 * renderer behind `next/og`) is happiest with literal colours.
 *
 * The teal field is deliberate rather than decorative: it gives the icon a
 * background of its own so the mark keeps its presence against both light and
 * dark browser chrome, instead of dissolving into a dark tab strip.
 */
const FIELD = "#2fdad5"; // hsl(178 70% 52%) — --color-primary
const INK = "#082121"; // hsl(180 60% 8%)  — --color-primary-foreground

/**
 * Ratios are expressed against the icon's edge length so every size renders
 * the same mark. They were tuned by measuring the rendered ink box at 16, 32
 * and 180px:
 *
 * - `GLYPH` 0.8 — a single letter, large. Two letters ("ED") collapse into an
 *   unreadable smear at 16px, and this is the size at which the bowl of the
 *   "D" still holds an open counter on the 16px pixel grid.
 * - `STROKE` 0.04 — Satori's only bundled face is Geist Regular, so
 *   `fontWeight` does nothing; the stroke is what supplies the weight the mark
 *   needs at tab size. Heavier than this and the counter fills in at 16px.
 * - `SHIFT` 0.014 — Geist's "D" carries a wider left side bearing than right,
 *   so metric centring lands it ~2% right of the optical centre. Nudging it
 *   back leaves a hair more air on the round right side, as a "D" wants.
 */
const GLYPH = 0.8;
const STROKE = 0.04;
const SHIFT = 0.014;

/**
 * Builds the mark at a given edge length.
 *
 * @param size edge length of the square icon, in pixels.
 * @param glyph glyph size as a fraction of `size`. Larger icons want more air
 *   around the letter than a favicon does, so the home-screen icon overrides it.
 */
export function IconMark({
  size,
  glyph = GLYPH,
}: {
  size: number;
  glyph?: number;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: FIELD,
        color: INK,
        fontSize: size * glyph,
        lineHeight: 1,
        WebkitTextStrokeWidth: size * STROKE,
        WebkitTextStrokeColor: INK,
        paddingRight: size * SHIFT,
      }}
    >
      D
    </div>
  );
}
