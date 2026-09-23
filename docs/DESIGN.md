# Game design

## Premise

You wake at a candlelit table in a house that should not exist. Across from you, **Jev** shuffles a deck with too many hands. Win the night and you keep your name. Lose, and Jev keeps it for you, along with your favourite trick.

A night is one act of about eight steps across a branching map, ending with Jev unmasked.

## A turn

**Your turn**
1. Your Ward clears and your Thorns fade.
2. Bleed ticks, then drops by 1.
3. Candles relight to 3. Sigils like The Sun add more, and Dread takes some away.
4. You draw 5 cards. Each draw rolls **reversed** at 20%.
5. Jev lays its hand face-down. Each card shows an **intent sigil**: strike, guard, curse or trick. The Moon lies about one of them.
6. You play cards (drag them above the line, or click twice) and can **peek** at one of Jev's cards for 1 candle.
7. When you end the turn, your hand is discarded and Hex and Frail tick down.

**Jev's turn**
Jev's Ward clears and its Bleed ticks. Then Jev decides (see [JEV.md](JEV.md)) and plays its cards one by one, and the remaining cards are discarded.

## Damage

```
hit = (base + Fury [+6 Wolf Tooth on the first attack]) × 0.75 if Hex × 2 if Omen
Ward absorbs first unless Pierce. Veil cancels one whole hit.
Thorns on the target hurt the attacker after the hit.
```

Bleed, Toll and self-damage ignore Ward.

## Statuses

| | Effect | Decay |
|---|---|---|
| **Bleed** | lose that much HP at turn start | −1 per tick (Salt Blood halves it on Jev) |
| **Hex** | your attacks deal 25% less | −1 at end of turn |
| **Frail** | you gain 25% less Ward | −1 at end of turn |
| **Thorns** | attackers take that much | cleared at your turn start |
| **Fury** | +N per attack hit | whole fight |
| **Omen** | next attack card ×2 (gold crit) | consumed |
| **Dread** | lose N candles next turn | consumed |
| **Veil** | next hit passes through | consumed |
| **Twice** | next card is played twice | consumed |

## Reversed cards

Each card is written twice. Reversed is usually *more* (more damage, more Ward, more Bleed) with a price attached: HP, Frail, Hex, Dread, or burning to Ash. That gives the RNG a choice inside it: a reversed Tower hits for 26 but costs you 8 HP. Rabbit's Foot, the Cracked Hourglass and the Spilled Inkwell build around it, and Jev's **Mirror Eye** rule punishes it.

## The map

Eight rows. Row 0 is always The Fool, rows 1–6 hold 2–3 nodes each, and row 7 is the boss. Paths connect to the nearest nodes above, and every node is reachable.

| Row | Pool |
|---|---|
| 0 | fight (The Fool) |
| 1 | fight, event |
| 2 | fight, event, shop |
| 3 | elite, rest, event |
| 4 | fight, shop, event |
| 5 | fight, event, elite |
| 6 | rest, shop |
| 7 | boss (Jev, unmasked) |

**Fights** pay 16–26 teeth and a choice of 1 of 3 cards (58% common, 34% uncommon, 8% rare). **Elites** (The Devil) pay 38–50 teeth, a trinket, and better card odds (40/42/18). **Rest** offers one of: heal 30%, carve (upgrade) a card, or *snuff a rule*, which removes Jev's newest ledger rule for 6 max HP. The **Pawnbroker** sells 5 cards, 2 trinkets and card removal (50 teeth, +25 each time).

## Events

Six events, each with three choices, some rolling a d6: The Drowned Mirror, A Child's Deck, Pawn a Memory, The Candle That Speaks, A Card Sharp's Corpse, and Jev's Empty Chair. The last one lets you steal one of Jev's own cards or tear a page from its ledger. Several events interact with Jev directly by removing rules, taking back stolen cards, or raising the grudge.

## The boss

Jev, unmasked: 90 HP (+4 per grudge), 2 candles, holding back every card it stole from you. At half HP it tears off the last mask. It cleanses itself, gains 12 Ward and a third candle, and shuffles your stolen tricks into its deck.

## Balance

Tuned with `scripts/balance.ts`, a greedy bot that plays the first attack it can and wards when Jev shows two strikes. It never peeks or plans. Jev ran on offline instinct, 120 seeds per mask.

| Mask | Starter deck | Mid-run deck |
|---|---|---|
| The Fool | 98% | — |
| The Tower | 68% | 98% |
| The Hanged Man | 57% | 99% |
| The Moon | 64% | 91% |
| The Devil (elite) | 0% | ~30% |
| Jev, unmasked | 0% | ~19% |

The targets are a forgiving first hand, real but beatable fights, and an elite and boss that a thinking player with a built deck beats most of the time. The bot is deliberately dumb, so a person who peeks, holds Ward for strike turns and builds around reversed cards should do much better. First-pass numbers, before tuning, were Fool 48%, Hanged Man 2%. See [DEVLOG.md](DEVLOG.md).
