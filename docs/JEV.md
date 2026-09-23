# Jev: how the opponent thinks

Jev is two things at once. It is the character across the table, a masked Dealer with a different arcana face each fight. It is also TypeSafe's **Jev** System One model, which makes its decisions. This doc covers the second.

The design follows the TypeSafe guidance: **code owns the workflow; the model supplies judgment.** The engine enumerates, simulates and enforces every rule. Jev only picks among options the engine has already made legal, and it returns probabilities, not prose.

```
browser                         server (api/jev.ts)                 TypeSafe
───────                         ───────────────────                 ────────
brain.ts ── POST /api/jev/decide ──► validate, add key ── POST /v1/systemone ──► jev-latest
         ◄── answers ────────────── (never exposes key) ◄── answers + probs ────
```

## 1. Every Jev turn

`src/jev/brain.ts → decideTurn()`

### Enumerate and simulate (`src/jev/candidates.ts`)

1. Clone the combat state (`cloneForSim`: deep copy, no FX, decorrelated RNG so simulations can't leak future rolls).
2. Depth-first search over Jev's hand: at each node, try every card `canPlay` allows, play it on a clone, recurse (max 5 cards, 400 nodes).
3. Every node is a complete *plan* (Jev can stop at any point, including playing nothing).
4. Plans with the same set of cards keep only the best ordering, because order matters for Omen and Sleight.
5. Each plan gets an outcome summary and a heuristic score:

```
score = damage × wAtk + min(ward, threat × 1.2) × wDef + curses × wCurse + buffs
        − Jev's own HP loss × 1.3 − unused candles × 0.4
```

The weights shift with the mask's persona (the Tower values damage, the Hanged Man values curses) and with your **habit profile**. A player who bursts hard makes Jev value Ward more; a multi-hit player makes Thorns worth more. A kill scores +1000 and suicide −1000.

### Ask Jev (one request, three questions)

The top 8 plans (plus "hold") become the options of a **Choice** question. The model also gets a **Score** and a second **Choice** in the same call, since independent questions over the same state are evaluated together.

```jsonc
{
  "model": "jev-latest",
  "state": {
    "you_are": "Jev, the Dealer, wearing The Tower: brutal, prefers overwhelming damage now over safety, accepts self-harm",
    "turn": 3,
    "jev":    { "hp": "31/44", "ward": 0, "candles": 3, "statuses": { "fury": 1 }, "ledger_rules": ["Sundering Gaze: Jev's attacks break Ward twice as fast."] },
    "player": { "hp": "40/64", "ward": 0, "statuses": { "hex": 1 }, "cards_in_hand": 5, "draw_pile": 3, "max_candles": 3, "sigils": [] },
    "player_habits": { "share_of_ward_cards": "44%", "avg_damage_per_turn": 9.5, "biggest_turn_damage": 21, "favorite_card": "Ward", "...": "..." },
    "grudge_from_past_nights": 1
  },
  "questions": {
    "plan":   { "type": "choice", "instructions": "You are Jev, a cunning card-duel dealer. Pick the line of play…",
                "criteria": { "p0": "Play Rake, then Bite. Player takes 16 (HP 40→24); Jev ends with 0 Ward.",
                              "p1": "Play Carapace, then Bite. Player takes 5 (HP 40→35); Jev ends with 8 Ward.", "…": "…" } },
    "threat": { "type": "score", "instructions": "How much damage is the player likely to deal to Jev next turn…",
                "criteria": ["Almost none…", "Light…", "Moderate…", "Heavy…", "Lethal or near-lethal for Jev."] },
    "taunt":  { "type": "choice", "instructions": "What should Jev say to the player right now…",
                "criteria": { "mock_habit": "…", "menace": "…", "respect": "…", "silence": "…", "recall": "…" } }
  }
}
```

### Blend and sample

- **A lethal plan exists:** take it. There is no model call; code owns certainty.
- **Jev answered:** `p = trust × p_jev + (1 − trust) × softmax(heuristic / 4)`, where `trust = 0.75` if Jev's `confidence ≥ 0.35` and `0.35` otherwise. Jev then samples from `p` with the combat's seeded RNG, so it plays sensibly but never mechanically.
- **No key, a timeout (2.6 s), or an error:** sample from `softmax(heuristic / 2)`. This is "instinct".

The speech bubble shows the source: `Jev · 82% sure`, `instinct`, or `Jev smells blood` for a lethal line. While Jev decides, the mask's eyes glow and *Jev is reading you* pulses, which covers the network latency.

## 2. Between fights: the ledger

`src/jev/evolve.ts`, shown in `src/ui/screens/evolve.ts`.

1. The fight's turn logs are folded into the run's `Profile` (`src/jev/profile.ts`): card-tag counts, reversed plays, damage per turn, biggest turn, Ward per turn, unwarded hits taken, multi-hit and big-card use, and plays per card.
2. `habits()` turns that into ten 0–1 scores: `attack, ward, bleed, hex, reversed, spam, burst, bigcards, unwarded, multihit`.
3. Each ledger rule counters one habit (see [CARDS.md](CARDS.md#jevs-ledger-counter-rules)). Heuristic weight: `0.05 + habit^1.5`.
4. Jev gets a **Choice** over the rules it doesn't own yet, each described with the habit it punishes. The final pick samples `0.8 × Jev + 0.2 × heuristic`.
5. Jev steals a copy of your **favourite card**: the most-played non-starter with at least two plays, otherwise your most-played card. Normal masks shuffle stolen cards straight into their decks. The boss holds them until phase two.

Example from testing: a bot that played Ward 44% of the time drew **Sundering Gaze** and lost its Ward to Jev's deck. A bot that got hit unwarded 100% of the time and leaned on Bleed drew **Salt Blood** and lost its Strike.

## 3. Across nights

`localStorage` key `hollowhand.memory.v1` stores grudge, deaths, wins, last cause of death and "ghost card".

| Event | Effect |
|---|---|
| You die | grudge +1, Jev keeps your favourite card for next night |
| You win | grudge −1, ghost card cleared |
| Pawn your name / sit in Jev's chair (events) | grudge +1 |
| Grudge ≥ 2 at the start of a night | Jev begins with one random ledger rule |
| Every grudge point | +2 HP on masks, +4 HP on the boss |

Greetings and the `recall` taunt reference the last night.

## 4. The bridge (`api/jev.ts`)

One self-contained Web-standard handler:

- `GET /api/jev/status` → `{ ready, model }`
- `POST /api/jev/decide` → validates (at most 4 questions, types limited to `choice | score | noul`, body ≤ 48 KB), adds `Authorization: Bearer $TYPESAFE_API_KEY`, forces `model: jev-latest`, has a 4 s timeout, and retries once on 429/529.
- An upstream 401 becomes 503 "dreaming", so the client falls back cleanly.

It runs as a Vercel function (`GET`/`POST` exports; `vercel.json` rewrites `/api/jev/:op`). Locally, `server/nodeAdapter.ts` bridges Node's `http` to the same handler. Tests: `tests/api.test.ts`.

## 5. Testing the brain

`tests/jev.test.ts` checks that:

- simulations never mutate real state;
- plans stay within candles;
- lethal is always taken;
- offline mode falls back to instinct;
- a confident one-hot answer from Jev dominates the pick;
- ward-heavy habits make Sundering Gaze the top counter;
- owned rules are never re-inked.
