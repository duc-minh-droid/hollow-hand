# Devlog

Notes kept while building Hollow Hand, in order.

## 1. The brief

The brief called for a card game with real card art (no emoji or text-only cards), heavy juice, a style that doesn't look like a template, RNG, story, a roguelike structure, and an opponent that keeps adapting, driven by TypeSafe's **Jev** model.

These choices were made up front:

- **Style:** occult tarot and woodcut ink.
- **Premise:** a cursed Dealer.
- **Stack:** Vite + TypeScript with no UI framework.
- **Length:** one act of about eight nodes.
- **Art:** a bespoke SVG illustration per card.

## 2. Engine first

The combat engine was written as pure, seeded logic before any UI:

- one `ops.ts` through which every change passes, so trinkets and mutations apply in one place and every change emits an FX event;
- `combat.ts` for turn flow;
- cards as data plus a `play(ctx)` function, so Jev and the player share one engine and a stolen card "just works" on the other side.

The first test run caught a `favorite()` bug: Jev kept stealing *Ward* (a starter) over *Bone Chapel*. The rule became "a non-starter played twice beats any starter", because Jev should steal your signature, not your basics.

## 3. Jev

The TypeSafe skill's guidance shaped the design: code enumerates and validates, and the model picks. Each Jev turn is **one** request with three questions (plan Choice, threat Score, taunt Choice), since independent questions over the same state are cheap to batch.

The API docs were enough to call `POST /v1/systemone` directly, so the bridge uses `fetch` instead of `@typesafe-ai/sdk`. The SDK docs didn't yet cover Score/Noul signatures or response fields.

The key lives only on the server. The bridge started as a Node middleware and was later rewritten as a single Web-standard handler (`api/jev.ts`) so the same file runs on Vercel and locally.

## 4. Art in parallel

The frame, palette, shared hatch patterns and one reference piece (*Strike*: a dagger through a sleeping crescent moon) came first. Then four illustrators worked from `src/art/STYLE.md` at once:

- the player commons (14);
- the major arcana (17);
- Jev's lacquered deck (17);
- the masks (6) and trinkets (12).

Every file was validated for balanced tags, no `id`s, and palette-only colours.

## 5. The table

- **Hand:** a fanned arc keyed by card uid. Hover lifts, click selects, click again or drag above the line to play. The drag leaves an ink trail.
- **FX:** the replay layer turns engine events into shake (trauma-based, quadratic), hit-stop (pausing all CSS animation), ink and blood particles that leave fading stains on the felt, glass shards when Ward breaks, cards burning to ash, gold crits with a chromatic split, and a cracking mask.
- **Audio:** synthesised on the fly: whooshes, thuds, a bell with inharmonic partials, quill scratches, dice, a heartbeat, and a low drone.

## 6. Scale bug

On a 2560-wide screen everything looked tiny and the hand fell off the bottom. The fixes:

- root font size from `clamp(14px, .55vw + .6vh + 4px, 22px)`;
- card widths in `vh`;
- the HUD moved to `rem`.

## 7. Balance pass

A headless sim (`scripts/balance.ts`) played a greedy bot against every mask, 120 seeds each.

| Mask | First pass | After tuning |
|---|---|---|
| The Fool | 48% | 98% |
| The Tower | 40% | 68% |
| The Hanged Man | **2%** | 57% |
| The Moon | 47% | 64% |
| The Devil | 0% | ~30% (mid-run deck) |
| Jev, unmasked | 0% | ~19% (mid-run deck) |

What changed:

- **The Fool:** 2 candles, 34 HP. It's the first hand, and it should teach, not punish.
- **The Hanged Man:** 2 candles, and Gutting Hook's Bleed went from 3 to 2, because Bleed stacked faster than you could out-damage it.
- **Wide Grin:** Fury 2 → 1. Permanent Fury snowballed.
- **Bite and Twin Fang:** 1 less damage each.
- **The Devil:** one Rake swapped for a Bite, 56 HP.
- **The boss:** 2 candles (a third in phase two), 90 HP.

## 8. Verifying in a real browser

A scripted run played end to end: title → map → fight → reward → ledger scene → map, and separately a loss → ending with the grudge saved. The ledger scene showed adaptation working:

- a ward-heavy bot (44% Ward) got **Sundering Gaze** and lost its Ward to Jev;
- a bot that kept taking unwarded hits got **Salt Blood** and lost its Strike.

Polish that came out of watching it:

- tooltips no longer pop up mid-drag;
- the keyword panel no longer sticks after cards are discarded;
- the played card on the table no longer covers Jev's HP bar;
- long rules text auto-shrinks (the Wheel of Fortune);
- the evolve mask is smaller on short screens.

## 9. Ship

- Public repo on GitHub, deployed on Vercel with the repo connected.
- The Jev bridge was checked in production: `/api/jev/status` returns `ready: false` until the key is added as a Vercel env var.
- Screenshots and the demo are captured by `npm run capture` in a fresh headless Chrome, so they can be regenerated after any change.
