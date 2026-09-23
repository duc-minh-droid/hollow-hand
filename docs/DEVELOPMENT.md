# Development

## Architecture

```
src/
  main.ts                 boot: defs, fonts, particles, router, Jev probe
  core/   rng.ts          seeded mulberry32 in a plain object (state stays cloneable)
          store.ts        localStorage: memory, run save, settings (every access try/catch)
  game/   types.ts        CardDef, CombatState, FxEvent…
          ops.ts          primitive ops: damage, ward, status, draw… (every change emits an FxEvent)
          combat.ts       turn flow, playCard, boss phase, peek, cloneForSim
          cards.ts        every card, player and Jev, upright + reversed
          run.ts          map generation, rewards, shop stock
          events.ts       story events
          trinkets.ts, keywords.ts
  jev/    profile.ts      habit tracking → habits() → describe()
          candidates.ts   plan enumeration + simulation + heuristic score
          brain.ts        one Jev call per turn, blending, fallback
          evolve.ts       counter-rule choice + card theft
          jevClient.ts    browser → /api/jev/*
          masks.ts, mutations.ts, dialogue.ts
  art/    palette, defs, icons, registry (import.meta.glob), cards/, masks/, trinkets/
  ui/     app.ts (router), cardView, hand (fan + drag), hud, tooltip, typewriter, screens/
  fx/     particles.ts (one pooled canvas + a stain layer), juice.ts, audio.ts
  styles/ base, card, combat, screens
api/jev.ts                the TypeSafe bridge (Vercel function; also used locally)
server/   nodeAdapter.ts  Node http ↔ Web Request adapter; server.ts for `npm start`
scripts/  capture.mjs, encode_demo.py, balance.ts, gen-cards-doc.ts
tests/    combat, jev, api
```

### Engine → presentation

The engine is pure and resolves instantly. Every state change pushes an `FxEvent` (`dmg`, `ward`, `wardBreak`, `status`, `draw`, `roll`, `trigger`, `phase`, `death`…) onto `state.fx`. The combat screen drains that list after each action and **replays it** in order, one handler per event type. Each handler moves the displayed bars, spawns particles, shakes, plays a sound and waits a beat. Displayed HP lags the real HP on purpose, so the bars move in time with the hits.

`cloneForSim` gives Jev a copy with `sim = true`, which stops FX and profile side effects, and a decorrelated RNG.

## Testing

```bash
npm test
```

30 tests:

- **Combat math:** Ward, Pierce, Hex, Omen, Bleed, Ash, candles, death, boss phase.
- **Card smoke test:** every card played upright, reversed and carved without throwing.
- **Mutations.**
- **Jev:** simulation purity, lethal, fallback, confidence, counter-weighting.
- **Bridge:** status, missing key, validation, forwarding, 401 mapping.

**Balance sim:**

```bash
node scripts/balance.ts
```

```bash
BUILT=1 node scripts/balance.ts devil,jev
```

## Capturing screenshots and the demo

Start `npm run dev` first. The capture drives your **installed Chrome** via `playwright-core`, so there's no browser download.

```bash
npm run capture
```

```bash
python -m pip install imageio-ffmpeg
```

```bash
npm run encode-demo
```

`capture.mjs` runs a fresh night:

- title → intro → map → the first fight;
- real mouse drags to play cards, then end turn;
- reward → the ledger scene;
- event, shop and rest through the dev-only `window.__hh` handle;
- the gallery rows and both endings.

The demo uses a CDP screencast. Frames arrive only when the page changes, so `encode_demo.py` holds each one until the next (ffmpeg concat with per-frame durations). It writes an H.264 MP4 plus a palette-optimised GIF for the README.

## Deploy

Vercel project `hollow-hand`, connected to this GitHub repo, so every push to `main` deploys.

- `vercel.json`: framework `vite`, build `npm run build`, output `dist`, and a rewrite of `/api/jev/:op` → `/api/jev?op=:op`.
- `api/jev.ts` exports `GET`/`POST` Web handlers (Node runtime).
- Secret: `TYPESAFE_API_KEY`, as a project environment variable.

To deploy by hand:

```bash
vercel deploy --prod
```

## Conventions

- TypeScript strict with `erasableSyntaxOnly`, so Node 24 runs `.ts` files directly for scripts and the server.
- Imports use explicit `.ts` extensions.
- Art files export `() => string`, never define `id`s, and only use palette colours.
