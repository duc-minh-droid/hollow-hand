# Hollow Hand

An occult-tarot roguelike deckbuilder. You play one night of cards against **Jev**, a masked Dealer that studies how you play and rewrites its own rules to beat you.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. `?gallery` opens the card gallery directly.

`npm test` runs the engine and AI tests. `npm start` builds and serves the production bundle on port 4173.

## Connecting Jev (TypeSafe)

Jev's decisions come from TypeSafe's **Jev** System One model when a key is configured, and from a local heuristic ("instinct") when it is not. The game is fully playable either way; the top bar shows `Jev: awake` or `Jev: dreaming`.

1. Copy `.env.example` to `.env.local`.
2. Put your key after `TYPESAFE_API_KEY=`.
3. Restart `npm run dev`.

The key is read only by the local server (`server/jevProxy.ts`), which forwards requests to `https://api.typesafe.ai/v1/systemone` with model `jev-latest`. It is never bundled into or sent to the browser. `.env.local` is git-ignored.

### What Jev decides

Code owns the rules; Jev supplies judgment:

- **Each of its turns** — the engine enumerates every legal line of play, simulates each one, and scores it. Jev gets one request with three questions: a *Choice* over those plans, a *Score* for how hard you are likely to hit next turn, and a *Choice* of what to say. The final pick is sampled from a blend of Jev's probabilities and the heuristic, weighted by Jev's confidence. A lethal line is always taken.
- **Between fights** — Jev picks one counter-rule for its ledger (a *Choice* over the rules it does not have yet) from a summary of your habits, and pockets a copy of your favourite card.
- **Across nights** — a grudge, your cause of death and your favourite card persist in `localStorage`. At grudge 2+ Jev starts the night already adapted, and the card it kept from last time is in its deck.

## Layout

- `src/game` — pure, seeded combat engine, cards, run/map, events.
- `src/jev` — habit profile, plan enumeration, heuristic, Jev client, evolution, masks, dialogue.
- `src/art` — every illustration is hand-authored SVG (`cards/`, `masks/`, `trinkets/`); see `src/art/STYLE.md`.
- `src/ui`, `src/fx`, `src/styles` — screens, hand, juice (shake, hit-stop, particles), procedural WebAudio.
- `server` — the Jev proxy (dev middleware and production server).
