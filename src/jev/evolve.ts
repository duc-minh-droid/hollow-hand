// Between fights Jev studies you and inks one new rule into its ledger, then pockets a copy
// of your favourite trick.
import { weighted, type Rng } from '../core/rng.ts';
import { getCard } from '../game/cards.ts';
import { askJev, type ChoiceAnswer } from './jevClient.ts';
import { MUTATIONS, type MutationDef } from './mutations.ts';
import { describe, favorite, habits, readHabit, type Profile } from './profile.ts';

export interface Evolution {
  mutation?: MutationDef;
  stolen?: string;
  read: string; // Jev's line about your habit
  source: 'jev' | 'instinct';
  weights: Record<string, number>;
}

export function mutationWeights(profile: Profile, owned: string[]) {
  const h = habits(profile);
  const w: Record<string, number> = {};
  for (const m of MUTATIONS) {
    if (owned.includes(m.id)) continue;
    w[m.id] = 0.05 + h[m.counters] ** 1.5;
  }
  return w;
}

export async function evolve(
  rng: Rng, profile: Profile, owned: string[], stolen: string[], ask: typeof askJev = askJev,
): Promise<Evolution> {
  const weights = mutationWeights(profile, owned);
  const pool = MUTATIONS.filter((m) => m.id in weights);
  const read = readHabit(profile).line;
  const fav = favorite(profile, stolen);
  const stolenCard = fav && getCard(fav).rarity !== 'curse' ? fav : undefined;
  if (!pool.length) return { stolen: stolenCard, read, source: 'instinct', weights };

  const answers = await ask(
    { player_habits: describe(profile), jev_current_rules: owned },
    {
      mutation: {
        type: 'choice',
        instructions:
          "You are Jev, a card-duel dealer who adapts to beat this specific player. Choose the one new rule to add to your deck that most directly punishes the player's strongest recorded habit.",
        criteria: Object.fromEntries(pool.map((m) => [m.id, `${m.name}: ${m.text} (punishes players who rely on: ${m.counters})`])),
      },
    },
  );
  const ans = answers?.mutation as ChoiceAnswer | undefined;
  let id: string;
  let source: Evolution['source'] = 'instinct';
  if (ans?.choice && ans.choice in weights) {
    // Blend: the model's pick dominates, but the habit weights keep it grounded.
    const blended: Record<string, number> = {};
    const totalW = Object.values(weights).reduce((a, b) => a + b, 0);
    for (const k of Object.keys(weights)) blended[k] = 0.8 * (ans.probabilities[k] ?? 0) + 0.2 * (weights[k] / totalW);
    id = weighted(rng, blended);
    source = 'jev';
  } else {
    id = weighted(rng, weights);
  }
  return { mutation: MUTATIONS.find((m) => m.id === id), stolen: stolenCard, read, source, weights };
}
