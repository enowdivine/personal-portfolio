// Stub health-check endpoint. The IDE's preview panel polls /health to detect
// when the dev server is up — without this route it 404s every ~30ms and floods
// the terminal.
export function GET() {
  return new Response("ok", { status: 200, headers: { "cache-control": "no-store" } });
}
