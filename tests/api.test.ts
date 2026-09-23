import { afterEach, describe, expect, it, vi } from 'vitest';
import { handleJev } from '../api/jev.ts';

const decide = (body: unknown) =>
  new Request('http://x/api/jev/decide', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

const goodBody = { state: {}, questions: { plan: { type: 'choice', instructions: 'pick', criteria: { a: 'A', b: 'B' } } } };

describe('jev bridge', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reports whether a key is configured', async () => {
    expect(await (await handleJev(new Request('http://x/api/jev/status'), undefined)).json()).toMatchObject({ ready: false });
    expect(await (await handleJev(new Request('http://x/api/jev?op=status'), 'k')).json()).toMatchObject({ ready: true });
  });

  it('refuses to decide without a key', async () => {
    expect((await handleJev(decide(goodBody), undefined)).status).toBe(503);
  });

  it('rejects malformed questions before calling upstream', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    expect((await handleJev(decide({ questions: { x: { type: 'essay' } } }), 'k')).status).toBe(422);
    expect(f).not.toHaveBeenCalled();
  });

  it('forwards to TypeSafe with the key server-side and the jev-latest model', async () => {
    const f = vi.fn(async () => new Response(JSON.stringify({ answers: { plan: { choice: 'a' } } }), { status: 200 }));
    vi.stubGlobal('fetch', f);
    const r = await handleJev(decide(goodBody), 'secret');
    expect(r.status).toBe(200);
    const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.typesafe.ai/v1/systemone');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer secret');
    expect(JSON.parse(init.body as string).model).toBe('jev-latest');
  });

  it('maps an invalid key upstream to "dreaming"', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 401 })));
    expect((await handleJev(decide(goodBody), 'bad')).status).toBe(503);
  });
});
