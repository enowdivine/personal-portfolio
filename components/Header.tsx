import Link from "next/link";
import { PROFILE } from "@/lib/data";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur border-b border-border">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">·</span> {PROFILE.name}
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-widest px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
