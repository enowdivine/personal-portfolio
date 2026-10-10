import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAdonisjs,
  siAnthropic,
  siDocker,
  siExpo,
  siExpress,
  siGit,
  siGithub,
  siGraphql,
  siJest,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPm2,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVitest,
} from "simple-icons";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { BrandIcon, BrandIconSprite } from "@/components/BrandIcon";

/**
 * The stack strip on the landing page: one auto-scrolling row per category.
 *
 * Content rule, and the reason this data is not generated from anything:
 * every item below is a tool that appears in `SKILLS`/`EXPERIENCE` in
 * lib/data.ts or in an engagement deliverable on /consulting. Nothing is here
 * to fill a row. Where that left a category with fewer than four honest
 * entries it was merged into its neighbour rather than padded — which is why
 * web and mobile share a row (React Native and Expo are the only two honest
 * mobile entries), and why there is no mobile-money row: those integrations
 * are real and documented on /consulting, but MTN Mobile Money, Orange Money
 * and Fapshi have no marks in the set, and three monogram dots in a row is a
 * placeholder, not a stack.
 *
 * The data deliberately lives here rather than in lib/data.ts: that module is
 * imported by the chat API route through lib/ai-knowledge-base.ts, and pulling
 * `simple-icons` (a 5MB module) into its dependency graph to decorate four
 * rows of a marketing section is not a trade worth making.
 */

type Tech = {
  name: string;
  /** Absent where simple-icons has no entry — see BrandIcon's monogram. */
  icon?: SimpleIcon;
};

type StackRow = {
  /** Key under the `Stack.rows` namespace — the row heading is prose. */
  labelKey: string;
  items: readonly Tech[];
};

const STACK: readonly StackRow[] = [
  {
    labelKey: "webMobile",
    items: [
      { name: "React", icon: siReact },
      { name: "Next.js", icon: siNextdotjs },
      { name: "TypeScript", icon: siTypescript },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "Expo", icon: siExpo },
      // simple-icons lists "React Native" as an alias of the React mark, which
      // matches React Native's own branding — so this is the official glyph
      // twice over, not a stand-in. Kept at the far end of the row from React
      // so the two atoms are never neighbours.
      { name: "React Native", icon: siReact },
    ],
  },
  {
    labelKey: "backend",
    items: [
      { name: "Node.js", icon: siNodedotjs },
      { name: "NestJS", icon: siNestjs },
      { name: "Express", icon: siExpress },
      { name: "AdonisJS", icon: siAdonisjs },
      { name: "GraphQL", icon: siGraphql },
      { name: "Python", icon: siPython },
    ],
  },
  {
    labelKey: "data",
    items: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "Prisma", icon: siPrisma },
      { name: "Redis", icon: siRedis },
      { name: "MongoDB", icon: siMongodb },
      { name: "Docker", icon: siDocker },
      // No simple-icons entry — Amazon's marks are not in the set. Monogram.
      { name: "AWS" },
      { name: "Nginx", icon: siNginx },
      { name: "PM2", icon: siPm2 },
      { name: "Vercel", icon: siVercel },
    ],
  },
  {
    labelKey: "payments",
    items: [
      { name: "Stripe", icon: siStripe },
      { name: "Anthropic", icon: siAnthropic },
      // Also absent from simple-icons. Monogram.
      { name: "OpenAI" },
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "Jest", icon: siJest },
      { name: "Vitest", icon: siVitest },
    ],
  },
];

/* ── Loop geometry ────────────────────────────────────────────────────────
   A CSS marquee loops by laying the same list out twice and sliding exactly
   one lap left; the seam is invisible because what arrives is identical to
   what left. Two numbers have to be right for that illusion to hold.

   One: a lap must be at least as wide as the screen. At the moment the track
   has slid a full lap, the content still to the right of the viewport's left
   edge is exactly one lap — so a lap narrower than the viewport opens a hole
   at the right edge just before the loop restarts. These rows carry six to
   nine real items, which is only 740–1050px, so each lap repeats its items
   until it clears COVER_PX. Those repeats are the only padding anywhere in
   this component, and every one of them is aria-hidden.

   Two: every row must travel at the same speed regardless of how much it
   carries, or the rows read as four unrelated animations. So the duration is
   derived from the lap's width, not fixed per row.

   The widths are estimates, and only ever used to pick a repeat count and a
   duration — a few percent out changes nothing, because the distance itself
   is expressed as a percentage of the real rendered track in globals.css. */

/** Chip chrome: padding (30), border (2), icon (18), icon-to-label gap (10). */
const CHIP_BASE_PX = 60;
/** Average advance of 13px semibold Inter, measured off the rendered chips. */
const CHIP_CHAR_PX = 7.6;
/** Matches `--marquee-gap` in globals.css. */
const GAP_PX = 12;
/** Widest viewport the seam has to survive — a 2560px desktop, maximised. */
const COVER_PX = 2560;
/** Calm, readable drift: a chip takes about three seconds to pass. Faster than
 *  this and the names stop being readable in passing, which would make the
 *  whole strip decoration. */
const SPEED_PX_PER_S = 42;

function lapWidth(items: readonly Tech[]): number {
  return items.reduce(
    (total, item) => total + CHIP_BASE_PX + item.name.length * CHIP_CHAR_PX + GAP_PX,
    0,
  );
}

export async function StackMarquee() {
  const t = await getTranslations("Stack");

  const sprite = STACK.flatMap((row) =>
    row.items.flatMap((item) => (item.icon ? [item.icon] : [])),
  );
  // React Native reuses the React mark, so the list has a duplicate id in it.
  const uniqueIcons = sprite.filter(
    (icon, i) => sprite.findIndex((other) => other.slug === icon.slug) === i,
  );

  return (
    <section id="stack" className="border-t border-border bg-background">
      <BrandIconSprite icons={uniqueIcons} />

      <div className="container pt-20 md:pt-24">
        <Reveal distance="far" className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {t("label")}
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,4.2vw,2.6rem)] font-extrabold text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {t("lede")}
          </p>
        </Reveal>
      </div>

      {/* Full-bleed, so the rows read as running past the edges of the page
          rather than as four boxes of logos. The clipping and the edge fade
          are on `.marquee` in globals.css. */}
      <div className="pb-20 pt-14 md:pb-24">
        {STACK.map((row, rowIndex) => {
          const width = lapWidth(row.items);
          const repeats = Math.max(1, Math.ceil(COVER_PX / width));
          const duration = Math.round((width * repeats) / SPEED_PX_PER_S);
          // Alternating direction. Two rows going the same way look like a
          // conveyor belt; opposing rows read as motion rather than transit.
          const reverse = rowIndex % 2 === 1;

          /** `dup` marks a lap the loop needs but a reader does not. */
          const lap = (dup: boolean) => (
            <ul
              className={`marquee-lap${dup ? " marquee-dup" : ""}`}
              aria-hidden={dup || undefined}
            >
              {Array.from({ length: repeats }).flatMap((_, pass) =>
                row.items.map((item) => (
                  <li
                    key={`${pass}-${item.name}`}
                    // Within a lap, only the first pass is the genuine list;
                    // the repeats after it are there to make the lap wide
                    // enough to cover the screen.
                    aria-hidden={pass > 0 || undefined}
                    className={`tech-chip card-rest${
                      pass > 0 ? " marquee-dup" : ""
                    }`}
                  >
                    <BrandIcon icon={item.icon} name={item.name} />
                    <span>{item.name}</span>
                  </li>
                )),
              )}
            </ul>
          );

          return (
            <Reveal
              key={row.labelKey}
              delay={rowIndex * 90}
              className="mt-8 first:mt-0"
            >
              <h3 className="container text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {t(`rows.${row.labelKey}`)}
              </h3>
              {/* `.marquee` carries its own vertical padding for the chip
                  shadows, so the gap under the label is small on purpose. */}
              <div className="marquee mt-1.5">
                <div
                  className="marquee-track"
                  data-direction={reverse ? "reverse" : undefined}
                  style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
                >
                  {lap(false)}
                  {/* The second lap: what slides in on the right as the first
                      slides out on the left. Decorative, and hidden outright
                      under reduced motion, where nothing slides anywhere. */}
                  {lap(true)}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
