import type { SimpleIcon } from "simple-icons";

/**
 * Brand marks for the stack strip, from the `simple-icons` package.
 *
 * Two pieces, and the split is the whole point:
 *
 * `BrandIconSprite` emits every path ONCE, as `<symbol>` definitions.
 * `BrandIcon` emits a `<use>` reference to one of them.
 *
 * The stack marquee paints the same icon five or six times over (duplicated
 * laps are how a CSS-only marquee loops), and these paths are not small — the
 * NestJS mark alone is 6KB of path data, the set is ~35KB. Inlining the path
 * at every chip would put a few hundred KB of identical `d=` attributes in the
 * HTML *and* again in the RSC payload, on the one page whose LCP this site
 * cares most about. A `<use href="#id">` is sixty bytes.
 *
 * Both are server-only by nature — nothing here is interactive — so the
 * `simple-icons` module itself never reaches the browser; only the rendered
 * paths do.
 */

/** `--color-card`: the chip ground every mark is seen against. */
const CHIP_RGB = [255, 255, 255] as const;
/** `--color-ink`, the darkening agent for marks too light to see on a chip. */
const INK_RGB = [21, 35, 48] as const;
/**
 * Contrast floor for a mark against its chip. A brand glyph next to its own
 * name is decorative — the name carries the meaning, so WCAG's 4.5 text floor
 * does not apply — but below roughly 3:1 a mark stops being visible at all,
 * which is worse than not drawing it. Three brands in this stack sit under
 * that on white: React (1.6), Vitest (1.4), Tailwind (2.4).
 */
const MIN_CHIP_CONTRAST = 3;

type Rgb = readonly [number, number, number];

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: Rgb): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** WCAG relative luminance. */
function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: Rgb, b: Rgb): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function mix(from: Rgb, toward: Rgb, weight: number): Rgb {
  return [
    from[0] * weight + toward[0] * (1 - weight),
    from[1] * weight + toward[1] * (1 - weight),
    from[2] * weight + toward[2] * (1 - weight),
  ];
}

/**
 * The brand's own hex where it is visible on a white chip, and the least
 * possible step toward the navy ink where it is not.
 *
 * Stepping toward ink rather than simply picking a darker tone keeps the hue:
 * a deepened React cyan still reads as React. The step is searched rather than
 * fixed because the three brands that need it need wildly different amounts —
 * a flat darkening strong enough for Vitest's neon green would visibly dull
 * Tailwind's teal, which only misses the floor by a hair.
 */
export function chipSafeHex(brandHex: string): string {
  const brand = hexToRgb(brandHex);
  if (contrast(brand, CHIP_RGB) >= MIN_CHIP_CONTRAST) return `#${brandHex}`;

  for (let weight = 0.96; weight > 0; weight -= 0.04) {
    const stepped = mix(brand, INK_RGB, weight);
    if (contrast(stepped, CHIP_RGB) >= MIN_CHIP_CONTRAST) return rgbToHex(stepped);
  }
  return rgbToHex(INK_RGB);
}

/** Namespaced so these ids cannot collide with anything else on the page. */
function symbolId(slug: string): string {
  return `brand-mark-${slug}`;
}

/**
 * The `<symbol>` definitions. Render once, anywhere in the subtree that uses
 * them, before the first `<use>`.
 *
 * Positioned-and-zero-sized rather than `display: none`: a `<use>` pointing
 * into a `display: none` sprite is fine in every current browser, but it has
 * historically been the one thing that breaks sprites, and this costs nothing.
 */
export function BrandIconSprite({ icons }: { icons: readonly SimpleIcon[] }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute h-0 w-0 overflow-hidden"
    >
      {icons.map((icon) => (
        <symbol key={icon.slug} id={symbolId(icon.slug)} viewBox="0 0 24 24">
          <path d={icon.path} fill={chipSafeHex(icon.hex)} />
        </symbol>
      ))}
    </svg>
  );
}

/**
 * One brand mark, in its own colour.
 *
 * `icon` is optional on purpose. Not every real tool has a simple-icons entry
 * — AWS and OpenAI have none — and the answer to that is a neutral monogram
 * dot, never a broken image or a dropped item. `name` supplies the monogram's
 * initial, and is the accessible label either way: the chip's text sits next
 * to this, so the glyph itself is decorative.
 */
export function BrandIcon({
  icon,
  name,
  className = "h-[18px] w-[18px]",
}: {
  icon?: SimpleIcon;
  name: string;
  className?: string;
}) {
  if (!icon) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-foreground/[0.07] text-[9px] font-bold leading-none text-muted-foreground ${className}`}
      >
        {name.slice(0, 1).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
    >
      <use href={`#${symbolId(icon.slug)}`} />
    </svg>
  );
}
