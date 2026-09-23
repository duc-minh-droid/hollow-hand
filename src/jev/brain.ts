// Jev's decision for one turn: code enumerates and scores legal plans, the Jev model picks
// among them (with probabilities), and we sample from a blend so play stays sensible but alive.
import { next } from '../core/rng.ts';
import { getCard } from '../game/cards.ts';
import type { CombatState } from '../game/types.ts';
import { enumeratePlans, type Plan } from './candidates.ts';
import { askJev, type Answers, type ChoiceAnswer, type Question, type ScoreAnswer } from './jevClient.ts';
import { MASKS } from './masks.ts';
import { getMutation } from './mutations.ts';
import { describe, type Profile } from './profile.ts';

export type TauntKind = 'mock_habit' | 'menace' | 'respect' | 'silence' | 'recall';

export interface Decision {
  plan: Plan;
  source: 'jev' | 'instinct' | 'lethal';
  confidence?: number;
  threat?: number; // 0..4
  taunt: TauntKind;
  plans: Plan[];
}

const TOP_N = 8;
const LOW_CONFIDENCE = 0.35;

export interface BrainContext {
  profile: Profile;
  grudge: number;
  ask?: typeof askJev; // injectable for tests
}

function softmax(scores: number[], temp: number) {
  const m = Math.max(...scores);
  const e = scores.map((x) => Math.exp((x - m) / temp));
  const z = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / z);
}

function sample(s: CombatState, probs: number[]) {
  let r = next(s.rng);
  for (let i = 0; i < probs.length; i++) {
    r -= probs[i];
    if (r <= 0) return i;
  }
  return probs.length - 1;
}

export function describeState(s: CombatState, profile: Profile, grudge: number) {
  const mask = MASKS[s.jev.mask];
  const j = s.jev;
  const p = s.player;
  return {
    you_are: `Jev, the Dealer, wearing ${mask.persona}`,
    turn: s.turn,
    jev: {
      hp: `${j.hp}/${j.maxHp}`, ward: j.ward, candles: j.candles, statuses: j.st,
      ledger_rules: j.mutations.map((m) => `${getMutation(m).name}: ${getMutation(m).text}`),
    },
    player: {
      hp: `${p.hp}/${p.maxHp}`, ward: p.ward, statuses: p.st, cards_in_hand: p.hand.length,
      draw_pile: p.draw.length, max_candles: p.maxCandles,
      sigils: p.sigils.map((sg) => getCard(sg.id).name),
    },
    player_habits: describe(profile),
    grudge_from_past_nights: grudge,
  };
}

export async function decideTurn(s: CombatState, ctx: BrainContext): Promise<Decision> {
  const all = enumeratePlans(s, ctx.profile);
  const plans = all.slice(0, TOP_N);
  if (!plans.some((p) => p.uids.length === 0)) {
    const hold = all.find((p) => p.uids.length === 0);
    if (hold) plans.push(hold);
  }

  // Code owns certainty: a lethal line is always taken.
  const lethal = plans.find((p) => p.outcome.kills);
  const ask = ctx.ask ?? askJev;

  const questions: Record<string, Question> = {
    plan: {
      type: 'choice',
      instructions:
        "You are Jev, a cunning card-duel dealer. Pick the line of play for this turn that best wins the duel over the next few turns, " +
        "given both sides' HP, Ward and statuses, your mask's persona, and the player's recorded habits. Prefer lines that exploit the player's habits.",
      criteria: Object.fromEntries(plans.map((p) => [p.key, p.summary])),
    },
    threat: {
      type: 'score',
      instructions: "How much damage is the player likely to deal to Jev on the player's next turn, given their habits, statuses and resources?",
      criteria: [
        'Almost none: the player is crippled or has only defensive options.',
        'Light: a few points of damage.',
        'Moderate: a solid turn of attacks, around their usual.',
        'Heavy: well above their usual; Jev should brace.',
        'Lethal or near-lethal for Jev.',
      ],
    },
    taunt: {
      type: 'choice',
      instructions: 'What should Jev say to the player right now, as a theatrical, menacing dealer?',
      criteria: {
        mock_habit: "Mock the player's most obvious habit or favourite card.",
        menace: 'Threaten the player; Jev is winning or about to strike hard.',
        respect: 'Grudging respect; the player just hurt Jev badly or is playing well.',
        silence: 'Say nothing; let the cards speak.',
        ...(ctx.grudge > 0 ? { recall: 'Remind the player of how they lost on a previous night.' } : {}),
      },
    },
  };

  const answers: Answers | null = lethal ? null : await ask(describeState(s, ctx.profile, ctx.grudge), questions);
  const planAns = answers?.plan as ChoiceAnswer | undefined;
  const threatAns = answers?.threat as ScoreAnswer | undefined;
  const tauntAns = answers?.taunt as ChoiceAnswer | undefined;

  const hProbs = softmax(plans.map((p) => p.score), 4);
  let chosen: Plan;
  let source: Decision['source'];
  if (lethal) {
    chosen = lethal;
    source = 'lethal';
  } else if (planAns?.probabilities) {
    const jProbs = plans.map((p) => planAns.probabilities[p.key] ?? 0);
    const trust = planAns.confidence >= LOW_CONFIDENCE ? 0.75 : 0.35;
    const mixed = jProbs.map((pj, i) => trust * pj + (1 - trust) * hProbs[i]);
    chosen = plans[sample(s, mixed)];
    source = 'jev';
  } else {
    // Offline instinct: sharp softmax over the heuristic, a little noise so Jev isn't a metronome.
    chosen = plans[sample(s, softmax(plans.map((p) => p.score), 2))];
    source = 'instinct';
  }

  return {
    plan: chosen,
    source,
    confidence: planAns?.confidence,
    threat: threatAns?.score,
    taunt: (tauntAns?.choice as TauntKind) ?? instinctTaunt(s, chosen),
    plans,
  };
}

function instinctTaunt(s: CombatState, plan: Plan): TauntKind {
  if (plan.outcome.dmgToPlayer >= 12) return 'menace';
  if (s.jev.hp < s.jev.maxHp * 0.4) return 'respect';
  return next(s.rng) < 0.5 ? 'mock_habit' : 'silence';
}
