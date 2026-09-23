// Adapts Node's http (req, res) to the Web Request/Response handler in api/jev.ts,
// so local dev and `npm start` run exactly the code Vercel runs.
import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleJev } from '../api/jev.ts';

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  return Buffer.concat(chunks);
}

export function jevMiddleware(getKey: () => string | undefined) {
  return async (req: IncomingMessage, res: ServerResponse, next?: () => void) => {
    if (!req.url?.startsWith('/api/jev/')) return next ? next() : ((res.statusCode = 404), res.end());
    const body = req.method === 'POST' ? await readBody(req) : undefined;
    const request = new Request(`http://localhost${req.url}`, {
      method: req.method,
      headers: { 'Content-Type': req.headers['content-type'] ?? 'application/json' },
      body,
    });
    const response = await handleJev(request, getKey());
    res.statusCode = response.status;
    response.headers.forEach((v, k) => res.setHeader(k, v));
    res.end(Buffer.from(await response.arrayBuffer()));
  };
}
