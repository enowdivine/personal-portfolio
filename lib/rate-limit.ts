/**
 * Shared rate limiter for the public, unauthenticated routes on this site.
 *
 * /api/chat spends money on every request and requires no login, so it has to
 * be gated by something. In-memory and per-instance by design: this is a
 * personal site on a single Node process. It is a speed bump against scripted
 * abuse, not a distributed quota — a serverless fan-out would need a shared
 * store, and that is a deliberate trade, not an oversight.
 *
 * (/api/contact still carries its own inline limiter from before this file
 * existed. It is left alone here rather than refactored as a side effect of
 * adding the assistant.)
 */

export interface RateLimitRule {
  /** Requests allowed inside the window. */
  limit: number;
  windowMs: number;
}

/** Shared across buckets; the bucket name is part of the key. */
const hits = new Map<string, number[]>();

/**
 * Without this the map grows one entry per IP for the lifetime of the process.
 * Swept on write rather than on a timer so there is no interval to leak.
 */
function prune(now: number, windowMs: number): void {
  for (const [key, timestamps] of hits) {
    if (timestamps.every((t) => now - t >= windowMs)) {
      hits.delete(key);
    }
  }
}

/**
 * Records the attempt and reports whether it should be refused. Call once per
 * request, before doing any work — a second call counts as a second attempt.
 */
export function isRateLimited(
  bucket: string,
  ip: string,
  rule: RateLimitRule,
): boolean {
  const now = Date.now();
  prune(now, rule.windowMs);

  const key = `${bucket}:${ip}`;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < rule.windowMs);

  if (recent.length >= rule.limit) {
    // Keep the existing window rather than extending it: a blocked caller
    // should be let back in once the oldest hit ages out, not punished into a
    // rolling ban by retrying.
    hits.set(key, recent);
    return true;
  }

  hits.set(key, [...recent, now]);
  return false;
}

/**
 * Best-effort client address. Spoofable through `x-forwarded-for`, which is
 * why it only ever gates a rate limit and never an authorisation decision.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return headers.get("x-real-ip")?.trim() || "unknown";
}
