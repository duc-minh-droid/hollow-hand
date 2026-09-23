/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import { jevMiddleware } from './server/nodeAdapter.ts';

export default defineConfig(({ mode }) => {
  // Load every var (not just VITE_*) for the server only. Nothing here is exposed to the client.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      {
        name: 'jev-proxy',
        configureServer(server) {
          server.middlewares.use(jevMiddleware(() => env.TYPESAFE_API_KEY || process.env.TYPESAFE_API_KEY));
        },
        configurePreviewServer(server) {
          server.middlewares.use(jevMiddleware(() => env.TYPESAFE_API_KEY || process.env.TYPESAFE_API_KEY));
        },
      },
    ],
    test: { environment: 'node' },
  };
});
