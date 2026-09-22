import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Minimal formatter for assistant replies.
 *
 * The model emits light markdown even when asked not to, and printing it raw
 * leaves `**like this**` on screen. A markdown library is disproportionate for a
 * chat bubble, so this handles only what actually shows up: bold, inline code,
 * bullet and numbered lists, links, and paragraph breaks.
 *
 * Everything is built as React elements — never `dangerouslySetInnerHTML` — so
 * model output cannot inject markup into the page.
 */

/**
 * Only these become anchors. Model output is untrusted: without this check a
 * reply containing `javascript:` or `data:` would render as a live link.
 */
function safeHref(url: string): string | null {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^mailto:/i.test(trimmed)) return trimmed;
  // Bare address, e.g. enowdivine14@gmail.com
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return `mailto:${trimmed}`;
  // A page on this site. The second character must not be another slash: `//x`
  // is protocol-relative and would leave the site entirely.
  if (/^\/(?!\/)/.test(trimmed)) return trimmed;
  return null;
}

const LINK_CLASS =
  "font-medium text-primary underline underline-offset-2 hover:text-foreground";

function Anchor({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    // Client-side navigation, so the panel stays mounted and the conversation
    // survives the visitor following a link.
    return (
      <Link href={href} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }

  const external = /^https?:/i.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={LINK_CLASS}
    >
      {children}
    </a>
  );
}

/** `**bold**`, `` `code` ``, `[text](url)`, bare URLs and email addresses. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  // Alternating split: even indices are plain, odd are a captured token.
  // Markdown links are matched before bare URLs so the URL inside one is not
  // captured twice.
  const parts = text.split(
    /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s<>()]+|[^\s@]+@[^\s@]+\.[a-z]{2,})/gi,
  );

  parts.forEach((part, i) => {
    if (!part) return;
    const key = `${keyPrefix}-${i}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      out.push(
        <strong key={key} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>,
      );
      return;
    }

    // [label](href)
    const md = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (md) {
      const href = safeHref(md[2]);
      out.push(
        href ? (
          <Anchor key={key} href={href}>
            {md[1]}
          </Anchor>
        ) : (
          <Fragment key={key}>{md[1]}</Fragment>
        ),
      );
      return;
    }

    // Bare URL or email
    if (
      /^https?:\/\//i.test(part) ||
      /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(part)
    ) {
      const href = safeHref(part);
      if (href) {
        // Trailing punctuation belongs to the sentence, not the URL.
        const trailing = /[.,;:!?]$/.exec(part);
        const label = trailing ? part.slice(0, -1) : part;
        out.push(
          <Fragment key={key}>
            <Anchor href={safeHref(label) ?? href}>{label}</Anchor>
            {trailing ? trailing[0] : null}
          </Fragment>,
        );
        return;
      }
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      out.push(
        <code
          key={key}
          className="border border-border bg-muted/40 px-1 py-0.5 font-mono text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>,
      );
      return;
    }

    out.push(<Fragment key={key}>{part}</Fragment>);
  });

  return out;
}

const BULLET = /^\s*[-*•]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

export function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];

  let list: { ordered: boolean; items: string[] } | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const body = paragraph.join(" ");
    blocks.push(
      <p key={`p-${blocks.length}`} className="whitespace-pre-wrap">
        {inline(body, `p${blocks.length}`)}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    const current = list;
    blocks.push(
      <Tag
        key={`l-${blocks.length}`}
        className={
          current.ordered
            ? "list-decimal space-y-1 pl-5"
            : "list-disc space-y-1 pl-5"
        }
      >
        {current.items.map((item, i) => (
          <li key={i}>{inline(item, `l${blocks.length}i${i}`)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const isBullet = BULLET.test(line);
    const isNumbered = NUMBERED.test(line);

    if (isBullet || isNumbered) {
      flushParagraph();
      const ordered = isNumbered;
      if (list && list.ordered !== ordered) flushList();
      list ??= { ordered, items: [] };
      list.items.push(line.replace(isNumbered ? NUMBERED : BULLET, ""));
      continue;
    }

    flushList();
    // Strip any heading hashes — the prompt asks for none, but a stray
    // "### Experience" should not render as literal hashes.
    paragraph.push(line.replace(/^#{1,6}\s+/, ""));
  }

  flushParagraph();
  flushList();

  return <div className="space-y-2">{blocks}</div>;
}
