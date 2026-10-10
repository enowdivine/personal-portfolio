import type { SimpleIcon } from "simple-icons";
import { getTranslations } from "next-intl/server";
import {
  siAdonisjs,
  siAnthropic,
  siDocker,
  siExpress,
  siGit,
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
  siVitest,
} from "simple-icons";
import { Reveal } from "@/components/Reveal";
import { BrandIcon, BrandIconSprite } from "@/components/BrandIcon";
import { SKILLS } from "@/lib/data";

/**
 * The /about stack section: `SKILLS` from lib/data.ts, rendered in the same
 * chip vocabulary as the homepage's stack marquee.
 *
 * STATIC on purpose — no marquee here. The homepage already runs four
 * auto-scrolling rows, and a second animated strip on the page a reader opens
 * to study the detail is motion competing with reading. Same `.tech-chip`
 * class, same `BrandIcon` sprite, laid out as a grid that holds still.
 *
 * The icon lookup is by item name, and a miss is fine: `BrandIcon` draws a
 * neutral monogram for anything `simple-icons` has no mark for, which is
 * correct for the handful of entries here that are a capability rather than a
 * product ("Microservices", "Code review", "Multi-currency"). AWS, gRPC and
 * OpenAI genuinely have no entry in the set.
 *
 * Server component by nature, so the 5MB `simple-icons` module never reaches
 * the browser — only the rendered paths do.
 */
const ICONS: Record<string, SimpleIcon> = {
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  AdonisJS: siAdonisjs,
  Express: siExpress,
  Python: siPython,
  GraphQL: siGraphql,
  React: siReact,
  "Next.js": siNextdotjs,
  // simple-icons lists "React Native" as an alias of the React mark, which
  // matches React Native's own branding — the official glyph twice over.
  "React Native": siReact,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Redis: siRedis,
  MongoDB: siMongodb,
  Docker: siDocker,
  Nginx: siNginx,
  PM2: siPm2,
  Stripe: siStripe,
  Jest: siJest,
  Vitest: siVitest,
  "Git/GitHub": siGit,
  "OpenAI & Anthropic APIs": siAnthropic,
};

export async function SkillsGrid() {
  const t = await getTranslations("Skills");

  const used = Object.values(ICONS);
  // React and React Native share a mark, so the list has a duplicate in it and
  // the sprite must emit each `<symbol>` once.
  const uniqueIcons = used.filter(
    (icon, i) => used.findIndex((other) => other.slug === icon.slug) === i,
  );

  return (
    <>
      <BrandIconSprite icons={uniqueIcons} />

      {/* Staggered by column, not by index: cells in the same row arrive
          together, so the offset belongs to the position in the row. */}
      <div className="grid gap-5 md:grid-cols-2">
        {SKILLS.map((group, i) => (
          <Reveal
            key={group.id}
            delay={(i % 2) * 120}
            className="card-rest rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {t(group.id)}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="tech-chip card-rest">
                  <BrandIcon icon={ICONS[item]} name={item} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </>
  );
}
