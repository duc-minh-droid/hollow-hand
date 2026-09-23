// Jev bridge: the only place that holds the TypeSafe key. Self-contained on purpose so the
// same file runs as a Vercel function and inside the local dev/prod servers.
//   GET  /api/jev/status  → { ready, model }
//   POST /api/jev/decide  → forwards { state, questions } to TypeSafe System One (model jev-latest)
// On Vercel, vercel.json rewrites /api/jev/:op to /api/jev?op=:op.

const API = 'https://api.typesafe.ai/v1/systemone';
const MODEL = 'jev-latest';
const MAX_BODY = 48 * 1024;
const TIMEOUT_MS = 4000;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function opOf(req: Request) {
  const url = new URL(req.url);
  return url.searchParams.get('op') ?? url.pathname.split('/').filter(Boolean).pop() ?? '';
}

function valid(body: unknown): body is { state: unknown; questions: Record<string, { type: string }> } {
  if (!body || typeof body !== 'object') return false;
  const q = (body as { questions?: unknown }).questions;
  if (!q || typeof q !== 'object') return false;
  const entries = Object.values(q as Record<string, { type?: string }>);
  return entries.length > 0 && entries.length <= 4 && entries.every((e) => ['choice', 'score', 'noul'].includes(e?.type ?? ''));
}

async function callJev(key: string, payload: unknown, attempt = 0): Promise<{ status: number; body: unknown }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    if ((r.status === 429 || r.status === 529) && attempt < 1) {
      await new Promise((ok) => setTimeout(ok, 400));
      return callJev(key, payload, attempt + 1);
    }
    return { status: r.status, body: await r.json().catch(() => ({})) };
  } finally {
    clearTimeout(timer);
  }
}

export async function handleJev(req: Request, key: string | undefined): Promise<Response> {
  const op = opOf(req);
  if (op === 'status') return json(200, { ready: !!key, model: MODEL });
  if (op !== 'decide') return json(404, { error: 'not found' });
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  if (!key) return json(503, { error: 'No TYPESAFE_API_KEY configured. Jev is dreaming.' });
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return json(413, { error: 'too large' });
    const body = JSON.parse(text);
    if (!valid(body)) return json(422, { error: 'bad request' });
    const { status, body: out } = await callJev(key, { model: MODEL, state: body.state, questions: body.questions });
    if (status !== 200) {
      console.warn(`[jev] upstream ${status}`);
      return json(status === 401 ? 503 : 502, { error: `upstream ${status}` });
    }
    return json(200, out);
  } catch (e) {
    console.warn('[jev] proxy error:', (e as Error).message);
    return json(502, { error: 'jev unreachable' });
  }
}

// Vercel Node runtime (Web handler signature).
export const GET = (req: Request) => handleJev(req, process.env.TYPESAFE_API_KEY);
export const POST = (req: Request) => handleJev(req, process.env.TYPESAFE_API_KEY);
