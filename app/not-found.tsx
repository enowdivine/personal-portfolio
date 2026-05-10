import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="container py-32 max-w-md">
        <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-4">
          404
        </span>
        <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
          Page not found.
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
