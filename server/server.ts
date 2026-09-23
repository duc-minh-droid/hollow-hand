// Production server: serves dist/ and the Jev proxy. Run with `npm start`.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { jevMiddleware } from './nodeAdapter.ts';

const root = join(import.meta.dirname, '..');
const dist = join(root, 'dist');
if (existsSync(join(root, '.env.local'))) process.loadEnvFile(join(root, '.env.local'));

const TYPES: Record<string, string> = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.png': 'image/png',
};

const api = jevMiddleware(() => process.env.TYPESAFE_API_KEY);

createServer((req, res) => {
  if (req.url?.startsWith('/api/')) return void api(req, res);
  const path = normalize(decodeURIComponent((req.url ?? '/').split('?')[0])).replace(/^([/\\])+/, '');
  let file = join(dist, path);
  if (!file.startsWith(dist) || !existsSync(file) || statSync(file).isDirectory()) file = join(dist, 'index.html');
  res.setHeader('Content-Type', TYPES[extname(file)] ?? 'application/octet-stream');
  res.end(readFileSync(file));
}).listen(4173, () => console.log('Hollow Hand on http://localhost:4173'));
